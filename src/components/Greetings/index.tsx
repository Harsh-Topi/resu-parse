import React from 'react'

import { Nav, Navbar, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import {Container, GridContainer, PreviewContainer, PreviousResContainer, ParseContainer, NavBarButtons, PreviewButton, BigPreviewButton} from './styles'

import { IconContext } from "react-icons";
import { AiFillSetting, AiOutlinePaperClip, AiFillProfile } from "react-icons/ai";
import { FiSettings, FiPaperclip, FiMenu, FiFileText } from "react-icons/fi";


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
        <ParseContainer> 
        <Navbar className={'py-3'} style={{boxShadow:"0 6px 4px -4px "}}>
          <Navbar.Brand href="#home">
          <IconContext.Provider value={{ color: "black", size:"2.0em"}}>
            <PreviewButton style={{marginLeft: "10px"}}>
              <FiMenu />
            </PreviewButton>
          </IconContext.Provider>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
              <IconContext.Provider value={{ color: "black", size:"2.3em"}}>
                <BigPreviewButton>
                  <FiFileText />
                </BigPreviewButton> 
                <NavBarButtons>
                  <FiPaperclip />
                </NavBarButtons>
                <NavBarButtons style={{marginRight: "20px"}}>
                  <FiSettings />
                </NavBarButtons>
              </IconContext.Provider>
          </Navbar.Collapse>
        </Navbar>
        </ParseContainer>
        <PreviewContainer />
      </GridContainer>
    </Container>
    
  )
}

export default Greetings
