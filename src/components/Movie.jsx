import React from "react";

import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

import Icon from '@mdi/react'
import { mdiClockOutline, mdiInformationOutline, mdiMovieOpenOutline } from '@mdi/js';

import MovieStyles from '../styles/MovieStyles.css'

function importAll(r) {
    let images = {};
     r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images
   }

export default function Movie(props) {
    const timeslots = props.data.timeslots;
    const newTo = {
        pathname: `/movie/${props.data._id}`
    }
    const images = importAll(require.context('../assets/thumbnails', false, /\.(png|jpe?g|svg)$/));
    return(
        <div id="card">
            <div id="textBlock">
                <h3>{props.data.title}</h3>
            </div>

            <img id="coverImage" alt="Movie Cover Image" src={images[`${props.data.picture_url}.png`]}/>
            
            <div id="descriptionblocks">
                <div id="descriptionblock">
                    <Icon 
                        path={mdiClockOutline}
                        size={1}
                    />
                    <p id="description">{props.data.runtime} min</p>
                </div>
                <div id="descriptionblock">
                    <Icon 
                        path={mdiInformationOutline}
                        size={1}
                    />
                    <p id="description">FSK {props.data.fsk}</p>
                </div>
                
                <div id="descriptionblock">
                    <Icon 
                        path={mdiMovieOpenOutline}
                        size={1}
                    />
                    <p id="description">{props.data.genre}</p>
                </div>
            </div>
            <div id="buttongroup">
                {timeslots.map((time, index) => {
                    return (
                    <Link to={newTo}>
                        <Button key={index} id="button">{time}</Button>
                    </Link>    
)
                })}
                    <Link id="link" to={newTo}>
                        <Button variant="outline-danger" id="button-more">Mehr</Button>
                    </Link>
            </div>
        </div>
    )
}