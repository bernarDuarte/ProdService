import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SaksLoggingModule } from '@SaksLog/saks-logging/index';

@Module({
  imports: [
    SaksLoggingModule,
    ClientsModule.register([
      {
        name: 'LIVRO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: `Livro`,
          url: `0.0.0.0:4000`,
          protoPath: join(__dirname, 'proto/livro.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
