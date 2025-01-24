import { Commodity } from '../../types/market';
import { TransactionEvent } from '../../types/events';

export const createTransactionEvent = (
  commodity: Commodity,
  amount: number,
  price: number,
  isBuy: boolean
): Omit<TransactionEvent, 'id' | 'timestamp'> => {
  const total = price * amount;
  const action = isBuy ? 'Purchased' : 'Sold';
  
  return {
    type: 'transaction',
    message: `${action} ${amount} ${commodity.unit} of ${commodity.name} for ${total.toLocaleString()} credits`,
    details: {
      commodityId: commodity.id,
      amount,
      price,
      total,
      isBuy
    }
  };
};

export const createInsufficientFundsEvent = (required: number, available: number) => ({
  type: 'warning',
  message: `Insufficient credits: Need ${required.toLocaleString()} cr (${available.toLocaleString()} cr available)`,
  details: {
    required,
    available
  }
});