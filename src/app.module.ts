import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [TypeOrmModule.forRoot(), CsvModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
