import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly userClient: ClientProxy) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const result = this.userClient.send({ cmd: 'create user' }, createUserDto)

      return result;
    } catch (error) {
      throw new HttpException('Error al registrar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = this.userClient.send({ cmd: 'auth login user' }, loginDto)

      return result;
    } catch (error) {
      throw new HttpException('Error al registrar el usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
