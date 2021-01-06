import React from 'react';

import { Navbar, Table } from 'react-bootstrap';
import {
  Container,
  GridContainer,
  PreviewContainer,
  PreviousResContainer,
  ParseContainer,
  NavBarButtons,
  PreviewButton,
  BigPreviewButton,
} from './styles';

import { IconContext } from 'react-icons';
import { FiSettings, FiPaperclip, FiMenu, FiFileText } from 'react-icons/fi';

import { FileUpload } from './fileupload';

const infoList = [
  'Name',
  'Skills',
  'School',
  'Phone',
  'Email',
  'Links',
];


// TO-DO add work experience to this as well
type dataState = {
  jsonData?: string,
  name?: string,
  email?: string,
  phone?: string,
  school?: string,
  degree?: string,
  links?: string,
  summary?: string,
  skills?: string,
  dataArr?: string[]

};

export class Greetings extends React.Component<{}, dataState> {
  constructor({}) {
    super({});
    this.state = {
      jsonData: '',
      dataArr : []
    };
  }

  setDataAfterUpload(response: any) {
    // TO DO - positions section
    // loop through array json data and gather data
    var names = ""
    var emails = ""
    var links = ""
    var phones = ""
    var schools = ""
    var skills = ""

    for (var i = 0; i < response.data.names.length; i++) {
      names += response.data.names[i]
    }

    for (var i = 0; i < response.data.emails.length; i++) {
      emails += response.data.emails[i].value
      emails += ", "
      if (i == response.data.emails.length - 1) {
        emails = emails.substring(0, emails.length - 2)
      }
    }

    for (var i = 0; i < response.data.links.length; i++) {
      links += response.data.links[i].url
      links += ", "
      if (i == response.data.links.length - 1) {
        links = links.substring(0, links.length - 2)
      }
    }

    for (var i = 0; i < response.data.phones.length; i++) {
      phones += response.data.phones[i].value
      phones += ", "
      if (i == response.data.phones.length - 1) {
        phones = phones.substring(0, phones.length - 2)
      }
    }

    for (var i = 0; i < response.data.schools.length; i++) {
      schools += response.data.schools[i].summary
      schools += ", "
      if (i == response.data.schools.length - 1) {
        schools = schools.substring(0, schools.length - 2)
      }
    }

    var temp4Map = [""]
    temp4Map[0] = names
    temp4Map[1] = response.data.summary.skills
    temp4Map[2] = schools
    temp4Map[3] = phones
    temp4Map[4] = emails
    temp4Map[5] = links

    this.setState({
      jsonData: response.data,
      name: names,
      email: emails,
      links: links,
      phone: phones,
      school: schools,
      skills: response.data.summary.skills,
      summary: response.data.summary.experience,
      dataArr: temp4Map
    })
  }

  render() {
    return (
      <Container>
        <GridContainer>
          <PreviousResContainer />
          <ParseContainer>
            <Navbar className={'py-3'} style={{ boxShadow: '0 6px 4px -4px' }}>
              <Navbar.Brand href="#home">
                <IconContext.Provider value={{ color: 'black', size: '2.0em' }}>
                  <PreviewButton style={{ marginLeft: '10px' }}>
                    <FiMenu />
                  </PreviewButton>
                </IconContext.Provider>
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <IconContext.Provider value={{ color: 'black', size: '2.3em' }}>
                  <BigPreviewButton>
                    <FiFileText />
                  </BigPreviewButton>
                  <FileUpload onFileUpload={this.setDataAfterUpload.bind(this)} />
                  <NavBarButtons style={{ marginRight: '20px' }}>
                    <FiSettings />
                  </NavBarButtons>
                </IconContext.Provider>
              </Navbar.Collapse>
            </Navbar>

            <h2 style={{ color: 'black' }} className={'p-3'}>
              Summary
            </h2>
            <Table bordered hover className={'p-5'}>
              <tbody>
                <tr>
                  <td>
                    {this.state.summary}
                  </td>
                </tr>
              </tbody>
            </Table>

            <h2 style={{ color: 'black' }} className={'p-3'}>
              Information
            </h2>
            <Table bordered hover className={'p-5'}>
              <tbody>
                {infoList.map((infoList, i) => (
                  <tr>
                    <td>{infoList}</td>
                    <td>{this.state.dataArr![i]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h2 style={{ color: 'black' }} className={'p-3'}>
              Work Experience
            </h2>
            <Table bordered hover className={'p-5'}>
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Position</th>
                  <th>Time Period</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Intern.House</td>
                  <td>Software Engineer</td>
                  <td>1/2020 - 7/2020</td>
                  <td>
                    ◦ Developed a platform for interns to search through job and
                    housing listings while networking with others ◦ Used Node.js
                    and PostgreSQL to implement REST API's which allowed users
                    to login, register, view and update their profiles and
                    settings ◦ Utilized AWS Lambda and BeautifulSoup to scrape
                    2000+ jobs and housing listings from AirBnB, Zillow, and
                    Indeed ◦ Conducted Agile stand-up meetings with a team of 6
                    remote engineers to identify limit blockers, maintain sprint
                    velocity, and improve overall software quality through
                    standard Scrum methodologies ◦ Leveraged Knowledge in
                    Node.js, Next.js, React, Python, SQL
                  </td>
                </tr>
                <tr>
                  <td>David Suzuki Robotics</td>
                  <td>Team Lead and Programmer</td>
                  <td>9/2017 - 1/2020</td>
                  <td>
                    ◦ Administered a group of 35 students to successfully build
                    2 competition-standard robots through multiple seasons ◦
                    Brought in $5,000 in sponsorship funding to heighten the
                    financial budget of the team, which significantly improved
                    the durability of our robots resulting in 2 championship
                    wins ◦ Taught 20 students how to program control systems
                    using Python which allowed for quick adjustments to be made
                    by anyone on the team which decreased turnaround times by
                    35% ◦ Uploaded 11 video tutorials which covered fundamental
                    design and technical concepts to ensure team members had an
                    understanding of essential skills required to build a
                    competitive robot
                  </td>
                </tr>
              </tbody>
            </Table>
          </ParseContainer>
          <PreviewContainer />
        </GridContainer>
      </Container>
    );
  }
}

export default Greetings;
