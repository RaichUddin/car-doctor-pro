"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = ({ params }) => {
    const { data } = useSession()

    const [booking, setBooking] = useState([]);

    const loadBooking = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/delete-booking/${params.id}`);
            if (res.ok) {
                const data = await res.json();
                setBooking(data.response);
            } else {
                toast.error('Failed to load booking.');
            }
        } catch (error) {
            toast.error('An error occurred while loading booking.');
        }
    }, [params.id]);

    const handleUpdate = async (event) => {
        event.preventDefault();
        const bookingUpdate = {
            date: event.target.date.value,
            phone: event.target.phone.value,
            address: event.target.address.value,
        }

        try {
            const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/my-bookings/api/delete-booking/${params.id}`, {
                method: "PATCH",
                body: JSON.stringify(bookingUpdate),
                headers: {
                    "content-type": "application/json",
                },
            });
            if (resp.status === 200) {
                toast.success("Updated successfully");
            } else {
                toast.error("Update failed");
            }
        } catch (error) {
            toast.error("An error occurred during the update");
        }

    };

    useEffect(() => {
        if (params?.id) {
            loadBooking()
        }
    }, [params.id, loadBooking]);



    return (
        <div className='bg-white'>

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
                            Booking Update
                        </h1>

                    </div>
                </div>
                <div className='bg-slate-300 my-12 p-12 rounded-lg'>
                    <form onSubmit={handleUpdate} >
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Name</span>
                                </label>
                                <input defaultValue={data?.user?.name} type='text' name='name' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Your Email</span>
                                </label>
                                <input defaultValue={data?.user?.email} type='text' name='email' className='input input-bordered' />

                            </div>

                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Date</span>
                                </label>
                                <input defaultValue={booking.date} type='date' name='date' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Due Amount</span>
                                </label>
                                <input readOnly defaultValue={booking.price} type='text' name='price' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Phone</span>
                                </label>
                                <input defaultValue={booking.phone} type='text' name='phone' placeholder='Your Phone' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Present Address</span>
                                </label>
                                <input defaultValue={booking.address} type='text' name='address' placeholder='Your Address' className='input input-bordered' />

                            </div>

                        </div>
                        <div className='form-control mt-6'>
                            <input className='btn btn-primary btn-block text-white' type="submit" value="Order Confirm" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;