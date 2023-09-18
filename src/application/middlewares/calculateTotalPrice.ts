import Logger from '../../infrastructure/log/logger';

export async function calculateTotalPrice(
    prices: number[],
): Promise<number> {
  let soma = 0;
  Logger.debug('Total Calculator - Calculate total price');
  prices.forEach(value => {
    soma += value;
  })
  return soma;
}