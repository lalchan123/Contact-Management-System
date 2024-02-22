import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from 'axios'

import {
  useNavigate,
  useParams
} from "react-router-dom";

import { BaseURL } from '../../constant/Constants';



const ViewContact = () => {
  
  const { id } = useParams();

  const [data, setData] = useState([])

  function DataFetch() {
   
    axios.get(BaseURL+`/contact/${id}/`)
      .then(res => setData(res.data.data))
      .catch(err => console.log(err));
  }
  

  useEffect(() => {
    DataFetch()
  }, [])
    
  console.log("data", data);   
  
  return (
    <div className="lg:mx-0 bg-[#083149] px-10 w-full h-full min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         View Contact Detail
        </h1>{" "}
        <div class="flex space-x-2">       
           
            <Link to="/">
                <button className="bg-gray-300 mt-5  hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 rounded inline-flex items-center ">
                    <span>Back</span>
                </button>
            </Link>             
       
        </div>       
      </div>
      <div className="flex justify-between items-center mt-10 ml-1 mb-10 uppercase text-lg tracking-wide">
        <div>
          <p>ID: { data?.id}</p>
          <p>Name: { data?.name}</p>
          <p>Email: { data?.email}</p>
          <p>Phone Number: { data?.phone_number}</p>
          <p>Address: { data?.address}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
