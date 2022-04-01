import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FileService {
  async createFile(file: any): Promise<string> {
    try {
      const filename: string = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, filename), file.buffer);
      return filename;
    }catch (e) {
      console.log(e);
    }
  }
}