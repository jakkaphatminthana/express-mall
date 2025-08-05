export interface OrderProductDto {
  id: number;
  productId: number;
  productName: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderDto {
  id: number;
  memberId?: number;
  memberCode?: string;
  pointsEarn: number;
  createdAt: string;
  orders: OrderProductDto[];
}

export function toOrderDto(order: any): OrderDto {
  return {
    id: order.id,
    memberId: order.memberId,
    memberCode: order.member?.code,
    pointsEarn: order.pointsEarn,
    createdAt:
      order.createdAt instanceof Date
        ? order.createdAt.toISOString()
        : order.createdAt,
    orders:
      order.orderProducts?.map((orderProduct: any) => ({
        id: orderProduct.id,
        productId: orderProduct.productId,
        productName: orderProduct.product?.name || '',
        amount: orderProduct.amount,
        unitPrice: orderProduct.unitPrice,
        totalPrice: orderProduct.totalPrice,
      })) || [],
  };
}
