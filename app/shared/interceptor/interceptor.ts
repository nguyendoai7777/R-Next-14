import { arrayBuffer } from 'stream/consumers';
import { RequestOptions } from '../http-client/http-client';

export class Interceptor {
	handlers: {
		request: any[];
		response: any[];
	};
	constructor() {
		this.handlers = {
			request: [],
			response: [],
		};
	}

	addRequestInterceptor(onFulfilled: any, onRejected: any) {
		this.handlers.request.push({ onFulfilled, onRejected });
	}

	addResponseInterceptor(onFulfilled: any, onRejected: any) {
		this.handlers.response.push({ onFulfilled, onRejected });
	}

	executeRequestInterceptors(request: any) {
		return this.handlers.request.reduce((chain, interceptor) => {
			return chain.then(interceptor.onFulfilled, interceptor.onRejected);
		}, Promise.resolve(request));
	}

	executeResponseInterceptors(response: any) {
		return this.handlers.response.reduce((chain, interceptor) => {
			return chain.then(interceptor.onFulfilled, interceptor.onRejected);
		}, Promise.resolve(response));
	}

	sendRequest<T>(request: any, options?: RequestOptions) {
		return this.executeRequestInterceptors(request)
			.then((modifiedRequest: any) => {
				return fetch(modifiedRequest).then((c) => {
					const ry: any = {
						blob: () => c.blob(),
						json:() =>  c.json(),
						text: () => c.text(),
						arrayBuffer: () => c.arrayBuffer(),
					};
					return (options?.responseType ? ry[options?.responseType as any]() : c.json()) ;
				});
			})
			.then((response: any) => {
				return this.executeResponseInterceptors(response);
			}) as T;
	}
}
