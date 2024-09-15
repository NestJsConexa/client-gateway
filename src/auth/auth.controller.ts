import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly userClient: ClientProxy) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userClient.send({cmd: 'create user'}, createUserDto)
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userClient.send({cmd: 'auth login user'}, loginDto)
  }

}
