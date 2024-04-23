'use client';
import { onLoginSubmitted } from '@/app/actions';
import { Button, Form, Input, notification } from 'antd';
interface LoginFormControl {
	identifier: string;
	password: string;
}

function LoginPage() {
	const [form] = Form.useForm<LoginFormControl>();
	const [toast, contextHolder] = notification.useNotification();

	const openNotification = (message: string) => {
		toast.error({
			icon: <></>,
			message: <div className='text-red-600'>{message}</div>,
			placement: 'topRight',
		});
	};

	return (
		<div className='flex justify-center max-w-96 mx-auto h-[100vh] items-center'>
			{contextHolder}
			<Form
				name='login'
				autoComplete='off'
				className='w-full'
				form={form}
				layout='vertical'
				onFinish={(e) => {
          const allErrors = form.getFieldsError()
          const error = allErrors.every(c => c.errors.length == 0);
          console.log('e: ', allErrors, error);
					onLoginSubmitted(e).then((c) => {
						if (c?.accessToken) {
							localStorage.setItem('token', c?.accessToken);
							localStorage.setItem('resfr', c?.refreshToken);
						} else {
							openNotification(c!.message!);
						}
						// console.log('client reponse: ', c);
					});
				}}
			>
				<Form.Item name='identifier' label='Username' rules={[{ required: true, message: 'Required' }]}>
					<Input name='identifier' />
				</Form.Item>
				<Form.Item name='password' label='Password' rules={[{ required: true, message: 'Required' }]}>
					<Input.Password name='password' />
				</Form.Item>

				<Button type='primary' className='w-full mt-2' htmlType='submit'>
					Login
				</Button>
			</Form>
		</div>
	);
}
export default LoginPage;
