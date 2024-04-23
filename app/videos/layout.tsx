import css from './video.module.css';
function VideoLayout({ children }: any) {
	return (
		<div className='flex'>
			<div className={css.comnav}></div>
			<div className='main flex-1'>
				<>{children}</>
			</div>
		</div>
	);
}
export default VideoLayout;
