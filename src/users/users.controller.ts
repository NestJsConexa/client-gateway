import { Controller, Get, HttpException, HttpStatus, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from './dtos/pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/auth/decorators/token.decorator';
import { lastValueFrom } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(@Inject('AUTH_SERVICE') private readonly userClient: ClientProxy) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Token() token: string) {
    try {
      const result = await lastValueFrom(
        this.userClient.send({ cmd: 'get user pagination' }, { paginationDto, token })
      ); 

      return result;
    } catch (error) {
      throw new HttpException('Error al obtener los usuarios', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
