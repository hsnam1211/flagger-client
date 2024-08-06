export type ApiResponseType = {
  code: number;
  data?: object;
  count?: number;
  message?: string;
  stack?: object;
};

export type ObjectProps = {
  [key: string]: any;
};
