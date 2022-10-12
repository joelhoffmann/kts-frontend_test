import React from 'react'
import { useState, useEffect, useMemo } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'

import { useNavigate } from "react-router-dom";
import SeatSelectionStyle from '../styles/SeatSelectionStyle.css';

import paypallogo from "../assets/PayPal-Logo.png"
import Visalogo from "../assets/Visa-Logo.png"

import useFetch from 'react-fetch-hook'

import { useLocation } from 'react-router-dom'

export default function SeatSelection() {
    const navigate = useNavigate()
    const [numberSelectedSeats, setNumberSelectedSeats] = useState(0);
    const [numberSeatsAdult, setNumberSeatsAdult] = useState(0);
    const [numberSeatsReduced, setNumberSeatsReduced] = useState(0);
    const [numberSeatsChild, setNumberSeatsChild] = useState(0);
    const [numberTotalTickets, setNumberTotalTickets] = useState(0);
    const [totalTicketsPrice, setTotalTicketsPrice] = useState(0);
    const [showTicketAlert, setShowTicketAlert] = useState(false);

    const location = useLocation()
    console.log(location.state)
   
    const [isLoading, setIsLoading] = useState(true);
    const [seatData, setSeatData] = useState();
    const [movieData, setMovieData] = useState()
    const fetchdata = useMemo(async () => {
        const rawResponse = await fetch('http://anton.b5r4773jcchdcbhm.myfritz.net:3001/movie-seats-selection', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(location.state)
        });
        const Fdata = await rawResponse.json();
        setSeatData(Fdata.seats)
        setMovieData(Fdata)
        setIsLoading(false)
      }, []);
      
      console.log(seatData)
    
    //*Mockdata
    const getMockData = () => {
        var i = 0;
        var j = 0;
        var rows = [];
        var row = []
        while (i < 8){
            j = 0
            row = []
            while (j < 8) {
                const seat = [i, 0]
                row.push(seat)
                j = j + 1;
            }
            rows.push(row)
            i = i +1;
        }
        return rows
    }

    const fetchedData = {
        "movie_title": "Spider Man - Far from Home",
        "movie_date": "20.09.2022",
        "movie_time": "20:00",
        "price_adult": 12,
        "price_child": 8,
        "price_reduced": 10
    }
    
    //const [seatData, setSeatData] = useState(Mdata)
   
    const handleSeatSelected = (row, seat) => {
        var seatDataCopy = seatData;
        console.log(seatData)
        if (seatDataCopy[row][seat][1] == 0) {
            const seatsAdult = numberSeatsAdult;
            setNumberSeatsAdult(seatsAdult + 1)
            setNumberTotalTickets(numberTotalTickets + 1)
            setTotalTicketsPrice(totalTicketsPrice + movieData.price_adult)
            var seatDataCopy = seatData;
            seatDataCopy[row][seat][1] = 2
            setSeatData(seatDataCopy)
            setNumberSelectedSeats(numberSelectedSeats + 1)
        } else {
            console.log("deselecting button")
            seatDataCopy[row][seat][1] = 0
            setSeatData(seatDataCopy)
            console.log(seatData)
            setNumberSelectedSeats(numberSelectedSeats - 1)
        }
    }

    const handleNumberTickets = (ticketType, sign) => {
        if(sign == "+") {
            switch(ticketType) {
                case "Adult":
                    setNumberSeatsAdult(numberSeatsAdult + 1)
                    setTotalTicketsPrice(totalTicketsPrice + movieData.price_adult)
                    break
                case "Child":
                    setNumberSeatsChild(numberSeatsChild + 1)
                    setTotalTicketsPrice(totalTicketsPrice + movieData.price_child)
                    break
                case "Reduced":
                    setNumberSeatsReduced(numberSeatsReduced + 1)
                    setTotalTicketsPrice(totalTicketsPrice + movieData.price_reduced)
                    break
            }
            setNumberTotalTickets(numberTotalTickets + 1)
        } else if(sign == "-") {
            switch(ticketType) {
                case "Adult":
                    setNumberSeatsAdult(numberSeatsAdult - 1)
                    setTotalTicketsPrice(totalTicketsPrice - movieData.price_adult)
                    break
                case "Child":
                    setNumberSeatsChild(numberSeatsChild - 1)
                    setTotalTicketsPrice(totalTicketsPrice - movieData.price_child)
                    break
                case "Reduced":
                    setNumberSeatsReduced(numberSeatsReduced - 1)
                    setTotalTicketsPrice(totalTicketsPrice - movieData.price_reduced)
                    break
            }
            setNumberTotalTickets(numberTotalTickets - 1)
        }    
    } 

    function handleCont() {
        if (numberSelectedSeats == numberTotalTickets && numberSelectedSeats > 0){
            /*
            const fetchdata = async () => {
                
                const rawResponse = await fetch('http://anton.b5r4773jcchdcbhm.myfritz.net:3001/add-movie-seats-reservation', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({show_id: movieData.show_id, seats: seatData})
                });
                const Fdata = await rawResponse.json();
                if (Fdata.status = "done") {
                    navigate("/checkout")
                } else {
                    console.log("error")
                }
              };
            fetchdata()
            */
           navigate("/checkout")
        } else {
            setShowTicketAlert(true)
        }
    }

    //const isLoading = false
    const LoadingMarkup = isLoading ? (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>) : null;

    const DataMarkup = !isLoading ? (
        <Container>
            <Row id="RowId">
            <Alert show={showTicketAlert} variant="danger" onClose={() => setShowTicketAlert(false)} dismissible>Bitte überprüfe, dass du genauso viele Sitzplätze wie Tickets ausgewählt hast!</Alert>
                <Col>
                    <div>
                        <div id="seatselection">
                            <p id="seatheadline">Leinwand - Kino 5</p>
                            {seatData.map((rowList, index) => {
                                return(
                                    <div key={index} id="row">
                                        {rowList.map((seat, index) => { // seat = [row, stateOfSeat]                           
                                            return (
                                                <Button onClick={() => handleSeatSelected(seat[0], index)} id={`seat${seat[1]}`}>{}</Button>  
                                            )
                                        })}
                                    </div>
                                )    
                            })}
                        </div>
                        <div id="legend">
                            <div id="legendinner">
                                <Button id="seat2"></Button>
                                <p>Deine Plätze</p>
                            </div>
                            
                            <div id="legendinner">
                                <Button id="seat1"></Button>
                                <p>Belegt</p>
                            </div>
                            
                            <div id="legendinner">
                                <Button id="seat0"></Button>
                                <p>Frei</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col>
                    <div id="ticketnumberCol">
                    <h3>{movieData.movie_title}</h3>
                    <p>{movieData.movie_date} - {movieData.movie_time}</p>
                    <div>
                        <div id="ticketdivrow">
                            <p>Kinder 0-12:</p>
                            <p>{movieData.price_child}€/ Ticket</p>
                            <div id="ticketnumberbuttondiv">
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Child", "-")}>-</Button>
                                <p>{numberSeatsChild}</p>
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Child", "+")}>+</Button>
                            </div>
                        </div>
                        <div id="ticketdivrow">
                            <p>Ermäßigt*:</p>
                            <p>{movieData.price_reduced}€/ Ticket</p>
                            <div id="ticketnumberbuttondiv">
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Reduced", "-")}>-</Button>
                                <p>{numberSeatsReduced}</p>
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Reduced", "+")}>+</Button>
                            </div>
                        </div>
                        <div id="ticketdivrow">
                            <p>Erwachsene:</p>
                            <p>{movieData.price_adult}€/ Ticket</p>
                            <div id="ticketnumberbuttondiv">
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Adult", "-")}>-</Button>
                                <p>{numberSeatsAdult}</p>
                                <Button id="ticketnumberbtn" onClick={() => handleNumberTickets("Adult", "+")}>+</Button>
                            </div>
                        </div>
                    </div>
                    <div id="overview">
                        <p>{numberTotalTickets} Tickets</p>
                        <p>{totalTicketsPrice}€</p>
                    </div>
                    <p id="paymentheader">Bezahlmöglichkeiten:</p>
                    <div id="paymentoptions">
                        <img id="paymentlogopp" src={paypallogo} />
                        <img id="paymentlogovisa" src={Visalogo} />
                    </div>
                    <div id="btndiv">
                        <Button onClick={() => handleCont()} variant="danger" id="buttonCont">Weiter</Button>
                    </div>
                    </div>
                </Col>
            </Row>
            <p>*Gilt nur für Schüler, Studenten, Auszubildende und Senioren - Nachweis erforderlich</p>
        </Container>
    ) : null;

    
    return(
        <div>
            {LoadingMarkup}
            {DataMarkup}
        </div>
    )
}

