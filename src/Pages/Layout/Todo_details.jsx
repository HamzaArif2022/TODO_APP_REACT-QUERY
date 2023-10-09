import React from 'react'
import { useQuery } from 'react-query'
import TodoApi from '../../Api/TodoApi'
import { Link, useParams } from 'react-router-dom'

function Todo_details() {
  const { id } = useParams()

  const { error, refetch, isFetching, isError, dataUpdatedAt, isLoading, data: Todo } = useQuery(["todo", id], () => { return TodoApi.GetOne(id) }, {
   cacheTime:5000,
   staleTime:3000
  })

  return (
    <>
      <div className='container p-3'>
        {isError && <alert className="alert alert-danger container" >{error.message}</alert>}

        {!isError &&
          (<div>
            <div>Details</div>
            {new Date(dataUpdatedAt).toTimeString()}
            <button className='btn btn-info' disabled={isFetching} onClick={refetch}>refetch</button>

            {isLoading ? <p>loadding......</p> :
              <div >
                <h1>{Todo.title}</h1>
                <p>{Todo.completed ? 'completed' : 'not completed yet'}</p>



              </div>


            }



          </div>
          )}    </div>

    </>
  )
}

export default Todo_details