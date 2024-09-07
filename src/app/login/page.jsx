"use client";

import Image from 'next/image';
import React, { Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SocialSign from '@/components/shared/SocialSign';


const Page = () => {
    const router = useRouter();
    const session = useSession();
    // const searchParams = useSearchParams();
    // const path = searchParams.get('redirect');

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        const resp = await signIn("credentials", {
            email,
            password,
            redirect: true // Use redirect: false to handle manually
        });

        if (resp?.ok) {
            router.push('/');
        } else {
            console.error("Login failed");
        }
    };

    return (

        <div className='bg-white min-h-screen flex items-center justify-center'>
            <div className='container px-4 md:px-12 lg:px-24 mx-auto py-12'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center'>
                    {/* Left image */}
                    <div className='hidden lg:block'>
                        <Image
                            src='/assets/images/login/login.svg'
                            height={540}
                            width={540}
                            alt='login'
                        />
                    </div>

                    {/* Login form */}
                    <div className='border-2 p-8 md:p-12'>
                        <h6 className='text-2xl md:text-3xl font-bold text-primary text-center mb-8 lg:mb-12'>Sign In</h6>

                        <form onSubmit={handleLogin}>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="mt-3 input input-bordered input-primary w-full"
                                required
                            />
                            <br /> <br />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Your Password"
                                className="mt-3 input input-bordered input-primary w-full"
                                required
                            />

                            <button type='submit' className='btn btn-primary text-white font-bold mt-8 w-full'>
                                Sign In
                            </button>
                        </form>

                        {/* Social sign-in section */}
                        <div>
                            <h6 className='my-6 text-center'>or sign in with</h6>
                            <SocialSign />
                            <h6 className='mt-6 text-center'>
                                Not have an account?{' '}
                                <Link className='font-bold text-primary' href={'/signup'}>
                                    Sign Up
                                </Link>
                            </h6>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

