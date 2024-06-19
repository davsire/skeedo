import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  db = MongoClient.connect(process.env.MONGO_HOST)
  getHello(): string {
    
    return 'Hello World!';
  }
}
