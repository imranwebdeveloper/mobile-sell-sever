import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { getStorage } from 'firebase-admin/storage';

@Injectable()
export class UtilsService {
  verifyId(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new Error('Invalid ID');
    return id;
  }
  async uploadPhotos(photo: Buffer, id: string) {
    const bucket = getStorage().bucket();
    const filePath = bucket.file(`mobiles/${id}`);
    await filePath.save(photo, {
      resumable: false,
      public: true,
      metadata: {
        contentType: 'image/jpeg',
      },
    });
    return filePath.publicUrl();
  }
}
