import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useParams,useNavigate   } from 'react-router-dom'
import axios from 'axios';

function Dashboard() {
    const { id } = useParams();
    const [data, setData] = useState({})
    const navigate = useNavigate();

    const [fetch, setFetch] = useState([])
    const [enrollbtn,setEnrollbtn] = useState("Enroll")

    const userId = data.userId
    const userName = data.name

    async function fetchsUser() {
        try {
            await axios.post("http://localhost:8000/dash", {
                id
            }).then(res => {
                setData(res.data)
            })
        } catch {

        }
    }
    useEffect(() => {
        fetchsUser();
    });
    

    async function enroll(courseId,title){
        try {
            await axios.post("http://localhost:8000/enroll", {
                courseId,title,userId,userName
            })
        } catch (error) {
            
        }
    }

    async function viewCerti(courseId) {
        const newUrl = `certi/${id}${courseId}`;
        window.location.replace(newUrl);
    }
    
    async function fetchData() {
        try {
            await axios.post("http://localhost:8000/courseList", {
            }).then(res => {
                if (res.data) {
                    setFetch(res.data)
                } else {
                    console.log("failed to Fetch")
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div>
            <Header />
            <div className='m-12'>
            <h1 className='text-2xl font-serif '>Hi! Welcome {data.name}</h1>
                <h1 className='text-xl font-bold'>Enrolled Course</h1>
                <div className='flex'>
                    {fetch.map((item, index) => (
                        <div className='flex flex-col shadow-sm p-4 border-2 m-2 w-[20%]' key={index}>
                            <h1 className='font-semibold'>Course Title: {item.title}</h1>
                            <h1 className='font-semibold'>Description: {item.dec}</h1>
                            <h1 className='font-semibold'>Price: {item.price}$</h1>
                            <h1 className='font-semibold'>Duration: {item.duration} hr</h1>
                            
                            <button className='border-2 bg-slate-800 p-1 text-white'onClick={()=>viewCerti(item.courseId)} >View Certificate</button>
                            <button className='border-2 bg-slate-800 p-1 text-white' onClick={()=>enroll(item.courseId,item.title)}>{enrollbtn}</button>
                             
                        </div>
                    ))}
                </div>
                <h1 className='text-xl font-bold'>Avalible courses</h1>
            </div>

            <div>

            </div>
        </div>
    )
}

export default Dashboard