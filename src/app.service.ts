import { Injectable } from '@nestjs/common';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly userService: UserService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async parse() {
    const dataSrc = path.join(__dirname, '..', 'data/demo.csv');
    const stream = fs.createReadStream(dataSrc);
    const entities: ParsedData<InstanceType<any>> = await this.csvParser.parse(
      stream,
      UserEntity,
      null,
      null,
      {
        separator: ',',
      },
    );
    for (const user of entities.list) {
      await this.userService.create(user);
    }
    return entities.list;
  }
}
