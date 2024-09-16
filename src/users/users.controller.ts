import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
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
    return await lastValueFrom(
      this.userClient.send({ cmd: 'get user pagination' }, { paginationDto, token })
    );
  }
}
