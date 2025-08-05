import { MemberService } from '@/services/member.service';
import { ControllerBaseFunctionType } from './base.controller';
import { sendError } from '@/utils/errorUtils';
import {
  MemberParamSchemaType,
  MembersQuerySchemaType,
} from '@/validators/member.validator';
import { toBoolean } from '@/utils/convert';

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

      res.status(200).json({ success: true, data: result });
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
      const isActive = toBoolean(req.query.isActive);

      const results = await this.memberSerivce.findAll({ ...query, isActive });
      res.status(200).json({ success: true, ...results });
    } catch (error) {
      console.error('Error while findAll: ', error);
      sendError.internalServer(res, error);
    }
  };
}
