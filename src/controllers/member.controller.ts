import { toMemberDto } from '@/dto/member.dto';
import { ControllerBaseFunctionType } from './base.controller';
import { MemberService } from '@/services/member.service';
import { sendError } from '@/utils/errorUtils';
import {
  MemberParamSchemaType,
  MembersQuerySchemaType,
} from '@/validators/member.validator';

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

      res.status(200).json({ success: true, data: formattedData });
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
      const results = await this.memberSerivce.findAll(query);

      res.status(200).json({ success: true, ...results });
    } catch (error) {
      console.error('Error while findAll: ', error);
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

      res.status(200).json({
        success: true,
        message: 'Delete Member successful.',
      });
    } catch (error) {
      console.error('Error while delete: ', error);
      sendError.internalServer(res, error);
    }
  };
}
