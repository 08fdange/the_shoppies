import React, { useState, useEffect } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import Form from './Form.js';
import { Button } from '@material-ui/core';
import Movie from './Movie.js';

const LoggedIn = (props) => {
    const [movie, setMovie] = useState([]);
    const [query, setQuery] = useState("");
    const [showSearch, toggleDiv] = useState(false);
    const { nominations } = props;

    useEffect(() => {
        const postUser = () => {
            fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'email': user.email
                })
            })
            .then(resp => resp.json())
            .then(data => {
                if (data.err) {
                    console.log("User exists")    
                } else {
                    console.log("User in DB")
                }
            })
        }
        const fetchUser = () => {
            fetch('http://localhost:8080/api/users')
            .then(resp => resp.json())
            .then(users => {
                if (!users.find(u => {
                    u.email == `${user.email}`
                })) {
                    postUser();
                } else {
                    console.log("User exists")
                }
            })
        }

        fetchUser();
    }, [])

    const handleChange = input => event => {
        setQuery(event.target.value)
    }

    const handleClick = event => {
        event.preventDefault();
        const apiUrl = "http://www.omdbapi.com/?t=";
        const apiKey = "&apikey=f6f696dd"; 
        const fullUrl = `${apiUrl}${query}${apiKey}`;
        return fetch(fullUrl)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setMovie(data)
            if (data.Response === "False") {
                toggleDiv(false)
            }
            else {
                toggleDiv(true)
            }
        })
    }

    const handleNominationClick = event => {
        event.preventDefault();
        if (nominations.find(nomination => nomination.Title === movie.Title)) {
            console.log("Already nominated!")
        } else {
        fetch(`http://localhost:8080/api/users/${user.email}/nominations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                    "Title": movie.Title,
                    "Year": movie.Year,
                    "Plot": movie.Plot,
                    "Actors": movie.Actors,
                    "Rated": movie.Rated,
                    "Poster": movie.Poster
            }),
        })
        .then(resp => resp.json())
        .then(data => {
            console.log("Nomination Saved!")
            console.log(data)
        })
        }
    }

    const nominationsClick = () => {
        props.routerProps.history.push('/nominations')
    }

    const {
        // getTokenSilently,
        // loading,
        user,
        logout,
        // isAuthenticated,
      } = useAuth0();

    return(
        <div className='container'>
            <div className='bg-image'></div>
            <div className='nominations-button-div' align='left'>
                <Button
                    className='nominations-button'
                    variant='contained'
                    color='secondary'
                    onClick={() => nominationsClick()}
                    >Nominations
                </Button>
            </div>
            <div className='button-div' align='right'>
                <Button
                    className="logout-button"
                    variant='contained'
                    color='secondary'
                    onClick={() => logout()}
                    >Log out
                </Button>
            </div>
            <div align='center' className='content'>
                <h1 className='header'>Search For Your Favorite Movies</h1>
                <hr style={{marginBottom: '5px'}}/>
                {showSearch ? <Movie 
                                movie={movie}
                                handleNominationClick={handleNominationClick}
                            /> : null
                }
                <Form
                    query={query} 
                    handleChange={handleChange}
                    handleClick={handleClick} 
                />
            <br/>
            </div>
        </div>
    )
}

export default LoggedIn;