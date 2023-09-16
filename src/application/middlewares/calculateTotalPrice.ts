import Logger from '../../infrastructure/log/logger';

export async function calculateTotalPrice(
    price: number[],
): Promise<number> {
  let soma = 0;
  Logger.debug('Total Calculator - Calculate total price');
  price.forEach(value => {
    soma += value;
  })
  return soma;
}