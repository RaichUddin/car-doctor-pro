import React from 'react';

const Banner = () => {
    return (
        <div className='bg-white'>
            <div className='container mx-auto'>
                <div className="carousel w-full mt-12">
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            id={`slide${index + 1}`}
                            className="carousel-item relative w-full bg-cover bg-center h-[70vh] md:h-[80vh] lg:h-[90vh] rounded"
                            style={{
                                backgroundImage: `linear-gradient(45deg, rgba(7,25,82,0.7), rgba(0,0,0,0.3)), url(/assets/images/banner/${index + 1}.jpg)`,
                            }}
                        >
                            <div className='w-full h-full flex items-center px-4 md:px-12 lg:px-36'>
                                <div className='space-y-4 text-center md:text-left'>
                                    <h1 className='text-3xl md:text-5xl font-bold text-stone-100'>{banner.title}</h1>
                                    <p className='text-stone-100'>{banner.description}</p>
                                    <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
                                        <button className='btn btn-primary text-white'>Discover More</button>
                                        <button className='btn btn-primary btn-outline'>Latest Project</button>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href={banner.prev} className="btn btn-circle">❮</a>
                                <a href={banner.next} className="btn btn-circle">❯</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const banners = [
    {
        title: "Affordable Price For Car Servicing",
        description: "There are many variations of passages available, but the majority have suffered alteration in some form.",
        next: "#slide2",
        prev: "#slide4"
    },
    {
        title: "Quality Car Maintenance",
        description: "Ensuring your car runs smoothly with our top-notch maintenance services.",
        next: "#slide3",
        prev: "#slide1"
    },
    {
        title: "Expert Technicians",
        description: "Our team consists of highly skilled technicians ready to handle any car issue.",
        next: "#slide4",
        prev: "#slide2"
    },
    {
        title: "Fast and Reliable Service",
        description: "We value your time and strive to provide quick and reliable service every time.",
        next: "#slide1",
        prev: "#slide3"
    },
];

export default Banner;
