import React from 'react'
import  List  from "../List"
import { BrowserRouter, Link, Outlet, Route, Routes } from 'react-router-dom'
import Add from '../Add'
import Update from '../Update'
import Todo_details from './Todo_details'

function LayoutTodo() {
    return (
        <BrowserRouter>
            <>
                <ul className="navbar navbar-expand-lg navbar-light bg-light">
                    <li className="navbar-nav mr-auto">
                        <Link to={"/"}>
                            <a className="nav-link active" href="#">List</a>
                        </Link>
                    </li>
                    <li className="navbar-nav mr-auto">

                       {/*  <Link to={"/create"}>
                            <a className="nav-link " href="#">Create</a>
                        </Link> */}
                    </li>

                </ul>
                <Routes>
                    <Route path='/' element={<List />} />
                    <Route path='/create' element={<Add />} />
                    <Route path='/update/:id' element={<Update />} />
                    <Route path='/details/:id' element={<Todo_details />} />
                </Routes>


            </>
            <Outlet/>
        </BrowserRouter>


    )
}

export default LayoutTodo