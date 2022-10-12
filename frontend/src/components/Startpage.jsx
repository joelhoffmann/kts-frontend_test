import React from "react";
import { useState, useEffect, useMemo } from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import Movie from './Movie'

import frontImage from '../kino-frontcover.jpg'

import StartpageStyles from '../styles/StartpageStyles.css'

import useFetch from 'react-fetch-hook'

export default function Startpage() {
    var { isLoading, data } = useFetch("http://anton.b5r4773jcchdcbhm.myfritz.net:3001/movies-startpage");
    /*
    const isLoading = false;
    var Mockdata = [
        {
            id: 161653131655,
            title: "Wolf of Wallstreet",
            picture_url: "",
            timeslots: ["19:00", "22:00"],
            runtime: 130,
            fsk: 12,
            genre: "Biographie"
        },
        {
            id: 2635165351,
            title: "Findet Nemo",
            picture_url: "",
            timeslots: ["12:00", "24:00"],
            runtime: 130,
            fsk: 12,
            genre: "Kinder"
        },
        {
            id: 16841685416,
            title: "Top Gun:Maverick",
            picture_url: "",
            timeslots: ["19:00", "22:00"],
            runtime: 130,
            fsk: 12,
            genre: "Action"
        },
        {
            id: 5135153153,
            title: "Spiderman",
            picture_url: "",
            timeslots: ["19:00", "22:00"],
            runtime: 130,
            fsk: 12,
            genre: "Action"
        },
        {
            id: 1358684684,
            title: "Batman",
            picture_url: "",
            timeslots: ["19:00", "22:00"],
            runtime: 130,
            fsk: 12,
            genre: "Action"
        }
    ]
    */
    const [refreshState, setRefreshState] = useState(0)
    const [showSearch, setShowSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    const handleFormChange = (e) => {
        const dataCopy = data;
        const formValue = e.target.value
        const newData = [] // saves found input values
        setSearchTerm(formValue)
        if (formValue !== "") {
            for(const movie of data.movies) {
                if (movie.title.toLowerCase().includes(formValue.toLowerCase())) {
                    newData.push(movie)
                }
            }
           // setData(newData)
           setSearchResults(newData)
           setShowSearch(true)
        } else {
           //setData(Mockdata)
           setShowSearch(false)

        }
        //setRefreshState(refreshState => refreshState + 1)
    }

    const LoadingMarkup = isLoading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>) : null;

    const DataMarkup = !isLoading ? (
        <Container fluid>
            <Row>
                <Col>
                    <div id="bg">
                        <h1 id="headline">Kino Mannheim</h1>
                        <p>beste Unterhaltung in Mannheim</p>
                    </div>
                    <div id="searchbar">
                        <form id="searchbarForm" >
                             <input id="searchbarField" value={searchTerm} onChange={(e) => handleFormChange(e)} placeholder="Suchen"/>
                        </form>
                    </div>
                </Col>
            </Row>
            {!showSearch &&
            <Row>
            {data.movies.map((movie, index) => {
                return(<Movie key={movie.id} data={movie}/>)
            })}
            </Row>
            }
            {showSearch &&
            <Row>
            {searchResults.map((movie, index) => {
                return(<Movie key={movie.id} data={movie}/>)
            })}
        </Row>
            }
        </Container>
    ) : null;
    
    
    return(
        <div>
            {LoadingMarkup}
            {DataMarkup}
        </div>
    )
}


