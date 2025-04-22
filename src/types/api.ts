type TApiResponse<T> = {
  success: boolean;
  source: string;
  data: T;
};

export type { TApiResponse };
