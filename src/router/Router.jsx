import React from "react"
import { Routes,Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { Register } from "../pages/Register"
import { Login } from "../pages/Login"
import { BlogDetail } from "../pages/BlogDetail"
import { Notfound } from "../pages/Notfound"


export const Router = () => {
    return(
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/blogdetail/:id" element={<BlogDetail/>}></Route>
            <Route path="/signup" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="*" element={<Notfound/>}></Route>
        </Routes>
    )
}