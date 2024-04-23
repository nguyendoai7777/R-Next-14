'use client';
import { FCC } from '@/shared/types/custom-component.type';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { SlideTooltipThumbBox, YTSlider } from './sliderbar';


export const VideoPlayerComponent: FCC<{ id: string; onDataLoaded?: (data: any) => void }> = ({ id, onDataLoaded }) => {
	const [duration, setduration] = useState(0);
	/* useEffect(() => {
		fetch('/api/login', {
			method: 'GET',
		})
			.then((c) => c.json())
			.then((data) => {
				console.log('res: ', data);
				const title = document.querySelector('title')!;
				title.innerHTML = `video tada XXXX`;
				onDataLoaded && onDataLoaded(data);
			});
    }, []); */
	const vr = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		setduration(Math.floor(vr.current!.duration || 0));
		console.log(': ', vr.current!.duration);
	}, []);
	const onLoadedMetadata = (e: any) => {
		console.log('fffff: ', e);
	};

	return (
		<div className='relative w-fit'>
			<video
				ref={vr}
				onLoadedMetadataCapture={onLoadedMetadata}
				onClick={() => {
					console.log('cay thee nho: ', vr.current!.duration);
				}}
				src='/videos/vsx.mp4'
			></video>
			<div className='absolute bottom-0 left-0 right-0 h-24 bg-black z-10'>
				<YTSlider defaultValue={0} max={duration} valueLabelDisplay='auto' valueLabelFormat={SlideTooltipThumbBox} />
			</div>
		</div>
	);
};
