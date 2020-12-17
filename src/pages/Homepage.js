import React from 'react'
import { Container, Jumbotron } from 'reactstrap';

export default function Homepage() {
    return (
      <div>
        <Jumbotron fluid className="bg-info">
          <Container fluid>
            <h1 className="display-3 text-center">e-Reservation App</h1>
            <p className="lead text-center">Use the Navbar to navigate between <strong>Owner</strong>'s and <strong>Customer</strong>'s page</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
  