"use client"
import SocialSign from '@/components/shared/SocialSign';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const page = () => {

    const handleSignup = async (event) => {
        event.preventDefault();

        const newUser = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };
        const resp = await fetch("http://localhost:3000/signup/nodi", {
            method: "POST",
            body: JSON.stringify(newUser),

            headers: {
                "content-type": "application/json"
            }
        });


        if (resp.status === 200) {

            event.target.reset();

        }
    };
    return (
        <div className='bg-white'>
            <div className=' container px-24 mx-auto py-6'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center '>
                    <div>
                        <Image src='/assets/images/login/login.svg' height='540' width='540' alt='login' />
                    </div>
                    <div className='border-2 p-12 '>
                        <h6 className='text-3xl font-bold text-primary text-center mb-12 '>Sign UP</h6>

                        <form onSubmit={handleSignup} action=''>
                            <label htmlFor="name">Name</label>
                            <br />
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className=" mt-3 input input-bordered input-primary w-full max-w-xs" />
                            <br /> <br />
                            <label htmlFor="email">Email</label>
                            <br />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className=" mt-3 input input-bordered input-primary w-full max-w-xs" />
                            <br /> <br />
                            <label htmlFor="password"> Confirm Password</label>
                            <br />
                            <input
                                name="password"
                                type="password"
                                placeholder="Your Password"
                                className=" mt-3 input input-bordered input-primary w-full max-w-xs" />

                            <button type='submit' className=' text-white font-bold btn btn-primary mt-10 w-full'>Sign Up</button>
                        </form>
                        <div>
                            <h6 className='my-6 text-center'>or sign in with</h6>
                            <SocialSign />
                            <h6 className='my-6 text-center'> Have an Account ? <Link className='font-bold text-primary' href={'/login'}>Login</Link> </h6>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default page;