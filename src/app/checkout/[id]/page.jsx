"use client"
import { getServicesDetais } from '@/services/getServiceDetails';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Checkout = ({ params }) => {


    const { data } = useSession();

    const [service, setService] = useState({});

    const loadData = async () => {
        const details = await getServicesDetais(params.id);
        setService(details.service);

    };

    const { _id, title, description, img, price, facility } = service || {};



    const handleBooking = async (event) => {
        event.preventDefault();
        const newBooking = {

            name: data?.user?.name,
            email: data?.user?.email,
            phone: event.target.phone.value,
            date: event.target.date.value,
            address: event.target.address.value,
            serviceId: _id,
            serviceTitle: title,
            price: price,
        }

        const resp = await fetch('http://localhost:3000/checkout/api/new-booking', {
            method: "POST",
            body: JSON.stringify(newBooking),
            headers: {
                "content-type": "application/json"
            }
        });
        if (resp.ok) {
            toast.success("Booking confirmed!");
        } else {
            toast.error("Booking failed!");
        }

        event.target.reset();

    };
    useEffect(() => {
        loadData();
    }, [params])
    return (
        <div className='bg-white'>
            <div className='container mx-auto'>
                <ToastContainer />
                <div className='relative h-72'>
                    <Image
                        className='absolute h-72 w-full left-0 top-0 object-cover rounded-lg'
                        src={img}
                        alt='service'
                        width={1920}
                        height={1820}
                        style={{ width: '90vw' }}
                    />
                    <div className='absolute h-full left-0 top-0 flex items-center justify-center'>
                        <h1 className='text-amber-600 ml-3 text-3xl font-bold flex justify-center'>
                            Checkout of {title}
                        </h1>

                    </div>
                </div>
                <div className='bg-slate-300 my-12 p-12 rounded-lg'>
                    <form onSubmit={handleBooking}>
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
                                <input type='date' name='date' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Due Amount</span>
                                </label>
                                <input readOnly defaultValue={price} type='text' name='price' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Phone</span>
                                </label>
                                <input type='text' name='phone' placeholder='Your Phone' className='input input-bordered' />

                            </div>
                            <div className='form-control'>
                                <label className='label'>
                                    <span className='label-text'>Present Address</span>
                                </label>
                                <input type='text' name='address' placeholder='Your Address' className='input input-bordered' />

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

export default Checkout;