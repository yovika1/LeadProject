import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import { CaptchaComponent } from '../captcha/Captcha';

export const Login = () => {
  const [value, setValue] = useState({ UserName: "", password: "" });
  const [message, setMessage] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    setMessage(""); // Clear the message when user types in any field
  };

  const handleCaptchaChange = (isValid) => {
    setIsCaptchaValid(isValid);
    if (isValid) {
      setMessage(""); // Clear CAPTCHA message if valid
    }
  };

  const handleLogin = async () => {
    if (value.UserName.length === 0 || value.password.length === 0) {
      setMessage("Please fill all the fields");
      return;
    }

    if (!isCaptchaValid) {
      setMessage("Invalid CAPTCHA. Please try again.");
      return;
    }

    setMessage(""); // Clear message if CAPTCHA is valid

    try {
      const resLogin = await axios.post("http://localhost:8080/loginuser", {
        UserName: value.UserName,
        password: value.password,
      });

      if (resLogin?.status === 200) {
        const token = resLogin?.data?.token;
        if (token) {
          cookie.set("token", token, { expires: 1 });
          alert("User Logged In");
          navigate("/");
          window.location.reload();
        } else {
          alert("Token not received from server");
        }
      } else {
        setValue({ UserName: "", password: "" });
      }
    } catch (error) {
      alert("Invalid Credentials");
      console.error("Something went wrong while logging in", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="UserName" className="block mb-2 text-sm font-medium dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    name="UserName"
                    value={value.UserName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={value.password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                    required
                    onChange={handleChange}
                  />
                </div>
                <CaptchaComponent onCaptchaChange={handleCaptchaChange} />
                {message && <div className="text-red-800">{message}</div>}
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="w-full text-white bg-primary-900 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <p className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    <Link to="/signup">Sign up</Link>
                  </p>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
