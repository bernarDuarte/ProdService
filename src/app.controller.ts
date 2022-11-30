import { livroType } from './LivroType';
import { Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { SaksParams } from '@SaksLog/saks-logging/decorators';
import { LogType } from '@SaksLog/saks-logging/index';
import { CONTEXT } from '@nestjs/microservices';
import { SaksLogger } from '@SaksLog/saks-logging/logger/SaksLogger';
import { LoggerErrorInterceptor } from 'nestjs-pino';

@Controller()
export class AppController {
  constructor(
    private readonly service: AppService,
    private logger: SaksLogger,
  ) {
    logger.setTypeName('Request');
  }

  @Get()
  async getHello(@SaksParams() log: LogType): Promise<livroType[]> {
    this.logger.info('salfasjf', log, 'Request');
    this.logger.debug('salfasjf', 'Request', log);
    this.logger.warn('salfasjf', 'Request', log);
    return await this.service.getAll(log);
  }
}
