import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { IPriceList_db, IProduct_db } from 'interfaces';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAllProduct')
  async getData(): Promise<IProduct_db[]> {
    return await this.appService.getAllProduct();
  }

  @Get('getPriceList')
  async getPriceList(
    @Query('system_id') system_id: string,
  ): Promise<IPriceList_db[]> {
    return await this.appService.getPriceList(system_id);
  }

  @Post()
  async addEntry(@Body() data) {
    return await this.appService.addRecord(data);
  }
}
