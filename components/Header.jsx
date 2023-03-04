import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const { currentUser, logout } = useAuth()
    let isAuth = !!currentUser
    return (
        <header className='top-0 h-14 border-b-2 w-full flex justify-between items-center px-5 sm:px-16'>
            <Link href={'/'} className='text-5xl select-none'>
                NextToDo
            </Link>
            {isAuth &&
                <div className='flex gap-x-3 sm:gap-x-10'>
                    <Link href="/user/dashboard"><i className="fa-solid hover:opacity-50 duration-200 fa-user text-2xl"></i></Link>
                    <button onClick={() => logout()} className='flex items-center gap-x-2 text-xl hover:opacity-50 duration-200'>Logout</button>

                </div>
            }
            {!isAuth &&
                <div className='flex gap-x-3 sm:gap-x-10'>
                    <Link href={'/auth/login'} className='flex items-center gap-x-2 text-2xl hover:opacity-50 duration-200'>Sign in</Link>
                    <Link href={'/auth/register'} className='flex items-center gap-x-2 text-2xl hover:opacity-50 duration-200'>Sign up</Link>
                </div>
            }
        </header>
    );
}

export default Header;
