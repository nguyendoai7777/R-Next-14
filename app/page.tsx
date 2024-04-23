import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
	title: 'Spot X - Music player on Web',
	description: 'Listen music everywhere',
};

export default function AppRoot() {
	return <>Main Root</>;
}
