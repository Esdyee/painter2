import React from 'react';
import logo from './logo.svg';
import { Button, Nav, Navbar } from "react-bootstrap";
// import { useNavigate } from 'react-router-dom';
import './App.css';
import DrawingBoard from "./DrawingBoard";

function App() {

	return (
		<div className="App">
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">
					<img alt="" src={logo} width="30" height="30" className="d-inline-block align-top"/>
					Je's Bootstrap
				</Navbar.Brand>
				<Nav className="mr-auto"
				     style={{ marginLeft: "auto" }}>
					{/*<Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>*/}
					{/*<Nav.Link onClick={() => navigate('/detail')}>Detail</Nav.Link>*/}
				</Nav>
			</Navbar>
			<h1>Simple Shape Drawing App</h1>
			<div style={{ minHeight: "70vh"}}>
				<DrawingBoard />
			</div>

		</div>
	);
}

export default App;
