import React, { useState, useEffect } from "react";

import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { BaseURL } from '../../constant/Constants';

import { GrAdd } from "react-icons/gr";

import { Link } from "react-router-dom";

import {
    useNavigate,
    useParams
  } from "react-router-dom";


const Contact = () => {

    const [Token] = useState(localStorage.getItem('token'));
    const [data, setData] = useState([])
 

    const navigate = useNavigate();


    // get all contact data fetch
    const DataFetch=()=>{
        axios.get(BaseURL+"/contact/",)
        .then(res => {
            setData(res.data) 
        })
        .catch(err => {
            console.log("39 error", err)
        });
    }

    useEffect(() => {
        DataFetch()
    },[])

    // delete contact action
    const deleteButtonClick = (e, id) => {
        e.preventDefault()
        if (Token) {
            axios.delete(BaseURL+`/contact/${id}/`)
            .then(res => {
                console.log(res.data);
                toast.success(res?.data?.message)
                DataFetch()
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.message)
            });
        } else {
            toast.success("Please login your account")
        }    
    }

    // create action
    const CreateAction = () => {
        if (Token) {
            navigate('/addContact');
        } else {
            toast.success("Please login your account")
        }
    }

    // view action
    const viewButtonClick = (e, id) => {
        if (Token) {
            navigate(`/viewContact/${id}/`);
        } else {
            toast.success("Please login your account")
        }
    }

    // edit action
    const editButtonClick = (e, id) => {
        if (Token) {
            navigate(`/editContact/${id}/`);
        } else {
            toast.success("Please login your account")
        }
    }

    // logout action
    const LogOutAction = () => {
        if (Token) {
            localStorage.removeItem("token")
            window.location.reload();
        } 
    }

    return (
    <div className="bg-[#083149] px-10 w-full h-full min-h-screen text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-5xl text-orange-300 normal-case font-semibold mt-4">
         Contact List
        </h1>{" "}
       
        <div class="flex space-x-2">       
            <button className="bg-gray-300 mt-5 mr-300  hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 rounded inline-flex items-center">
                <GrAdd></GrAdd>
                <span onClick={() => { CreateAction() }}>Create</span>
            </button>
    
            {
                Token ?
                <button onClick={() => { LogOutAction() }} className="bg-gray-300 mt-5  hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 rounded inline-flex items-center">
                    Logout
                </button>               
                :
                <Link to="/login">
                    <button className="bg-gray-300 mt-5  hover:bg-gray-400 text-gray-800 font-bold uppercase py-2 px-4 rounded inline-flex items-center ">
                        <span>Login</span>
                    </button>
                </Link>             
            }            
        
        </div> 

      </div>
    
      <div className="overflow-x-auto">
        <table className="table border-0 mt-10 h-[full] bg-[#10425f] rounded-sm w-full max-md:max-w-100 ">
          {/* head */}
          <thead className="text-white bg-[#0e608f]">
            <tr className="border-0 grid grid-cols-5">
              <th>Name</th>
              <th>
                <span className="border-l-2 border-[#777474] pl-2 ml-5">email</span>
              </th>
              
              <th>
                <span className=" border-l-2 border-[#777474] pl-2 ml-5">
                  Phone Number
                </span>
              </th>
              <th>
                <span className=" border-l-2 border-[#777474] pl-2">
                    address
                </span>
              </th>
              <th>
                <span className=" border-l-2 border-[#777474] pl-2">
                  Action
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="h-[50vh] overflow-scroll">
          {data?.data?.map((item, i) => {
              return <>
                <tr class="grid grid-cols-5 bg-blue border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                <td class="px-6 py-4 text-center">
                    {item?.name}
                </td> 
                <td class="px-10 py-4 ml-20 text-center">
                    {item?.email}
                </td> 
                <td class="px-6 py-4 ml-20 text-center">
                    {item?.phone_number}
                </td> 
                <td class="px-6 py-4 ml-10 text-center">
                    {item?.address?.substring(0, 30)}
                </td>
               
                <td class="px-1 py-4 text-center">
                    <button class="bg-green-500 hover:bg-green-700 text-white text-sm font-bold ml-12 py-0.5 px-0.5  rounded" onClick={(e)=>{viewButtonClick(e, item?.id)}}>
                      View
                    </button>
                          
                    <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold ml-0.5 py-1 px-1 rounded"  onClick={(e)=>{editButtonClick(e, item?.id)}}>
                        Edit
                    </button>
                  
                    <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold ml-0.5 py-0.5 px-0.5  rounded" onClick={(e)=>{deleteButtonClick(e, item?.id)}}>
                        delete
                    </button> 
                </td>
              </tr>
              </>
            })}
          </tbody>
        </table>
                
    </div>
    </div>
    )
}

export default Contact;