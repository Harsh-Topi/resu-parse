import React from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { NavBarButtons } from './styles';

const axios = require('axios');

type FileUploadState = {
  data?: string;
  jsonData?: string;
};

type FileUploadProps = {
  onFileUpload: (response: any) => void;
};

export class FileUpload extends React.Component<
  FileUploadProps,
  FileUploadState
> {
  constructor(props: FileUploadProps) {
    super(props);
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
            body: {
              content: pdfDataString,
            },
          }
        )
        .then(
          (response: any) => {
            //console.log(response.data);

            this.props.onFileUpload(response);
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
      <>
        <label htmlFor="file-upload" className={'pt-3'} style={{ cursor: 'pointer', display: 'inline-block', padding: '6px 6px 6px 6px' }}>
          <FiPaperclip />
        </label>
        <input
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          accept=".pdf"
          onChange={(event: any) => this.baseConvert(event.target.files[0])}
        />
      </>
    );
  }
}
