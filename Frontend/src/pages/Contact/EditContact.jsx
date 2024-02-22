import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { BaseURL } from '../../constant/Constants';


import {
    useNavigate,
    useParams
  } from "react-router-dom";

const EditContact = () => {
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone_number, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
    
  const { id } = useParams();  
  const navigate = useNavigate(); 
  
  useEffect(() => {
    axios.get(BaseURL+`/contact/${id}/`)
        .then(res => {
            setName(res.data.data.name)
            setEmail(res.data.data.email)
            setPhoneNumber(res.data.data.phone_number)
            setAddress(res.data.data.address)
          })
          .catch(err => console.log(err));
    },[])
      

  // update contact action
  const UpdateContact = (e) => {
    e.preventDefault()
    const data = {
      'name': name, 
      'email': email, 
      'phone_number': phone_number, 
      'address': address, 
    } 

   
  
    const config = {
        headers: {
          "Content-type": "application/json",
          'content-type': 'multipart/form-data',
        },
      };
    
      axios.put(BaseURL+`/contact/${id}/`, data, config)
        .then(response => {
            toast.success(response.data.message)
            navigate('/');
          })
          .catch(err => {
              toast.error(err.response.data.message)
          });
  }
  
  return (
    <div className="lg:mx-0 bg-[#083149] px-10 w-full h-full min-h-screen text-white">
      <h1 className="text-5xl text-orange-300 normal-case font-semibold">
        Edit Contact
      </h1>{" "}
      <div className="mt-8">
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Name</span>
        </label>
        <input 
            className="h-12 pl-4 w-full bg-[#083149] border rounded border-neutral-500 " 
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Please enter name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Email Address</span>
        </label>
        <input 
            className="h-12 pl-4 w-full bg-[#083149] border rounded border-neutral-500 " 
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Please enter email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
              
        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Phone Number</span>
        </label>
        <input 
            className="h-12 pl-4 w-full bg-[#083149] border rounded border-neutral-500 " 
            id="phone_number"
            name="phone_number"
            type="number"
            autoComplete="phone_number"
            placeholder="Please enter Phone Number"
            required
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label className="label my-2">
          <span className="label-text text-white text-lg font-semibold tracking-wider">Address</span>
        </label>      
        <textarea 
            rows="8" 
            class="block pl-4 w-full bg-[#083149] border rounded border-neutral-500 " 
            placeholder="Please enter address" 
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
        />
        
      </div>
      <div className="flex items-center justify-center mb-50">
        <button className="btn rounded h-8 bg-gray-500 shadow-inherit border-none mt-6 w-96 text-gray-200 normal-case tracking-wider font-normal hover:bg-gray-600" onClick={(e) => { UpdateContact(e) }}>Update</button>
      </div>
    </div>
  );
};

export default EditContact;
