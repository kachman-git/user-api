import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  signIn(dto: AuthDto) {
    return dto;
  }

  signup(dto: AuthDto) {
    return dto;
  }
}
