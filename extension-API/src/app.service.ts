/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { DataSource } from 'typeorm';
import { IProduct_db, IProduct, IPrice, IPriceList_db } from 'interfaces';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getAllProduct(): Promise<IProduct_db[]> {
    const data = await this.dataSource.query('SELECT * FROM product;');
    return data;
  }

  async getRecord(system_id: string): Promise<IProduct_db[]> {
    const sql: string = `SELECT * FROM product WHERE product.system_id="${system_id}";`;
    const req: IProduct_db[] = await this.dataSource.query(sql);
    return req;
  }

  async getPriceList(system_id: string): Promise<IPriceList_db[]> {
    const sql: string = `
      SELECT
        history_price.date,
        history_price.price
      FROM product
      LEFT JOIN history_price ON product.id = history_price.product_id
      WHERE product.system_id = '${system_id}';
    `;
    const req = await this.dataSource.query(sql);
    return req;
  }

  private async createProduct(data: IProduct): Promise<ResultSetHeader> {
    const sqlProduct: string = `INSERT INTO product (id, system_id, url) VALUES (
      NULL, '${data.system_id}', '${data.url}'
    );`;
    const reqProduct: ResultSetHeader = await this.dataSource.query(sqlProduct);

    return reqProduct;
  }

  private async createPrice(
    id: number,
    price: IPrice,
  ): Promise<ResultSetHeader> {
    const sqlPrice: string = `INSERT INTO history_price (product_id, date, price, price_ozon) VALUES (
      '${id}', NOW(), '${price.actual_price}', NULL
    );`;
    const reqPrice: ResultSetHeader = await this.dataSource.query(sqlPrice);

    return reqPrice;
  }

  async addRecord(product: IProduct) {
    const reqEntry: IProduct_db[] = await this.getRecord(product.system_id);
    let reqPrice = {} as ResultSetHeader;
    let reqProduct = {} as ResultSetHeader;
    if (reqEntry.length) {
      reqPrice = await this.createPrice(reqEntry[0].id, product.price);
    } else {
      reqProduct = await this.createProduct(product);
      reqPrice = await this.createPrice(reqProduct.insertId, product.price);
    }
    return { reqEntry, reqProduct, reqPrice };
  }
}
