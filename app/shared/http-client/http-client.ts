import { Interceptor } from "../interceptor/interceptor";


export interface RequestOptions  {
  headers?: {
      [header: string]: string | string[];
  };
  params?: {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  responseType?: 'json' | 'blob' | 'text' | 'arraybuffer';
  withCredentials?: boolean;
  transferCache?: {
      includeHeaders?: string[];
  } | boolean;
}

class HttpClient {
  baseURL: string;
  interceptor: Interceptor;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.interceptor = new Interceptor();
  }

  async get<T = unknown>(url: string, headers = {}) {
    const request = new Request(this.baseURL + url, {
      method: 'GET',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
    return this.interceptor.sendRequest<T>(request);
  }

  async post<T>(url: string, data: any, options?: RequestOptions) {
    const request = new Request(this.baseURL + url, {
      method: 'POST',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.interceptor.sendRequest<T>(request) ;
  }

  async put<T>(url: string, data: any, headers = {}) {
    const request = new Request(this.baseURL + url, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return this.interceptor.sendRequest<T>(request);
  }

  async delete<T>(url: string, headers = {}) {
    const request = new Request(this.baseURL + url, {
      method: 'DELETE',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
    return this.interceptor.sendRequest<T>(request);
  }
}



const baseURL = process.env.NEXT_PUBLIC_API_URL!;
const httpClient = new HttpClient(baseURL);

httpClient.interceptor.addRequestInterceptor(
	(request: any) => {
		return request;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);

httpClient.interceptor.addResponseInterceptor(
	(response: any) => {
		return response;
	},
	(error: any) => {
		return Promise.reject(error);
	}
);


export default httpClient;