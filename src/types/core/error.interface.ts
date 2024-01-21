export type TContextObject = { [key: string]: any };

export interface ICustomErrorResponse {
  status: number;
  data: {
    error: {
      message: string;
      userMessage: string;
      context?: TContextObject | TContextObject[];
    };
  };
}
