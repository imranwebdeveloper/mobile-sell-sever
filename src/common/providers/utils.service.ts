import { Injectable } from '@nestjs/common';
import { Types, ObjectId } from 'mongoose';

@Injectable()
export class UtilsService {
  verifyId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return id;
  }
}
