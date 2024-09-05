import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CardService = ({ nodi }) => {
    const { title, img, price, _id } = nodi || {};
    return (
        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <Image src={img} height={120} width={350} alt='pic' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-between items-center">
                    <h6 className='text-primary font-bold'>Price: {price}</h6>
                    <Link href={`/services/${_id}`}><button className="btn btn-primary text-stone-100">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default CardService;