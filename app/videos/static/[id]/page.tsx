import { AppDynamicRoute } from '@/shared/types/app-dynamic-route.type';
import { VideoPlayerComponent } from './video-player';
import Head from 'next/head';

export async function generateMetadata({ params }: any) {
	return {
		title: 'Attempting initialization Mon',
		description: 'Enjoy your video',
	};
}

async function StaticVideoPage({ params: { id } }: AppDynamicRoute<{ id: string }>) {
	return <VideoPlayerComponent id={id} />;
}
export default StaticVideoPage;
