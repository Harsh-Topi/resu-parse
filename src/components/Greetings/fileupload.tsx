import React from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { NavBarButtons } from './styles';

const axios = require('axios');

type FileUploadState = {
  data?: string;
  jsonData?: string;
};

export class FileUpload extends React.Component<{}, FileUploadState> {
  constructor({}) {
    super({});
    this.state = {
      data: '',
      jsonData: '',
    };
  }

  baseConvert(targetFile: File) {
    var reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = () => {
      const pdfDataString = (reader.result as string).split(',')[1];
      // call api, get json
      axios
        .post(
          'https://kplymnyqq8.execute-api.ca-central-1.amazonaws.com/default/resume-parse',
          {
            "body": {
              "content": pdfDataString
            }
          }
        )
        .then(
          (response: any) => {
            console.log(response.data);
            this.setState({
              data: pdfDataString.split(',')[1],
              jsonData: response.data['body'],
            });
          },
          (error: any) => {
            console.log(error);
          }
        );

      //   this.setState({ data: pdfDataString.split(',')[1] });
    };
  }

  render() {
    return (
      // <NavBarButtons onClick={() => console.log("test")}>
      //     <FiPaperclip>
      //         <input type="file" onChange={(event:any) => this.baseConvert(event.target.files[0])} />
      //     </FiPaperclip>
      // </NavBarButtons>
      <input
        type="file"
        onChange={(event: any) => this.baseConvert(event.target.files[0])}
      />
    );
  }
}
