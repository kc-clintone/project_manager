import { useMutation } from "@apollo/client"
import { useState } from "react"
import { UPDATE_PROJECT } from "../mutations/projectMutations"
import { GET_PROJECT } from "../queries/projectQueries"

export default function EditProject({ project }) {
  // state manager
  const [name, setName] = useState(project.name)
  const [description, setDescription] = useState(project.description)
  const [status, setStatus] = useState("")

  //   update project mutation
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id, name, description, status },
    refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
  })

  //   submit to edit
  const onSubmit = (e) => {
    if (!name || !description || !status) {
      return alert("Please fill in all fields")
    }
    updateProject(name, description, status)
  }
  return (
    <div className='mt-5'>
      <h3>Update Project Details</h3>
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

        <button
          type='submit'
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </div>
  )
}
