import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { livroType } from './LivroType';
import { SaksParams } from '@SaksLog/saks-logging/index';
import { SaksLogger } from '@SaksLog/saks-logging/logger/SaksLogger';

@Injectable()
export class AppService {
  private grpcService;
  constructor(
    @Inject('LIVRO_PACKAGE') private client: ClientGrpc,
    private logger: SaksLogger,
  ) {
    logger.setTypeName('HTTP');
  }

  onModuleInit() {
    this.grpcService = this.client.getService('LivrariaService');
  }

  async getAll(@SaksParams() log: any): Promise<livroType[]> {
    this.logger.info('Chamando customer Service', log, 'HTTP');
    return await this.grpcService
      .getLivro({
        traceId: log.traceId,
      })
      .toPromise();
  }
}
