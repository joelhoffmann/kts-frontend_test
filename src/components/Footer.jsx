import React from "react";
import { Link } from 'react-router-dom'
import FooterStyles from "../styles/FooterStyles.css";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import cinemaLogo from "../cinema logo.png";

const Footer = () => {
return (
	<Box>
	<Container>
		<Row>
		<Column>
			<FooterLink href="#">Filmprogramm</FooterLink>
			<FooterLink href="#">Events</FooterLink>
			<FooterLink href="#">Über uns</FooterLink>
		</Column>
		<Column>
			<FooterLink href="#">Zahlungsmöglichkeiten</FooterLink>
			<FooterLink href="#">Impressum</FooterLink>
			<FooterLink href="#">Öffnungszeiten</FooterLink>
		</Column>
		</Row>
	</Container>
	<Link id="cinemaLogof" to={"/"}>
            <img id="cinemaLogof" alt="Movie Cover" src={cinemaLogo} /></Link>
	</Box>
);
};
export default Footer;
