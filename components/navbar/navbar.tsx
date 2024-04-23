import Link from 'next/link';
import Renderer from '../renderer/renderer';
import { NAVS } from './navbar.const';

function Navbar() {
	return (
		<div className='flex gap-4 px-4 py-2 justify-end'>
			<Renderer
				items={NAVS}
				render={(item, index) => {
					return <Link href={item.url}>{item.title}</Link>;
				}}
			/>
			<Renderer
        items={[1,2,'3',4,5,'6']}
        render={(item, index) => <></>}      
      />
		</div>
	);
}
export default Navbar;
