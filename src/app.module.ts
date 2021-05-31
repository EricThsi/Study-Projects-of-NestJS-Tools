import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(), CsvModule, UserModule],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
