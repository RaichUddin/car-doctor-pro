"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
// import { NextResponse } from 'next/server';
import React, { useCallback, useEffect, useState } from 'react';

const Page = () => {
    const [books, setBooks] = useState([]);
    const { data: session, status } = useSession();

    const loadData = useCallback(async () => {
        if (!session?.user?.email) return;
        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/${session.user.email}`);
            if (resp.ok) {
                const data = await resp.json();
                setBooks(data?.myBookings || []);
            } else {
                console.error("Failed to load bookings.");
            }
        } catch (error) {
            console.error("An error occurred while fetching bookings:", error);
        }
    }, [session?.user?.email]);

    const handleDelete = async (id) => {
        const deleted = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/delete-booking/${id}`, {
            method: "DELETE",
        });
        const resp = await deleted.json();
        if (resp?.response?.deletedCount > 0) {
            loadData();
        }
    };
    useEffect(() => {
        if (status === 'authenticated') {
            loadData();
        }
    }, [status, loadData]);
    return (
        <div className='container mx-auto'>
            <div className='relative h-72'>
                <Image
                    className='absolute h-72 w-full left-0 top-0 object-cover rounded-lg'
                    src={'/assets/images/about_us/parts.jpg'}
                    alt='service'
                    width={1920}
                    height={1820}
                    style={{ width: '90vw' }}
                />
                <div className='absolute h-full left-0 top-0 flex items-center justify-center'>
                    <h1 className='text-amber-600 ml-3 text-3xl font-bold flex justify-center'>
                        My Bookings of
                    </h1>

                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>
                            <th></th>
                            <th>Service Name</th>
                            <th>Price</th>
                            <th>Booking date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            books?.map(({ _id, price, date, serviceTitle }) => (
                                <tr key={_id} className="bg-base-200">
                                    <th> 1</th>
                                    <td>{serviceTitle}</td>
                                    <td>{price}</td>
                                    <td>{new Date(date).toLocaleDateString()}</td>
                                    <td>
                                        <div className='flex items-center space-x-3'>
                                            <Link href={`/my-bookings/update/${_id}`}><button className='btn btn-primary'>Edit</button></Link>
                                            <button onClick={() => handleDelete(_id)} className='btn btn-warning'>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Page;