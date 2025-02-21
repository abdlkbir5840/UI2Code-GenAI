"use client"
import { auth } from '@/configs/firebaseConfig';
import { signOut } from 'firebase/auth';
import React from 'react'
import { useAuthContext } from '../provider';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Home, Paintbrush, DollarSign } from 'lucide-react'; // Importing icons from lucide-react

const items = [
    {
        title: "Workspace",
        url: "/dashboard",
        icon: <Home size={16} />, // Example icon with size
    },
    {
        title: "Design",
        url: "/design",
        icon: <Paintbrush size={16} />,
    },
    {
        title: "Credits",
        url: "/credits",
        icon: <DollarSign size={16} />,
    },
];

function ProfileAvatar() {

    const user = useAuthContext();
    const router = useRouter();
    const onButtonPress = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            router.replace('/')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <div>
            <Popover >
                <PopoverTrigger>
                    {user?.user?.photoURL && <img src={user?.user?.photoURL} alt='profile' className='w-[35px] h-[35px] rounded-full' />}
                </PopoverTrigger>
                <PopoverContent className='w-[150px] max-w-sm'>
                    <div className="flex flex-col">
                        {items.map((item, index) => (
                            <Button 
                                key={index}
                                variant={'ghost'} 
                                onClick={() => router.push(item.url)} 
                                className="flex items-start justify-start space-x-2"
                            >
                                {item.icon}
                                <span>{item.title}</span>
                            </Button>
                        ))}
                        {/* Divider */}
                        <hr className=" border-t border-gray-200 w-full" />

                        <Button variant={'ghost'} onClick={onButtonPress} className=''>
                            Logout
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ProfileAvatar;
