import { Request, Response } from 'express';
import Logger from '../../infrastructure/log/logger';
import { HttpStatusCode } from 'axios';

export default class SaleCartController {
  constructor(){}

  public getCartById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      Logger.debug(`SaleCartController - getCartById - get cart service`)
      const cart = await this.cartService.getCartById(id);
      res.status(HttpStatusCode.Ok).json({ data: cart });
    } catch (error) {
      Logger.error(`SaleCartController - getCartById - error: ${error}`);
      res.status(HttpStatusCode.InternalServerError).json('Internal Server Error');
    }
  }
}