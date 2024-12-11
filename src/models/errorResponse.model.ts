export interface Error {
  code: string;
  description: string;
  metadata: Record<string, any> | null;
  numericType: number;
  Type: string;
}

export interface ErrorResponse {
  errors: {
    [key: string]: string[];
  };
  status: number;
  title: string;
  traceId: string;
  type: string;
}
