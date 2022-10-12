import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import BookingConfirmationStyles from "../styles/BookingConfirmationStyles.css"
import Button from "react-bootstrap/Button";

import ticketPDF from "../ticket.pdf";

import coverImage from "../WoWcover.jpg";

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
}
const bookedseats = data.bookedseats;
const seatsList = bookedseats.map((seats, index) =>
<p id='Sitze'>Reihe: {data.bookedrow[index]} Sitz: {seats}</p>
);

export default function BookingConfirmation(){
    var thankYouTitel = "Vielen Dank für Ihre Buchung"
    var customerMail = "name.nachname@gmail.com"
    return(
    
        <Container>
            <Row>
                <Col lg={4} id="col">
                    <div id="BookingOverviewCard">
                    <br />
                    <p>{data.numberoftickets}x Tickets für "Spiderman - No way home"</p>
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
                <Col lg={8} id="col">
                    <div  id="ThankYouCard">
                        <h2>{thankYouTitel}</h2>
                        <p>Sie erhalten in Kürze eine Bestätigungsmail samt Tickets an:</p>
                        <p>{customerMail}</p>
                        <p>Ihr Ticket können Sie ebenfalls jetzt herunterladen</p>
                        <Button variant="danger"><a href= {ticketPDF} download> Download tickets </a></Button>                       
                    </div>

                </Col>
            </Row>
        </Container>
    )
}