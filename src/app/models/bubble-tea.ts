export interface BubbleTea {
  id?: number;
  name: string;
  temperature: string;
  precio: number;
  active: boolean;
}

export interface ApiResponse<T> {
  ok: boolean;
  results: T;
}

