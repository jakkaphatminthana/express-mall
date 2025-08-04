import { Member } from '@/models';
import { MemberRepository } from '@/repositories/member.repository';
import { PaginationResponse } from '@/types/pagination';
import { MembersQuerySchemaType } from '@/validators/member.validator';

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
}
