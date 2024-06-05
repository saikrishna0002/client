import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import serverString from "../models/ServerString";
import axios from "axios";


const EditUserNamePassword:React.FC = () =>{
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    console.log(error);

    useEffect(()=>{
        const getData = async () => {
            const url = `${serverString}/api/faculty/getFacultyDetails`;
            const token = localStorage.getItem('token');
      
            try {
              const response = await axios.get(url, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (response.status === 200) {
                setUsername(response.data.UserName);
                setPassword(response.data.Password);
              } else {
                setError('Something went wrong');
              }
            } catch (error) {
              setError('Error retrieving data');
            } finally {
              setLoading(false);
            }
          };
          getData();
    },[])
    

    const updatePassword = async () => {
        setLoading(true); // Clear previous errors before starting the new login attempt
    
        const url = `${serverString}/api/faculty/updateUsernamePassword`;
        const token = localStorage.getItem('token');

        const postData = {
          UserName: username,
          Password: password
        };
    
        try {
          const response = await axios.post(url, postData,{
                headers: {
                Authorization: `Bearer ${token}`,
                },
            }
          );
          if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);
            console.log('Login successful');
            setLoading(false);
          } 
           else {
            setError("Error logging in");
          }
        } catch (error) {
            setError("Error logging in");
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    return(
        <div className="grid grid-cols-3">
        <div className="sm:hidden max-sm:col-span-3 sm:col-span-2 ">
          <Navbar/>
        </div>
  
  
        <div className="max-sm:col-span-3 col-span-1 m-4 h-fit bg-slate-200 dark:bg-slate-700 dark:text-white rounded-md p-4">
            <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 capitalize"
            >
            Enter New Username 
            </label>
            <input
            value={username}
            onChange={(e) =>
                setUsername(e.target.value )
            }
            type="text"
            name="username"
            id="username"
            className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
            />

            <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 capitalize"
            >
            Enter New Password 
            </label>
            <input
            value={password}
            onChange={(e) =>
                setPassword(e.target.value )
            }
            type="text"
            name="password"
            id="password"
            className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
            required
            />

            <div className="flex justify-center items-center h-full mt-4" id="mark_atten">
            <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={updatePassword}
                disabled={loading} // Disable the button when loading
            >
                {loading ? 'Updating...' : 'Update'}
            </button>
            </div>
        </div>
      </div>
    );
}

export default EditUserNamePassword;