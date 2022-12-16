import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/environments/${
        process.env.DOTENV_CONFIG_PATH
      }`,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
