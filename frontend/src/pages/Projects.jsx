import { useQuery } from "@apollo/client"
import { Link, useParams } from "react-router-dom"
import ClientInfo from "../components/ClientInfo"
import DeleteProject from "../components/DeleteProject"
import EditProject from "../components/EditProject"
import Spinner from "../components/Spinner"
import { GET_PROJECT } from "../queries/projectQueries"

export default function Projects() {
  const { id } = useParams()
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id },
  })

  if (loading) return <Spinner />
  if (error) return <p>Oops!,Something went wrong...</p>

  return (
    <>
      {!loading && !error && (
        <div className='mx-auto w-75 card p-5'>
          <Link
            to='/'
            className='btn btn-light btn-sm w-25 d-inline ms-auto'
          >
            Back
          </Link>
          <h2>{data.project.name}</h2>
          <p>{data.project.description}</p>
          <h5 className='mt-3'>Project Status</h5>
          <p className='lead '>{data.project.status}</p>
          <ClientInfo client={data.project.client} />
          <EditProject project={data.project} />
          <DeleteProject projectId={data.project.id} />
        </div>
      )}
    </>
  )
}
