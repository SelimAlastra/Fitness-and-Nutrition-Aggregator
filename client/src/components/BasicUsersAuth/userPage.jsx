import React from 'react';
import { signOut } from '../../actions/userAuth.js';
import { useHistory } from 'react-router-dom';

const LogOut = () => {

    const history = useHistory();

    return (
    <div>
        <button
            onClick={() => {
            signOut(() => {
                history.push('/launch');
            });
            }}
            className='mt-5 tracking-wide font-semibold bg-pink-500 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
        >
            <i className='fas fa-sign-out-alt  w-6  -ml-2' />
            <span className='ml-3'>Sign out</span>
        </button> 
    </div>
);
};

export default LogOut;