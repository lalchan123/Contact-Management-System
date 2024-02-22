import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { BaseURL } from '../../constant/Constants';

const SignUp = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // sign up action
    const SignUpAction = (e) => {
        e.preventDefault()
        const data = {
          'username': username, 
          'email': email, 
          'password': password, 
        } 
    
        const config = {
          headers: {
            "Content-type": "application/json",
            'content-type': 'multipart/form-data',
          },
        };
      
        axios.post(BaseURL+"/register/", data, config)
          .then(response => {
              toast.success(response.data.message)
              setUsername("")
              setEmail("")
              setPassword("")
            })
            .catch(err => {
                toast.error(err.response.data.message)
            });
    }

    return (
        <div>
            <div className='bg-slate-100 lg:mx-0 text-blue-950 min-h-screen flex mb-1'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6  lg:px-8 ">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight ">
                            Sign up a new account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="Please enter username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-black shadow-sm  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="Please enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-black shadow-sm  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="password"
                                        placeholder="Please enter password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 pl-1 text-black shadow-sm  sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md text-blue-950 bg-white hover:text-white hover:bg-blue-950 border border-blue-950 hover:border-slate-100 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm "
                                    onClick={(e) => { SignUpAction(e) }}
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already a member?{' '}
                            <Link to="/login" className="font-semibold leading-6 text-blue-950 hover:text-blue-950">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;