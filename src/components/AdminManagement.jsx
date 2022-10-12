import React from "react";
import { useState } from "react";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Routes, Route, useNavigate} from 'react-router-dom';
import QRPic from '../images/QR.png';




import AdminStyle from '../styles/AdminStyle.css';
import Button from "react-bootstrap/esm/Button";

export default function AdminManagement() {
    
    const navigate = useNavigate();

    const navigateToScanner = () => {
        // 👇️ navigate to /contacts
        navigate('/admin/management/scanner');
      };

      const navigateToAddMovie = () => {
        navigate('/admin/management/addmovie');
        };
    
    const navigateToMitarbeiterrabatt = () => {
        navigate('/admin/management/mitarbeiterrabatt');
        };

        return (
            <div>
                <h1>Admin Management</h1>
                <Row>
                    <Col>
                    <Button img src="../images/QR.png" alt="QR" title="Scanner" onClick={navigateToScanner}>
                    
                    </Button>
                    </Col>
                    <Col>
                        <Button title="AddMovie" onClick={navigateToAddMovie}>
                        Film hinzufügen    
                        </Button>
                    </Col>
                    <Col>
                        <Button title="Mitarbeiterrabatt" onClick={navigateToMitarbeiterrabatt}>
                        Mitarbeiter Rabatt    
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }