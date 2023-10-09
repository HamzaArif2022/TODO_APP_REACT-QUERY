import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import APi from '../Api/TodoApi';
import { useParams } from 'react-router-dom';
import { object } from 'prop-types';

export default function Update() {
  const {id} =useParams()
 
    const { register, handleSubmit, formState } = useForm()
    const [Todo, setTodo] = useState();
    const { errors, dirtyFields } = formState
    const Get = async () => {
        const data = await APi.GetOne(id)
        setTodo(data);
       
      }
      useEffect(() => {
        Get()
      }, [id])
    const OnSubmit = (data) => {
           
           console.log(data);
          APi.Update(data)
          window.location.href="/" 
        

    }
    return (
        <div className='container'>
            <h1>Update</h1>

            <form onSubmit={handleSubmit(OnSubmit)} className='form-control'>
                <div className="form-group">
                    <label>title</label>
                    <input type='hidden' value={id} {...register("id")}/>
                    <input className='form-control' defaultValue={Todo?.title} type="title" {...register("title", {
                        required: {
                            value: true,
                            message: "required"
                        }
                    })} />

                    {errors.title && <span className='text-danger'>{errors.title.message}</span>}


                </div>



                <div className="form-group">
                    <input type="checkbox" defaultChecked={Todo?.completed}
                        className="form-check-input" {...register("completed")} />
                    <label className='form-check-label'>&nbsp; Completed</label>
                </div>
                <div className="my-3">
                    <input className='btn btn-primary' disabled={Object.keys(dirtyFields).length === 0} type="submit" value='save' />
                </div>
            </form>






        </div>
    )
}
