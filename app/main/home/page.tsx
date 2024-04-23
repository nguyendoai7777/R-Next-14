import { Metadata } from "next";

export const metadata: Metadata = {
	title: 'Home',
	description: 'Manage your all things',
};

export default function Page() {
	return <h1>Hello, Home page!</h1>;
}
