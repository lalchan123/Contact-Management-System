import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { BaseURL } from '../../constant/Constants';


import {
    useNavigate,
    useParams
  } from "react-router-dom";

const SignIn = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    // sign in action
    const SignInAction = (e) => {
        e.preventDefault()
        const data = {
          'username': username, 
          'password': password, 
        } 
    
        const config = {
          headers: {
            "Content-type": "application/json",
            'content-type': 'multipart/form-data',
          },
        };
      
        axios.post(BaseURL+"/login/", data, config)
          .then(response => {
              toast.success(response.data.message)
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              navigate('/');
            })
            .catch(err => {
                toast.error(err.response.data.message)
            });
    }



    return (
        <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex mb-1'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                Email or Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email or username"
                                    type="text"
                                    autoComplete="email"
                                    placeholder="Please enter email or username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm pl-1 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                               
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Please enter password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-black pl-1 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none "
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-bold border border-blue-950 hover:border-slate-100 text-blue-950 bg-slate-100 leading-6 hover:text-white shadow-sm hover:bg-blue-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                                onClick={(e) => { SignInAction(e) }}
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link to="/signup" className="font-semibold leading-6 text-blue-950 hover:text-blue-900">
                            Create a new account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;