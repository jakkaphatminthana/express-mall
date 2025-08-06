export interface MemberDto {
  id: number;
  code: string;
  totalPoints: number;
  isActive: boolean;
  createdAt: string;
  orders: MemberOrderDto[];
}

export interface MemberOrderDto {
  id: number;
  pointsEarn: number;
  createdAt: string;
  products: MemberProductDto[];
}

export interface MemberProductDto {
  id: number;
  productName: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export function toMemberDto(member: any): MemberDto {
  const orders = member.orders?.map((order: any) => {
    const products: MemberProductDto[] =
      order.orderProducts?.map((item: any) => ({
        id: item.product.id,
        productName: item.product?.name,
        amount: item.amount,
        unitPrice: item.unitPrice,
      })) || [];

    const totalPrice = order.orderProducts?.reduce(
      (sum: number, item: MemberProductDto) =>
        sum + item.unitPrice * item.amount,
      0,
    );

    return {
      id: order.id,
      pointsEarn: order.pointsEarn,
      createdAt: order.createdAt,
      totalPrice: totalPrice,
      products,
    };
  });

  return {
    id: member.id,
    code: member.code,
    totalPoints: member.totalPoints,
    isActive: member.isActive,
    createdAt: member.createdAt,
    orders: orders || [],
  };
}
