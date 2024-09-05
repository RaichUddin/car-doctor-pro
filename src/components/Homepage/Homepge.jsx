import React from 'react';
import Banner from './Banner';
import About from './About';
import Services from './Services';
import { ToastContainer } from 'react-toastify';

const Homepge = () => {
    return (
        <div className='bg-white'>
            <ToastContainer />
            <Banner />
            <About />
            <Services />
        </div>
    );
};

export default Homepge;