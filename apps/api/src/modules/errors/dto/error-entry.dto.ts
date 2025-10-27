export class ErrorEntryDto {
  id!: string;
  scope!: string;
  message!: string;
  occurredAt!: string;
  detail?: Record<string, unknown>;
  refId?: string;
}
