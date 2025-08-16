import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import toast, { LoaderIcon } from "react-hot-toast";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success("Login successfully!");
        navigate("/");
        setIsLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  const signupWithGoogle = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success("Login successfully!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full h-screen justify-center items-center px-4">
      <Card
        color="transparent"
        shadow={false}
        className="shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-xl flex flex-col items-center p-6"
      >
        <Typography
          variant="h4"
          className="mt-2 text-3xl text-center font-black tracking-wider"
        >
          BLOGZAAN
        </Typography>
        <Typography color="gray" className="mt-2 font-normal text-center tracking-widest">
          Let your thoughts flow again!{" "}
        </Typography>

        <form className="mt-6 mb-2 w-full max-w-md" onSubmit={submitHandler}>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-5">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
            />

            <Typography variant="h6" color="blue-gray" className="-mb-5">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
            />
          </div>

          <Button
            className="mt-6 text-md  flex justify-center h-[3rem]"
            fullWidth
            onClick={submitHandler}
          >
            {isLoading ? <LoaderIcon /> : "Login"}
          </Button>

          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 mt-3 text-md"
            fullWidth
            onClick={signupWithGoogle}
          >
            <img
              src="https://www.material-tailwind.com/logos/logo-google.png"
              alt="google"
              className="h-6 w-6"
            />
            Login with Google
          </Button>

          <Typography color="gray" className="m-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[blue] text-[18px] hover:underline"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};
