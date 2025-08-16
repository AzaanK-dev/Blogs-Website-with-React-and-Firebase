import React, { useContext } from "react";
import Image from "../assets/logo.png";
import { context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast from "react-hot-toast";
import { Button } from "@material-tailwind/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export const Navbar = () => {
  const { setIsLoading } = useContext(context);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully!");
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex justify-between items-center px-6 py-3 md:px-14 shadow-lg">
      <img
        src={Image}
        alt="Logo"
        className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain mt-2 cursor-pointer"
        onClick={()=> navigate("/")}
      />

      <Button
        className="flex items-center gap-2 bg-[#0296D8] text-white hover:opacity-80 transition text-sm px-4 py-2"
        onClick={logoutHandler}
      >
        <ArrowRightOnRectangleIcon className="h-5 w-5" />
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </div>
  );
};
