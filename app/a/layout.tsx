import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function NonAuthLayout(props: any) {
	const user = cookies().get('user');
	if (user) {
		redirect('/main');
	}
	return <div className='min-h-screen'>{props.children}</div>;
}
