import React, { useEffect, useState } from "react";
import { Router } from "./router/Router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      once: true,
    });
  }, []);


  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(false)
  useEffect(()=>{
    setIsLoading(true)
    onAuthStateChanged(auth,(user)=>{
      if(user){
        navigate("/")
        setIsLoading(false)
      }else{
        navigate("/login")
        setIsLoading(false)
      }
    })
  },[])

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner className="h-16 w-16 text-blue-gray-500" />
      </div>
    );
  }
  return (
    <>
      <Router/>
    </>
  );
}

export default App;
