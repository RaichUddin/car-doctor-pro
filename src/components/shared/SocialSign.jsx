import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const SocialSign = () => {
    const session = useSession();
    const router = useRouter();
    // const searchParams = useSearchParams();
    // const path = searchParams.get('redirect');

    const handleSocial = (provider) => {
        const resp = signIn(provider, { redirect: false });
    }
    if (session.status === 'authenticated') {
        router.push('/');
    }
    return (

        <div className='flex justify-center items-center space-x-3'>
            <button onClick={() => handleSocial('google')} className='btn flex justify-center items-center text-2xl'><FcGoogle /></button>
            <button onClick={() => handleSocial('github')} className='btn flex justify-center items-center text-2xl text-primary '><AiFillGithub /></button>
        </div>

    );
};

export default SocialSign;