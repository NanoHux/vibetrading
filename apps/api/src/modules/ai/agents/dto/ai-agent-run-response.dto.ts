export class AiAgentRunResponseDto {
  agentId!: string;
  runId!: string;
  status!: 'queued' | 'started' | 'failed';
}
