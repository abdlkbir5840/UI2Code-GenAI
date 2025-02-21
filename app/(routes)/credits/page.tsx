'use client'
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Credits() {
    const {user} = useAuthContext()
    const [userData, setUserData]= useState<any>()
    const getUserCredits = async() =>{
        const result = await axios.get('/api/user?email='+ user?.email)
        console.log(result.data)
        setUserData(result.data)
    }
    useEffect(() => {
        getUserCredits()
    }, [user && user.email])
    return (
        <div>
            <h2 className='font-bold text-2xl'>Credits</h2>
            <div className='p-5 bg-slate-50 rounded-xl border mt-5 flex justify-between items-center'>
                <div >
                    <h2 className='font-bold text-xl'>My Credits</h2>
                    <p className='text-lg text-gray-500'>{userData?.credits} Credits left</p>
                </div>
                <Button>By More Credits</Button> 
            </div>
        </div>
    )
}

export default Credits