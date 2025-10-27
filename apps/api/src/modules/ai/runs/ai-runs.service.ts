import { Injectable } from '@nestjs/common';
import { AiRunDto } from './dto/ai-run.dto';

@Injectable()
export class AiRunsService {
  getRun(id: string): AiRunDto {
    // TODO: return run metadata plus associated decisions and provider response summary.
    return {
      id,
      agentId: 'agent-demo',
      runAt: new Date().toISOString(),
      latencyMs: 1200,
      tokensInput: 1024,
      tokensOutput: 256,
      analysisSummary: 'Market trending higher, recommend long bias.',
      decisions: [
        {
          symbol: 'BTC',
          action: 'BUY',
          confidence: 0.82,
          quantity: '0.5',
          reasonShort: 'EMA crossover, bullish momentum.',
        },
      ],
    };
  }
}
