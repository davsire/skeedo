import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class AppService {
  db = MongoClient.connect('localhost:27017')
  getHello(): string {
    
    return 'Hello World!';
  }
}
