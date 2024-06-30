import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  getHello(res): string {
    console.log(res)
    return 'Hello World!';
  }
}
