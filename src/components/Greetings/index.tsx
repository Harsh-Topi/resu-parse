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

import { PdfPreview } from './pdfpreview'

const infoList = [
  'Name',
  'Skills',
  'School(s)',
  'Phone(s)',
  'Email(s)',
  'Link(s)',
];

// TO-DO add work experience to this as well
type dataState = {
  jsonData?: string;
  name?: string;
  email?: string;
  phone?: string;
  school?: string;
  degree?: string;
  links?: string;
  summary?: string;
  skills?: string;
  dataArr?: string[];
  positionBuffer?: any;
};

export class Greetings extends React.Component<{}, dataState> {
  constructor({}) {
    super({});
    this.state = {
      jsonData: '',
      dataArr: [],
    };
  }

  processPositions(positionArr: any) {
    var posBuffer = [];

    for (var i = 0; i < positionArr.length; i++) {
      posBuffer.push(
        <tr>
          <td>{positionArr[i].org}</td>
          <td>{positionArr[i].title}</td>
          <td>
            {positionArr[i].start.month +
              '/' +
              positionArr[i].start.year +
              ' to ' +
              positionArr[i].end.month +
              '/' +
              positionArr[i].end.year}
          </td>
            <td>{positionArr[i].summary}</td>
        </tr>
      );
    }

    this.setState({
      positionBuffer: posBuffer
    })
  }

  setDataAfterUpload(response: any) {
    // TO DO - positions section
    // loop through array json data and gather data
    var names = '';
    var emails = '';
    var links = '';
    var phones = '';
    var schools = '';

    for (var i = 0; i < response.data.names.length; i++) {
      names += response.data.names[i];
    }

    for (var i = 0; i < response.data.emails.length; i++) {
      emails += response.data.emails[i].value;
      emails += ', ';
      if (i == response.data.emails.length - 1) {
        emails = emails.substring(0, emails.length - 2);
      }
    }

    for (var i = 0; i < response.data.links.length; i++) {
      links += response.data.links[i].url;
      links += ', ';
      if (i == response.data.links.length - 1) {
        links = links.substring(0, links.length - 2);
      }
    }

    for (var i = 0; i < response.data.phones.length; i++) {
      phones += response.data.phones[i].value;
      phones += ', ';
      if (i == response.data.phones.length - 1) {
        phones = phones.substring(0, phones.length - 2);
      }
    }

    for (var i = 0; i < response.data.schools.length; i++) {
      schools +=
        '(' +
        response.data.schools[i].org +
        ', ' +
        response.data.schools[i].degree +
        ', studying ' +
        response.data.schools[i].field +
        ', from  ' +
        response.data.schools[i].start.month +
        '/' +
        response.data.schools[i].start.year +
        ' to ' +
        response.data.schools[i].end.month +
        '/' +
        response.data.schools[i].end.year +
        ')';
    }

    this.processPositions(response.data.positions)

    var temp4Map = [''];
    temp4Map[0] = names;
    temp4Map[1] = response.data.summary.skills;
    temp4Map[2] = schools;
    temp4Map[3] = phones;
    temp4Map[4] = emails;
    temp4Map[5] = links;

    this.setState({
      jsonData: response.data,
      name: names,
      email: emails,
      links: links,
      phone: phones,
      school: schools,
      skills: response.data.summary.skills,
      summary: response.data.summary.experience,
      dataArr: temp4Map,
    });
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
                  <FileUpload
                    onFileUpload={this.setDataAfterUpload.bind(this)}
                  />
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
                  <td>{this.state.summary}</td>
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
                {this.state.positionBuffer}
              </tbody>
            </Table>
          </ParseContainer>
          <PreviewContainer>
            <PdfPreview/>
          </PreviewContainer>
        </GridContainer>
      </Container>
    );
  }
}

export default Greetings;
