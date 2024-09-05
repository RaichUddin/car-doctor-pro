import { getServicesDetais } from '@/services/getServiceDetails';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = async ({ params }) => {
    const details = await getServicesDetais(params.id);
    const { _id, title, description, img, price, facility } = details.service;

    return (
        <div className='w-11/12 mx-auto my-10'>
            <div>
                {/* Image section */}
                <div className='relative h-48 md:h-72'>
                    <Image
                        className='absolute w-full h-full object-cover'
                        src={img}
                        alt='service'
                        width={1920}
                        height={1820}
                    />
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40'>
                        <h1 className='text-white text-2xl md:text-3xl font-bold text-center'>
                            Details of {title}
                        </h1>
                    </div>
                </div>

                {/* Description section */}
                <div className='p-6 md:p-10 bg-gray-100'>
                    <h2 className='text-2xl md:text-3xl font-bold text-orange-600'>Details</h2>
                    <p className='text-base md:text-lg'>{description}</p>
                </div>
            </div>

            {/* Facility and Price Section */}
            <div className='my-6'>
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    {/* Facility section */}
                    <div className='lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6'>
                        {facility.map((item, index) => (
                            <div className='bg-rose-100 p-4 border-t-4 border-t-rose-500 rounded-xl' key={index}>
                                <h2 className='text-lg md:text-xl font-bold'>{item.name}</h2>
                                <p className='text-sm md:text-base'>{item.details}</p>
                            </div>
                        ))}
                    </div>

                    {/* Price and Checkout section */}
                    <div className='p-6 bg-gray-100'>
                        <Image
                            className='w-full object-cover h-32 md:h-40'
                            src={'/assets/images/checkout/checkout.png'}
                            width={200}
                            height={40}
                            alt='checkout'
                        />
                        <div className='flex items-center my-4'>
                            <h2 className='text-lg md:text-xl font-bold'>Price:</h2>
                            <p className='text-2xl text-rose-500 font-bold ml-2'>$ {price}</p>
                        </div>
                        <Link href={`/checkout/${_id}`}>
                            <button className='bg-rose-500 px-3 py-2 rounded-lg mt-2 w-full text-white'>
                                Check out
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
