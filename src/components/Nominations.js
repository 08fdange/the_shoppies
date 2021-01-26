import React, { useEffect, useState } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import Movie from './Movie.js'
import { Button } from '@material-ui/core'

const Nominations = (props) => {
    const [userInfo, setUserInfo] = useState("");
    const [nominations, setNominations] = useState([]);
    const { user,logout } = useAuth0();

    useEffect(() => {
        const fetchData = () => {
            fetch(`http://localhost:8080/api/users/${user.email}`)
            .then(resp => resp.json())
            .then(data => {
                setUserInfo(data);
                setNominations(data.nominations)
            })
        };

        fetchData();
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        props.routerProps.history.push('/')
    }

    const handleDeleteClick = (event) => {
        const nominationId = event.target.name;
        fetch(`http://localhost:8080/api/users/${user.email}/nominations/${nominationId}`,{
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setNominations(data.nominations)
        })
    }

    let nominationDisplay = null;
    if (nominations) {
        nominationDisplay = nominations.map((nomination) => {
            return(
                <div>
                    <Movie key={nomination.Title} movie={nomination}/>
                    <Button
                        className={nomination.Title}
                        variant='contained'
                        color='primary'
                        name={nomination._id}
                        onClick={handleDeleteClick}
                    >
                        Delete
                    </Button>
                    <br/><hr/>
                </div>
            )
        })
    }
    
    return(
        <div>
            <div className='button-div'>
                <Button 
                    className='back-button'
                    variant='contained'
                    color='secondary'
                    onClick={handleClick}
                >Back</Button>
            </div>
            <h1>Your Nominations</h1>
            <h5>Logged in as: {userInfo.email}</h5>
            <hr/>
            {nominationDisplay}
        </div>
    )
}

export default Nominations; 