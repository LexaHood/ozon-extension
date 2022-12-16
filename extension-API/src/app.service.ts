import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  getHello(): string {
    return 'Hello World!';
  }

  getData() {
    const data = this.dataSource.query('SELECT * FROM test_data;');
    return data;
  }
}
