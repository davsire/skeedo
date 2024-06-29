import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env)
    return 'Hello World!';
  }
}
