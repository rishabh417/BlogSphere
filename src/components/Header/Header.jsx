import React from "react";
import { Link } from "react-router-dom";
import {Container , LogoutBtn, Logo} from '../index'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header(){

    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
          }, 
          {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]

    return (

            <header className='py-2 shadow bg-black'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px'   />

              </Link>
          </div>

          <ul className="flex ml-auto">
            {
                navItems.map((item) =>
                    item.active ? (
                        <li key={item.name}>
                            <button
                                onClick={() => navigate(item.slug)}
                                className='inline-bock px-6 py-2 duration-200 text-white font-bold hover:bg-gray-600 hover:font-extrabold rounded-full'
                                >{item.name}</button>
                        </li>
                    ) : null
                )                
            }
            {authStatus && (
                <li>
                    <LogoutBtn />
                </li>
            )}
          </ul>
          
        </nav>
        </Container>
    </header>
    )
}

export default Header