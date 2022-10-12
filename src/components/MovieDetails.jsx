import React from 'react'

import coverImage from '../WoWcover.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Spinner from 'react-bootstrap/Spinner'

import Icon from '@mdi/react'
import { mdiClockOutline, mdiInformationOutline, mdiVideoVintage } from '@mdi/js';

import MovieStyles from '../styles/MovieStyles.css'
import MovideDetailsStyles from '../styles/MovieDetailsStyles.css'

import { Link, useParams } from "react-router-dom";

import useFetch from 'react-fetch-hook'

export default function MovieDetails() {
    console.log(useParams());
    const movie_id = useParams().moviename
    const { isLoading, data } = useFetch("http://anton.b5r4773jcchdcbhm.myfritz.net:3001/movie-details", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({id: movie_id})// id immer als String schicken!
    });
    console.log(data)


    const Mdata = {
        movie_id: 163541354146541,
        title: "Spider-man: Far From Home",
        image_url: "",
        runtime: 130,
        fsk: 16,
        genre: "Komödie",
        trailer_url: "",
        cast: "Mit Leonardo DiCaprio, Jonah Hill, Marget Robbie, Matthew McConaughey",
        description: "Der aufstrebende Aktienhändler Jordan Belfort (Leonardo DiCaprio) gründet mit Anfang 20 die Maklerfirma Stratton Oakmont, mit der er schnell zum Multimillionär aufsteigt und zum Shootingstar der New Yorker Börse wird. Schon bald ist er hauptsächlich unter seinem neuen Spitznamen Wolf of Wall Street bekannt..",
        timeslots: [
            ["25.09.2022", ["16:30", "18:30", "20:30", "22:30"], [40, 80, 55, 35]],
            ["26.09.2022", ["16:30", "18:30", "20:30"], [68, 45, 41]],
            ["27.09.2022", ["16:30", "18:30"], [60, 10]],
            ["28.09.2022", ["16:30", "18:30", "20:30", "22:30", "23:00", "23:00", "23:00", "23:00"], [63, 41, 34, 14, 63, 63, 63, 63]],
            ["29.09.2022", ["16:30", "18:30", "20:30"], [32, 13, 54]]
        ]
    }

    function DateToString(dateList) {
        // implement functionality here to convert current date to "Heute", "Morgen" etc.
        return dateList
    }
    const timeslots = Mdata.timeslots;
    const newTo = {
        pathname: "/seatselection"
    }

    const LoadingMarkup = isLoading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>) : null;

    const DataMarkup = !isLoading ? (
        <Container fluid id="backgroundCard">
            <Row >
                <Col md={4} id="carouselCol">
                    <img id="coverimage" alt="Movie Cover" src={coverImage}/>
                    <div id="innercarouseldiv">
                        <Carousel slide={false} indicators={false} interval={null}>
                            {data.timeslots.map((day, index) => {
                                return(
                                    <Carousel.Item id="carouselItem">
                                        <p>{day[0]}</p>
                                        <div id="buttongroupDetail">
                                            {day[1].map((time, index) => {
                                                return(
                                                    <div id="showTimeAndCapacityDiv">
                                                        <Link id="link" to={newTo} state={{movie_id: movie_id, time: time, date: day[0]}}>
                                                            <Button id="button">{time}</Button>
                                                        </Link>
                                                        <ProgressBar id="progressbar" variant="danger" now={day[2][index]} label={`${day[2][index]}%`} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                    </div>
                </Col>
                <Col md={8} id="informationCol">
                    <Row>
                        <h1>{data.title}</h1>
                    </Row>
                    <div id="icons">
                        <div id="descriptionblock">
                            <Icon 
                                path={mdiClockOutline}
                                size={1}
                            />
                            <p id="icondescription">{data.runtime} min</p>
                        </div>
                        <div id="descriptionblock">
                            <Icon 
                                path={mdiInformationOutline}
                                size={1}
                            />
                            <p id="icondescription">FSK {data.fsk}</p>
                        </div>
                
                        <div id="descriptionblock">
                            <Icon 
                                path={mdiVideoVintage}
                                size={1}
                            />
                            <p id="icondescription">{data.genre}</p>
                        </div>
                        <div id="descriptionblock">
                            <Icon 
                                path={mdiVideoVintage}
                                size={1}
                            />
                            <p id="icondescription"><a href={data.trailer_url}>Trailer</a></p>
                        </div>
                    </div>
                    <Row></Row>



                <p id="bodytext">{data.cast}</p>
                <p id="bodytext">{data.description}</p>
                </Col>
            </Row>
        </Container>
    ) : null;
    
    return(
        <div>
            {LoadingMarkup}
            {DataMarkup}
        </div>
    )
}