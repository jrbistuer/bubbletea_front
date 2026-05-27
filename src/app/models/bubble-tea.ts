export interface BubbleTea {
  id?: number;
  name: string;
  temperature: number;
  precio: number;
  active: boolean;
}

export interface ApiResponse<T> {
  ok: boolean;
  result: T;
}

