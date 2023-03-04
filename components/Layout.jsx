import React from 'react';
import Footer from './Footer';
import Header from './Header';

const Layout = (props) => {
    const {children} = props
    return (
        <div className='flex flex-col min-h-screen bg-slate-900 text-white'>
            <Header></Header>
            <main className='flex-1 my-5 sm:px-16 flex flex-col'>{children}</main>
            <Footer></Footer>
        </div>
    );
}

export default Layout;
