import { Member } from '@/models';
import { MemberRepository } from '@/repositories/member.repository';
import { PaginationResponse } from '@/types/pagination';
import { generateUniqueCode } from '@/utils/common';
import { createError } from '@/utils/errorUtils';
import {
  CreateMemberSchemaType,
  MembersQuerySchemaType,
} from '@/validators/member.validator';

export class MemberService {
  private memberRepository: MemberRepository;

  constructor() {
    this.memberRepository = new MemberRepository();
  }

  async findOneById(id: number): Promise<Member | null> {
    return await this.memberRepository.findById(id);
  }

  async findAll(
    request: MembersQuerySchemaType,
  ): Promise<PaginationResponse<Member>> {
    const { page = 1, pageSize = 10 } = request;

    const { rows, count } = await this.memberRepository.findAll(request);
    const totalPage = Math.ceil(count / pageSize);

    return {
      data: rows.map((i) => i.toJSON()),
      pagination: {
        currentPage: Number(page),
        totalPage,
        totalItem: count,
      },
    };
  }

  async create(request: CreateMemberSchemaType): Promise<Member> {
    if (request.code) {
      const isExisting = await this.isExistingCode(request.code);
      if (isExisting) {
        throw createError.badRequest(
          `Code "${request.code}" is already in use`,
        );
      }

      return await this.memberRepository.create(request);
    }

    // generate code
    let code: string = '';
    let isDuplicate = true;

    while (isDuplicate) {
      code = generateUniqueCode(8);
      const existing = await this.isExistingCode(code);

      if (!existing) {
        isDuplicate = false;
      }
    }
    return await this.memberRepository.create({
      code,
      defaultPoints: request.defaultPoints || 0,
    });
  }

  async delete(id: number): Promise<void> {
    const target = await this.findOneById(id);

    if (!target) {
      throw createError.notFound('Member is not found');
    }

    if (!target.isActive) {
      throw createError.conflict('This member already deleted');
    }

    await this.memberRepository.delete(id);
  }

  async isExistingCode(code: string): Promise<boolean> {
    return !!(await this.memberRepository.findOne({ where: { code } }));
  }
}
