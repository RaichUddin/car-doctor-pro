
"use client"
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaShoppingBasket, FaSearch, FaBars } from "react-icons/fa";

const Navbar = () => {
    const session = useSession();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About',
            path: '/about'
        },
        {
            title: 'Services',
            path: '/services'
        },
        {
            title: 'My-Bookings',
            path: '/my-bookings'
        },
        {
            title: 'Blogs',
            path: '/blogs'
        },
        {
            title: 'Content',
            path: '/content'
        },

    ];

    return (
        <div className='bg-base-100 text-slate-900'>
            <div className="navbar container mx-auto flex justify-between items-center py-4">
                <div className="navbar-start">
                    <Link href={'/'}>
                        <Image src="/assets/logo.svg" width={100} height={60} alt='logo' />
                    </Link>
                    <button
                        className="lg:hidden ml-4 text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <FaBars />
                    </button>

                </div>

                <div className={`navbar-center lg:flex ${isOpen ? 'flex' : 'hidden'} lg:static absolute top-16 left-0 right-0 bg-base-100 lg:bg-transparent lg:flex-row flex-col lg:items-center`}>
                    <div className='flex flex-col lg:flex-row items-center lg:space-x-6'>
                        {
                            navItems.map((item) => (
                                <Link className='font-semibold hover:text-primary duration-300 py-2 lg:py-0' href={item.path} key={item.path} >{item.title}</Link>
                            ))
                        }
                    </div>
                </div>
                {/* <div className="navbar-end"> */}
                <div className='navbar-end flex items-center space-x-3'>
                    < FaSearch className='text-xl cursor-pointer ml-3' />
                    <FaShoppingBasket className='text-xl cursor-pointer' />
                    <Link href="/appointment" className="btn btn-outline btn-primary px-4 ">
                        Appointment
                    </Link>

                    {
                        session?.status === 'loading' &&
                        <h6>loading....</h6>
                    }
                    {
                        session?.status === 'unauthenticated' &&
                        <Link href={'/login'}><button className='btn btn-outline font-bold btn-primary'>Login</button></Link>
                    }
                    {
                        session?.status === 'authenticated' &&
                        <button onClick={() => signOut()} className='btn btn-outline font-bold btn-primary'>Logout</button>
                    }

                </div>
                {/* </div> */}
            </div>
            <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
                <Link href="/appointment" className="btn btn-outline btn-primary w-full">
                    Appointment
                </Link>
            </div>
        </div>
    );
};

export default Navbar;