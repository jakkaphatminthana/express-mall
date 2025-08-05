import type { ZodSchema } from 'zod';
import type { NextFunction, Request, Response, RequestHandler } from 'express';

type ZodRequestParts = 'body' | 'query' | 'params';

export default function validationSchema(
  schema: ZodSchema,
  source: ZodRequestParts = 'body',
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const originalData = req[source];

    const shouldPreprocess =
      (source === 'body' || source === 'query') && isObject(originalData);

    const parsedInput = shouldPreprocess
      ? preprocessValues(originalData)
      : originalData;

    const result = schema.safeParse(parsedInput);

    if (!result.success) {
      res.status(400).json({
        code: 'ValidationError',
        message: 'Validation failed',
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    // สำหรับ query ต้องใช้ defineProperty เพราะเป็น getter-only
    if (source === 'query') {
      Object.defineProperty(req, 'query', {
        value: result.data,
        writable: true,
        enumerable: true,
        configurable: true,
      });
    } else {
      (req as any)[source] = result.data;
    }
    next();
  };
}

function preprocessValues(obj: Record<string, any>) {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;

    // ถ้าเป็น string ลองแปลงเป็น JSON
    if (typeof value === 'string') {
      switch (value) {
        case 'true':
          result[key] = true;
          break;
        case 'false':
          result[key] = false;
          break;
        default:
          result[key] = tryParseJson(value);
          break;
      }
    } else {
      result[key] = value;
    }
  }

  return result;
}

function isObject(value: unknown): value is Record<string, any> {
  return typeof value === 'object' && value !== null;
}

function tryParseJson(value: string): any {
  try {
    const parsed = JSON.parse(value);
    // return เฉพาะถ้าเป็น object หรือ array เท่านั้น
    if (typeof parsed === 'object') {
      return parsed;
    }
    // ถ้าไม่ใช่ object/array ก็คืนค่า string เดิม
    return value;
  } catch {
    return value;
  }
}
