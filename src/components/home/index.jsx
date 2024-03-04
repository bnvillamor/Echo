import React from 'react'
import { useAuth } from '../../contexts/authContext'
import AddUser from './AddUser'

const Home = () => {
    const { currentUser } = useAuth()
    return (
        <div>
            <div className='text-2xl font-bold pt-14'>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, you are now logged in.</div>
            <div className='container'>
                <AddUser />
            </div>
        </div>
    )
}

export default Home