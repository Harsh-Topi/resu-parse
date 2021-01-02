import React from 'react'
import { Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap'

import {Container, GridContainer, PreviewContainer, PreviousResContainer, ParseContainer} from './styles'

const Greetings: React.FC = () => {
  return (
    // <Navbar>
    //   <Navbar.Brand>Navbar with text</Navbar.Brand>
    //   <Navbar.Toggle />
    //   <Navbar.Collapse className="justify-content-end">
    //     <Navbar.Text>
    //       Signed in as: <a href="#login">Mark Otto</a>
    //     </Navbar.Text>
    //   </Navbar.Collapse>
    // </Navbar>

    <Container>
      <GridContainer>
        <PreviousResContainer />
        <ParseContainer />
        <PreviewContainer />
      </GridContainer>
    </Container>
    
  )
}

export default Greetings
