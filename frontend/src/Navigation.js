import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function Navigation() {

    const history = useHistory()

    const { currentUser, setCurrentUser } = useContext(CurrentUser)

    async function handleLogout() {
        await fetch('http://localhost:5000/authentication/logout', {
            credentials: 'include'
        })
        setCurrentUser(null)
    }

    let loginActions = !currentUser
        ? <>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/sign-up")}>
                    Sign Up
                </a>
            </li>
            <li style={{ float: 'right' }}>
                <a href="#" onClick={() => history.push("/login")}>
                    Login
                </a>
            </li>
        </>
        : <>
            <li style={{ float: 'right' }}>
                <button className='btn btn-light' onClick={handleLogout}>Logout</button>
            </li>
            <li style={{ float: 'right' }}>
                Logged in as {currentUser.firstName} {currentUser.lastName}
            </li>
        </>

    let addPlaceButton = currentUser?.role === 'admin'
        ? <li>
            <a href="#" onClick={() => history.push("/places/new")}>
                Add Place
            </a>
        </li>
        : null

    return <nav>
        <ul>
            <li>
                <a href="#" onClick={() => history.push("/")}>
                    Home
                </a>
            </li>
            <li>
                <a href="#" onClick={() => history.push("/places")}>
                    Places
                </a>
            </li>
            {addPlaceButton}
            {loginActions}
        </ul>
    </nav>
}

export default Navigation;