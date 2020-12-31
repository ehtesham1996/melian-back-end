export interface Response {
  success?: boolean;
  error?: boolean;
  message: string;
  statusCode: number;
  data?: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ResponseTemplate = (success: boolean, error: boolean, message: string, statusCode: number, data: any) : Response => {
  return {
    success,
    error,
    message,
    statusCode,
    data
  }
}
