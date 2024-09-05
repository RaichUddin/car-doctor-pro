import Image from 'next/image';
import React from 'react';

const About = () => {
    return (
        <div className='bg-white'>
            <div className='container mx-auto mt-5'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <div className='relative '>
                        <Image
                            className='rounded '
                            src={'/assets/images/about_us/person.jpg'} width={460} height={473} alt='image' />
                        <div className='absolute right-1 bottom-0 mr-12 '>
                            <Image className='rounded ' src={'/assets/images/about_us/parts.jpg'} width={227} height={232} alt='image' />
                        </div>
                    </div>
                    <div className='space-y-8'>
                        <h6 className='text-2xl font-bold'>About Us
                            We are qualified & of experience in this field</h6>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don not look even slightly believable. </p>
                        <button className='btn btn-primary text-slate-100'>Get More Info</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default About;