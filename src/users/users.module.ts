import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_SERVICE_HOST') || 'localhost',
            port: parseInt(configService.get<string>('AUTH_SERVICE_PORT'), 10),
          },
        }),
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
