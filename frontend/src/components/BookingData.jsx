import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookingDataStyles from "../styles/BookingDataStyles.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import coverImage from "../WoWcover.jpg";
import { Navigate } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import useFetch from 'react-fetch-hook';
import Spinner from 'react-bootstrap/esm/Spinner';

const data = {
    numberoftickets: "2",
    ticketermäßigt: "1",
    ticketerwachsen: "1",
    picture: "",
    bookeddate: "10.10.2022",
    bookedtime: "17:30",
    filmlength: "130",
    genre: "Action",
    fsk: "12",
    bookedroom: "5",
    bookedrow: ["6","6"],
    bookedseats: ["3", "4"],
    price: "22",
    title: "titel"
}
const bookedseats = data.bookedseats;
const seatsList = bookedseats.map((seats, index) =>
<p id='Sitze'>Reihe: {data.bookedrow[index]} Sitz: {seats}</p>
);

export default
function BookingData() {
  const { isLoading, data } = useFetch("http://anton.b5r4773jcchdcbhm.myfritz.net:3001/booking-details");

  const LoadingMarkup = isLoading ? (
    <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>) : null;
        
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log(event.data)

    setValidated(true);
  };

  const DataMarkup = !isLoading ? (

    <Container>
      <Row>
        <Col>
          <h1 id="header">Kundendaten</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4} id="ColumnBackground">
          <div id="div">
            <br />
            <h2 id="bookingheader">Buchungsübersicht:</h2> <br />
            <p>{data.numberoftickets}x Tickets für "{data.title}"</p>
            <p id="tickets">{data.ticketermäßigt}x Ermäßigt für 10€</p>
            <p id="tickets">{data.ticketerwachsen}x Erwachsene für 12€</p>
            <img id="coverImage" alt="Movie Cover Image" src={coverImage} />
            <p id="tickets">{data.bookeddate}, {data.bookedtime} Uhr</p> <br />
            <p id="info">
              Filmlänge: {data.filmlength} Minuten<br />
              Genre: {data.genre} <br />
              FSK: {data.fsk} <br />
              Kino {data.bookedroom}</p>
              <div><p id='Sitze'>Deine Sitze:</p>{seatsList}</div>
            <p id="price">
             Gesamtpreis: {data.price}€ <br />
            </p>{" "}
            <br />
          </div>
        </Col>
        <Col md={8} id="ColumnBackground">
          <div id="div">
            <br />
            <h2 id="ComponentHeaderLeft">
              Bitte füllen Sie alle folgenden Felder aus:
            </h2>
            <br />
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {["radio"].map((type) => (
                <div id="radiobutton"  className="mb-3">
                  <Form.Check inline label="Frau" name="group1" type={type} checked={true}/>
                  <Form.Check inline label="Mann" name="group1" type={type} />
                </div>
              ))}
              <Form.Group id="felder" className="mb-3" controlId="vorname">
                <Form.Label id="labelname">Vorname*</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Bitte geben Sie Ihren Vornamen ein!
                </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>
              <Form.Group id="felder" className="mb-3" controlId="nachname">
                <Form.Label id="labelname">Nachname*</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                Bitte geben Sie Ihren Nachnamen ein!
                </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>
              <Form.Group id="felder" className="mb-3" controlId="straße">
                <Form.Label id="labelname">Straße, Hausnummer</Form.Label>
                <Form.Control type="straße"/>
              </Form.Group>
              <Form.Group id="felder" className="mb-3" controlId="wohnort">
                <Form.Label id="labelname">Wohnort, PLZ</Form.Label>
                <Form.Control type="wohnort"/>
              </Form.Group>
              <Form.Group
                id="feldgeburtsdatum"
                className="mb-3"
                controlId="geburtsdatum"
              >
                <Form.Label id="labelname">Geburtsdatum*</Form.Label>
                <InputGroup hasValidation>
                <Form.Control
                  type="date"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                Bitte Auswählen!
                </Form.Control.Feedback>
              </InputGroup>
              </Form.Group>

            <Form.Group hasValidation id="felder" className="mb-3" controlId="email">
            <Form.Label id="labelname2">E-Mail*</Form.Label>
            <InputGroup hasValidation>
            <Form.Control
              type="email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Bitte geben Sie Ihre E-Mail-Adresse ein!
            </Form.Control.Feedback>
            </InputGroup>
            </Form.Group>
              
              <div id="btndiv">
                <form action="http://anton.b5r4773jcchdcbhm.myfritz.net:3001/create-checkout-session" method="POST">
                            <Button id="buttonCont" type="submit">
                                Checkout
                            </Button>
                        </form>
              </div>
            </Form>
            <br />
            <br />
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1></h1>
          <br />
        </Col>
      </Row>
    </Container>

  ): null;

  return (
  <div>
    {LoadingMarkup}
    {DataMarkup}
  </div>
    
  )
}

