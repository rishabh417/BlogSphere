import React from "react";
import authService from '../../appwrite/auth'
import { useDispatch } from "react-redux";
import {logout}  from '../../store/authSlice'

export default function LogoutBtn(){

    const dispatch = useDispatch()
    
    const logoutHandler = () => {
        authService.logout().then( () => {
            dispatch(logout())
        } )
    }

    return(
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-gray-600 hover:font-bold
        text-white font-medium bg-blue-950 rounded-full'
        onClick={logoutHandler}>
            Logout
        </button>
    )
}