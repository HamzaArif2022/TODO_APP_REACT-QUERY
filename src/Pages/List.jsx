import React, { useEffect, useState } from 'react'
import APi from '../Api/TodoApi';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Add from './Add';

export default function List() {

  const [Error, setErorr] = useState();
  const { data: Todo, isLoading, isError, error, dataUpdatedAt, isFetching, refetch } = useQuery(["todos"], () => { return APi.Getall() }, {
    refetchOnWindowFocus: false, // lorsque on quitter la page ne recharge pas l'api une autre fois 
    // refetchOnMount:false,// lorsque on a navige entre les pages ne recharge pas l'api une autre fois 
    retry: 2, // lorsque une erreur a ete declencher en faite un deuxieme appel 
    cacheTime: 5000, // combien de temps vous voullez  enregistre le cache dans le navigatore
    staleTime: 4000,// refreche the api after 4000 from the first call
    onError: (err) => {// when the error is occured
      setErorr(err.message)
    },
    onSuccess: () => {// when the succes is occured
      console.log("success");
    }

  })

  const queryClient = useQueryClient()
  const DeleteMutation = useMutation((id) => {
    return APi.delete(id)
  }, {
    onSuccess: (data, variables, context) => {

      queryClient.removeQueries(["todo", variables])// variables return the id value 
      queryClient.invalidateQueries("todos")
    },// variables return the id value 

    //when successfull deleted todo item oui invalidate the cach to be return the new cach 
  })
  const handlerDelete = async (e, id) => {
    e.preventDefault()
    DeleteMutation.mutate(id)
  }



  return (

    <div className='container p-3'>
      <Add />
      {isError && <alert className="alert alert-danger container" >{Error}</alert>}
      {!isError &&
        (<div>
          {new Date(dataUpdatedAt).toTimeString()}
          <button className='btn btn-info' disabled={isFetching} onClick={refetch}>refetch</button>
          <table class="table table-border">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">title</th>
                <th scope="col">Completed</th>
                <th scope="col">Action</th>

              </tr>
            </thead>
            <tbody>
              {isLoading ? <p>loadding......</p> : Todo?.map((todo) => (
                <tr key={todo.id}>

                  <td>{todo.id}</td>
                  <td>{todo.title}</td>
                  <td><span className={`badge ${todo.completed ? 'bg-success' : 'bg-danger'} rounded-5 `}>  &nbsp;</span></td>
                  <td>
                    <button className='btn btn-danger' value={todo.id} onClick={(e) => handlerDelete(e, todo.id)} >
                      Delete
                    </button>
                    <Link to={'/update/' + todo.id}>
                      <button className='btn btn-success'>Update</button>
                    </Link>
                    <Link to={'/details/' + todo.id}>
                      <button className='btn btn-primary'>deatils</button>
                    </Link>
                  </td>


                </tr>
              ))

              }

            </tbody>
          </table>
        </div>
        )}    </div>
  )
}