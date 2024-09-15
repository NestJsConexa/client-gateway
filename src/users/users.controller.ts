import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaginationDto } from './dtos/pagination.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Token } from 'src/auth/decorators/user.decorator';


@Controller('users')
export class UsersController {
  constructor(@Inject('AUTH_SERVICE') private readonly userClient: ClientProxy) { }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() paginationDto: PaginationDto, @Token() token: string) {
    const users = this.userClient.send({ cmd: 'get user pagination' }, paginationDto)
    return users
  }
}
