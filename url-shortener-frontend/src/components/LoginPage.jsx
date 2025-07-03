import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useContextApi } from "../context_api/ContextApi";
const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken } = useContextApi();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const handleLogin = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/v1/users/login", data);

      setAccessToken(response.data?.accessToken);
      localStorage.setItem("ACCESS_TOKEN", response.data?.accessToken);
      console.log(response.data?.accessToken);
      toast.success("Login Successful");
      reset();
      navigate("/dashboard");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="sm:w-[450px] w-[360px] border-gray-500  shadow-xl py-8 sm:px-8 px-4 rounded-md"
      >
        <h1 className="text-center bg-gradient-to-l from-blue-500 to-rose-500 bg-clip-text text-transparent font-serif text-btnColor font-bold lg:text-3xl text-2xl">
          Login Here
        </h1>

        <hr className="mt-2 mb-5 text-black" />

        <div className="flex flex-col gap-3">
          <TextField
            label="Username"
            required
            id="username"
            type="text"
            message="*Username is required"
            placeholder="Type your username"
            register={register}
            errors={errors}
          />

          <TextField
            label="Password"
            required
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Type your password"
            register={register}
            min={6}
            errors={errors}
          />
        </div>

        <button
          disabled={loader}
          type="submit"
          className="bg-customRed font-semibold text-white bg-gradient-to-l from-blue-500 to-rose-500  w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
        >
          {loader ? "Loading..." : "Login"}
        </button>

        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account?
          <Link
            className="font-semibold underline hover:text-black"
            to="/register"
          >
            <span className="text-btnColor"> SignUp</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
