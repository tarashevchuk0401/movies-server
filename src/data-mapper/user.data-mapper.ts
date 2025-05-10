import { Injectable } from '@nestjs/common';
import { GetMeResponse } from '../dto/user/responses/get-me-response.dto';
import { UserEntity } from '../entities/user.entiity';

@Injectable()
export class UserDataMapper {
  entityToItem(userEntity: UserEntity): GetMeResponse {
    const { id, firstName, lastName, email } = userEntity;

    return {
      id,
      firstName,
      lastName,
      email,
    };
  }
}
