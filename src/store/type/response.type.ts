export interface ResType<T> {
  message: string | 'success';
  data: T;
}
