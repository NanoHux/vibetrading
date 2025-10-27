export class OrderSubmissionResponseDto {
  orderId!: string;
  status!: 'queued' | 'submitted' | 'rejected';
}
