import React from "react"
import { BlogSection } from "../components/BlogSection"
import { Navbar } from "../components/Navbar"

export const Home = () => {
    return(
        <div>
            <Navbar/>
            <BlogSection/>
        </div>
    )
}