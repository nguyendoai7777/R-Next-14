

import Navbar from '@/components/navbar/navbar';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


export default function MainLayout(props: any) {
  const user = cookies().get('user');
	if (!user) {
		redirect('/a/login');
	}
	return (
		<div>
			<Navbar />
			{props.children}
		</div>
	);
}
/* 
export const metadata: Metadata = {
  title: "Main page",
  description: "Is main screen",
}; */
