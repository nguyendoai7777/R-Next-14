'use server';

import { NetworkResponse } from '@/shared/types/network.type';
import { cookies } from 'next/headers';
import httpClient from './shared/http-client/http-client';

export const onLoginSubmitted = async (form: any) => {
	try {
		const login = await httpClient.post<
			NetworkResponse<{
				accessToken: string;
				refreshToken: string;
			}>
		>(`/auth/login`, form);
		if (login.statusCode === 200) {
			cookies().set('user', login.data!.accessToken);
			return {
				accessToken: login.data!.accessToken,
				refreshToken: login.data!.refreshToken,
			};
			// redirect('/main')
		} else {
      return {
        message: login.message
      }
		}
	} catch (e: any) {}
};
