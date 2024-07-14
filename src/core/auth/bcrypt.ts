import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  constructor(@Inject('bcrypt') private readonly bcrt: typeof bcrypt) {}

  sign(data: any) {
    const salt = this.bcrt.genSaltSync(10);
    const hash = this.bcrt.hashSync(data, salt);
    return hash;
  }

  compare(data: any, hash: string) {
    return bcrypt.compareSync(data, hash);
  }
}
