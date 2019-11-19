import { Injectable, HttpException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findById(id: number): Promise<any> {
    return new Promise(resolve => {
      const cat = this.cats.length >= id && this.cats[id];
      if (!cat) {
        throw new HttpException('Cat does not exist!', 404);
      }
      resolve(cat);
    });
  }

  findByName(name: string): Promise<any> {
    return new Promise(resolve => {
      const cat = this.cats.find(cat => cat.name === name);
      if (!cat) {
        throw new HttpException('Cat does not exist!', 404);
      }
      resolve(cat);
    });
  }
}
