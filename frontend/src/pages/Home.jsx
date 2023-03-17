import AddClients from '../components/AddClients';
import AddProjects from '../components/AddProjects';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

export default function Home() {
	return (
		<>
			<div className='d-flex gap-3 mb-4'>
				<AddClients />
				<AddProjects />
			</div>
			<Projects />
			<hr />
			<Clients />
		</>
	);
}
