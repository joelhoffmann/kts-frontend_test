import React from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import AdminStyle from '../styles/AdminStyle.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'



//admin login function
export default function Admin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log(username, password);
        if (username === "admin" && password === "admin") {
            setLogin(true);
        }
    }

    return (
      <div>
        <h1>Admin Login</h1>
      
        
    
                  <Form onSubmit={handleLogin}>
                      <Form.Group controlId="formBasicEmail">
                          <Form.Label>Benutzername</Form.Label>
                          <Form.Control type="text" placeholder="Benutzername eingeben" onChange={(e) => setUsername(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="formBasicPassword">
                          <Form.Label>Passwort</Form.Label>
                          <Form.Control type="password" placeholder="Passwort" onChange={(e) => setPassword(e.target.value)} />
                      </Form.Group>
                      <Button title="Anmelden" 
                        //onPress={() => Navigation.navigate('AdminManagement')}
                      />
                  </Form>
              </div>
            
      
    )
}