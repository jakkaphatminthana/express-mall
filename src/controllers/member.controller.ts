import { toMemberDto } from '@/dto/member.dto';
import { ControllerBaseFunctionType } from './base.controller';
import { MemberService } from '@/services/member.service';
import {
  CreateMemberSchemaType,
  MemberParamSchemaType,
  MembersQuerySchemaType,
} from '@/validators/member.validator';
import { sendError, sendSuccess } from '@/utils/http';

export class MemberController {
  private memberSerivce: MemberService;

  constructor() {
    this.memberSerivce = new MemberService();
  }

  findOne: ControllerBaseFunctionType<{}, MemberParamSchemaType, {}> = async (
    req,
    res,
  ) => {
    try {
      const params = req.params;
      const result = await this.memberSerivce.findOneById(params.memberId);

      if (!result) {
        sendError.notFound(res, 'Member not found');
        return;
      }

      const formattedData = toMemberDto(result);

      return sendSuccess.ok(res, formattedData);
    } catch (error) {
      console.error('Error while findOne: ', error);
      sendError.internalServer(res, error);
    }
  };

  findAll: ControllerBaseFunctionType<{}, {}, MembersQuerySchemaType> = async (
    req,
    res,
  ) => {
    try {
      const query = req.query;
      const { data, pagination } = await this.memberSerivce.findAll(query);

      return sendSuccess.pagination(res, data, pagination);
    } catch (error) {
      console.error('Error while findAll: ', error);
      sendError.internalServer(res, error);
    }
  };

  create: ControllerBaseFunctionType<CreateMemberSchemaType, {}, {}> = async (
    req,
    res,
  ) => {
    try {
      const body = req.body as CreateMemberSchemaType;
      const data = await this.memberSerivce.create(body);

      return sendSuccess.created(res, data);
    } catch (error) {
      console.error('Error while create: ', error);
      sendError.internalServer(res, error);
    }
  };

  delete: ControllerBaseFunctionType<{}, MemberParamSchemaType, {}> = async (
    req,
    res,
  ) => {
    try {
      const params = req.params;
      await this.memberSerivce.delete(params.memberId);

      return sendSuccess.ok(res, undefined, 'Delete Member successful.');
    } catch (error) {
      console.error('Error while delete: ', error);
      sendError.internalServer(res, error);
    }
  };
}
