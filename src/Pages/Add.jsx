import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import APi from '../Api/TodoApi';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

export default function Add() {
    const queryClient =useQueryClient()
    const AddMutaion=useMutation((todo)=>{// useMutate allows us to add the data 
        return  APi.Add(todo)
    },{
        onSuccess: (data,variables,context)=>{
            // when the data added succesfully we must invalidate the cach to make call to the new data 
            
            queryClient.invalidateQueries("todos")
        }
    })
   
    const {register,handleSubmit,formState}=useForm()
    const {errors,dirtyFields}=formState
    const OnSubmit =(data)=>{
       AddMutaion.mutate(data)   // send the data to the mutate 


       /* window.location.href="/" */
     
    }

    // mutation 
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(OnSubmit)} className='form-control'>
                <div className="form-group">
                    <label>title</label>
                    <input className='form-control' type="title" {...register("title",{
                                required:{
                                    value:true,
                                    message:"required"
                                }
                    })}/>

                   {errors.title && <span className='text-danger'>{errors.title.message}</span>}


                </div>

               

                <div className="form-group">
                            <input type="checkbox"
                                   className="form-check-input" {...register("completed")}/>
                            <label className='form-check-label'>&nbsp; Completed</label>
                        </div>
                <div className="my-3">
                    <input className='btn btn-primary' disabled={Object.keys(dirtyFields).length===0} type="submit" value='Submit' />
                </div>
            </form>






        </div>
    )
}
