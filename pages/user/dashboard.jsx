import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/dist/server/api-utils';
import React from 'react';

const Dashboard = () => {
    const {currentUser} = useAuth()
    if(!currentUser) document.location = '/auth/login'
    console.log(currentUser);
    return (
        <div>
            {currentUser && <div>UserInfo</div>}
        </div>
    );
}

export default Dashboard;
