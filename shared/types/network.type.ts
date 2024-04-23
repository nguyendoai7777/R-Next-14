export interface NetworkResponse<T> {
  message?: string;
  data?: T,
  timestamp?: string;
  path?: string;
  statusCode?: number;
  messageCode?: string;
}

export interface ResponseWithPaginator<T> extends NetworkResponse<T>{

}