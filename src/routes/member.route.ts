import { MemberController } from '@/controllers/member.controller';
import validationSchema from '@/middlewares/validation';
import {
  MemberParamSchema,
  MembersQuerySchema,
} from '@/validators/member.validator';
import { Router } from 'express';

const router = Router();
const memberController = new MemberController();

router.get(
  '/',
  validationSchema(MembersQuerySchema, 'query'),
  memberController.findAll,
);

router.get(
  '/:memberId',
  validationSchema(MemberParamSchema, 'params'),
  memberController.findOne,
);

router.delete(
  '/:memberId',
  validationSchema(MemberParamSchema, 'params'),
  memberController.delete,
);

export default router;
