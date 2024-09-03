import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


export const SignUp = () => {

  const [credentials,setcredentials]=useState({UserName:"",Password:"",Name:""});

  function handleChange (e){
    setcredentials({...credentials,[e.target.name]:e.target.value})
  }
  const[loading,setloading]= useState(false);
  const handleSignUp = async (e)=>{
    e.preventDefault()
    setloading(true)
    try {
      const res = await axios.post('https://leads-project-7.onrender.com/register',{
        UserName:credentials.UserName,
        Password:credentials.Password,
        Name:credentials.Name,
        isAdmin:true
    
      });
      setloading(false)
      console.log(res);
     if (res?.status===200) {
      localStorage.setItem("token",res?.data?.token);
      alert("Signup successfully");
    }
  } catch (error) {
    setloading(false)
      alert("signup failed");
      console.error("something went wrong while signup",error);
    }
    
  }

  return (
    <div
      className=" mt-4 justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 items-center flex flex-col" 
    
    >
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-slate-900 dark:text-white dark:border-cyan-500">
        <h1 className=" font-bold text-xl leading-tight text-center tracking-tight text-gray-900 md:text-2xl dark:text-white ">
          SignUp Form
        </h1>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className=" space-y-4" onSubmit={handleSignUp}>
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Full Name"
                name="Name"
                onChange={handleChange}
                className=" bg-slate-200 p-2 sm:text-sm rounded-lg w-full dark:text-black "
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">UserName</label>
              <input
                type="text"
                placeholder=""
                name="UserName"
                onChange={handleChange}
                className="bg-slate-200 p-2 sm:text-sm rounded-lg w-full dark:text-black"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder=""
                name="Password"
                onChange={handleChange}
                className=" bg-slate-200 p-2 sm:text-sm rounded-lg w-full dark:text-black"
              />
            </div>

            <div className="text-center w-full cursor-pointer">
             { loading? (<button className=" cursor-wait">loading..</button>
             ):(
             <button
             className=" w-full border-blue-300 focus:ring-2 p-2 rounded-lg mt-2">SignUp</button>
             )}
            </div>
           <p className=" text-center text-sm">or</p>
           <p className=" text-sm text-center cursor-pointer">Already an Account? <Link className=" text-blue-500" to="/login">Click Here</Link></p>
            
          </form>
        </div>
      </div>
    </div>
  );
};
