import React from 'react';

import CardService from '../cards/CardService';
import { raichs } from '@/lib/raich';

const Services = () => {

    const getServices = async () => {
        const services = await fetch("http://localhost:3000/services/api/all-get");
        const res = services.json();
        return res;
    };

    const dataService = async () => {
        const { raichs } = await getServices()
    }

    return (
        <div className='bg-white mt-5 min-h-screen'>
            <div className='container mx-auto text-center'>
                <h2 className='text-2xl font-bold text-orange-600'>Our Services</h2>
                <h3 className='text-5xl'>Our Services Area</h3>
                <p className='text-orange-600 text-center'>the majority have suffered alteration in some form, by injected humour, or randomised<br /> words which do not look even slightly believable. .</p>
            </div>
            <div className='container mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {

                    raichs?.length > 0 && raichs.map((nodi) => (
                        <CardService nodi={nodi} key={nodi._id}></CardService>
                    ))
                }
            </div>

        </div>
    );
};

export default Services;