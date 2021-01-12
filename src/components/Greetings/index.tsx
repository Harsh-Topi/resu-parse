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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  errorMessage(errorType: number) {
    if (errorType == 1) {
      toast('Please upload a PDF file.', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } else {
      toast('Could not parse file. Bad response from server.', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  }

  processPositions(positionArr: any) {
    var posBuffer = [];

    for (var i = 0; i < positionArr.length; i++) {
      var title = positionArr[i].hasOwnProperty('title')
        ? positionArr[i].title
        : '??';
      var org = positionArr[i].hasOwnProperty('org')
        ? positionArr[i].org
        : '??';
      var startMonth = positionArr[i].hasOwnProperty('start')
        ? positionArr[i].start.month
        : '??';
      var startYear = positionArr[i].hasOwnProperty('start')
        ? positionArr[i].start.year
        : '??';
      var endMonth = positionArr[i].hasOwnProperty('end')
        ? positionArr[i].end.month
        : '??';
      var endYear = positionArr[i].hasOwnProperty('end')
        ? positionArr[i].end.year
        : '??';
      var summary = positionArr[i].hasOwnProperty('summary')
        ? positionArr[i].summary
        : '??';

      var endDate = '';

      if (positionArr[i].hasOwnProperty('isCurrent')) {
        endDate = 'Present';
      } else {
        endDate = endMonth + '/' + endYear;
      }

      posBuffer.push(
        <tr>
          <td>{positionArr[i].org}</td>
          <td>{positionArr[i].title}</td>
          <td>
            {positionArr[i].start.month +
              '/' +
              positionArr[i].start.year +
              ' to ' +
              endDate}
          </td>
          <td>{positionArr[i].summary}</td>
        </tr>
      );
    }

    this.setState({
      positionBuffer: posBuffer,
    });
  }

  setDataAfterUpload(response: any) {
    // TO DO - positions section
    // loop through array json data and gather data
    var names = '';
    var emails = '';
    var links = '';
    var phones = '';
    var schools = '';

    // need to check if all of these fields actually exist before looping through arrays

    if (response.data.hasOwnProperty('names')) {
      for (var i = 0; i < response.data.names.length; i++) {
        names += response.data.names[i];
      }
    } else {
      names = '??';
    }

    if (response.data.hasOwnProperty('emails')) {
      for (var i = 0; i < response.data.emails.length; i++) {
        emails += response.data.emails[i].value;
        emails += ', ';
        if (i == response.data.emails.length - 1) {
          emails = emails.substring(0, emails.length - 2);
        }
      }
    } else {
      emails = '??';
    }

    if (response.data.hasOwnProperty('links')) {
      for (var i = 0; i < response.data.links.length; i++) {
        links += response.data.links[i].url;
        links += ', ';
        if (i == response.data.links.length - 1) {
          links = links.substring(0, links.length - 2);
        }
      }
    } else {
      links = '??';
    }

    if (response.data.hasOwnProperty('phones')) {
      for (var i = 0; i < response.data.phones.length; i++) {
        phones += response.data.phones[i].value;
        phones += ', ';
        if (i == response.data.phones.length - 1) {
          phones = phones.substring(0, phones.length - 2);
        }
      }
    } else {
      phones = '??';
    }

    if (response.data.hasOwnProperty('schools')) {
      for (var i = 0; i < response.data.schools.length; i++) {
        var org = response.data.schools[i].hasOwnProperty('org')
          ? response.data.schools[i].org
          : '??';
        var degree = response.data.schools[i].hasOwnProperty('degree')
          ? response.data.schools[i].degree
          : '??';
        var field = response.data.schools[i].hasOwnProperty('field')
          ? response.data.schools[i].field
          : '??';
        var startMonth = response.data.schools[i].hasOwnProperty('start')
          ? response.data.schools[i].start.month
          : '??';
        var startYear = response.data.schools[i].hasOwnProperty('start')
          ? response.data.schools[i].start.year
          : '??';
        var endMonth = response.data.schools[i].hasOwnProperty('end')
          ? response.data.schools[i].end.month
          : '??';
        var endYear = response.data.schools[i].hasOwnProperty('end')
          ? response.data.schools[i].end.year
          : '??';

        schools +=
          '(' +
          org +
          ', ' +
          degree +
          ', studying ' +
          field +
          ', from  ' +
          startMonth +
          '/' +
          startYear +
          ' to ' +
          endMonth +
          '/' +
          endYear +
          ')';
      }
    } else {
      schools = '??';
    }

    if (response.data.hasOwnProperty('positions')) {
      this.processPositions(response.data.positions);
    } else {
      var posBuffer = [];

      posBuffer.push(
        <tr>
          <td>No positions found</td>
        </tr>
      );

      this.setState({
        positionBuffer: posBuffer,
      });
    }

    var temp4Map = [''];
    temp4Map[0] = names;
    temp4Map[1] =
      response.data.hasOwnProperty('summary') &&
      response.data.summary.hasOwnProperty('skills')
        ? response.data.summary.skills
        : '??'; // summary skills
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
      skills: temp4Map[1],
      summary:
        response.data.hasOwnProperty('summary') &&
        response.data.summary.hasOwnProperty('experience')
          ? response.data.summary.experience
          : '??',
      dataArr: temp4Map,
    });
  }

  render() {
    return (
      <Container>
        <ToastContainer position="top-center" limit={3} />
        <GridContainer>
          <ParseContainer>
            <Navbar className={'py-3'} style={{ boxShadow: '0 6px 4px -4px' }}>
              <Navbar.Brand href="#home">
                {/* <IconContext.Provider value={{ color: 'black', size: '2.0em' }}>
                  <PreviewButton style={{ marginLeft: '10px' }}>
                    <FiMenu />
                  </PreviewButton>
                </IconContext.Provider> */}
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <IconContext.Provider value={{ color: 'black', size: '2.3em' }}>
                  <FileUpload
                    onFileUpload={this.setDataAfterUpload.bind(this)}
                    errorMessage={this.errorMessage.bind(this)}
                  />
                  {/* <NavBarButtons style={{ marginRight: '20px' }}>
                    <FiSettings />
                  </NavBarButtons> */}
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
              <tbody>{this.state.positionBuffer}</tbody>
            </Table>
          </ParseContainer>
        </GridContainer>
      </Container>
    );
  }
}

export default Greetings;
