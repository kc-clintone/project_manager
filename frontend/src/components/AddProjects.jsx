import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_PROJECT } from '../mutations/projectMutations';

export default function AddClients() {
	// state manager
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [clientId, setClientId] = useState('');
	const [status, setStatus] = useState('new');

	// get clients
	const { loading, error, data } = useQuery(GET_CLIENTS);

	// addProject query
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: { name, description, clientId, status },
		update(cache, { data: { addProject } }) {
			const { projects } = cache.readQuery({ query: GET_PROJECTS });
			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	// onsubmit form
	const onSubmit = (e) => {
		e.preventDefault();
		if (name === '' || description === '' || status === '') {
			return alert('Please fill in all fields');
		}
		addProject(name, description, clientId, status);

		setName('');
		setDescription('');
		setStatus('new');
		setClientId('');
	};

	if (loading) return null;
	if (error) return 'Oops, something went wrong';
	return (
		<>
			{!loading && !error && (
				<>
					<button
						type='button'
						className='btn btn-primary'
						data-bs-toggle='modal'
						data-bs-target='#addProjectModal'
					>
						<div className='d-flex align-items-center'>
							<FaList className='icon' />
							<div className='ml-2'>Add New Project</div>
						</div>
					</button>

					<div
						className='modal fade'
						id='addProjectModal'
						aria-labelledby='addProjectModalLabel'
						aria-hidden='true'
					>
						<div className='modal-dialog'>
							<div className='modal-content'>
								<div className='modal-header'>
									<h5 className='modal-title' id='addProjectModalLabel'>
										Add New Project
									</h5>
									<button
										type='button'
										className='btn-close'
										data-bs-dismiss='modal'
										aria-label='Close'
									></button>
								</div>
								<div className='modal-body'>
									<form onSubmit={onSubmit}>
										<div className='mb-3'>
											<label className='form-label'>Name</label>
											<input
												type='text'
												id='name'
												className='form-control'
												placeholder='Project name'
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className='mb-3'>
											<label className='form-label'>Description</label>
											<textarea
												id='description'
												className='form-control'
												placeholder='Describe the project here...'
												value={description}
												onChange={(e) => setDescription(e.target.value)}
											></textarea>
										</div>
										<div className='mb-3'>
											<label className='form-label'>Status</label>
											<select
												className='form-select'
												id='status'
												value={status}
												onChange={(e) => setStatus(e.target.value)}
											>
												<option value='new'>new</option>
												<option value='pending'>pending</option>
												<option value='complete'>complete</option>
											</select>
										</div>
										<div className='mb-3'>
											<label className='form-label'>Client</label>
											<select
												className='form-select'
												id='clientId'
												name='client'
												onChange={(e) => setClientId(e.target.value)}
											>
												<option value=''>Select client</option>
												{data.map((client) => (
													<option key={client.id} value={client.id}>
														{client.name}
													</option>
												))}
											</select>
										</div>
										<button
											className='btn btn-primary'
											type='submit'
											data-bs-dismiss='modal'
										>
											Submit
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
