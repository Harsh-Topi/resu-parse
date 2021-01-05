import React from 'react';
import { FiPaperclip } from 'react-icons/fi';
import { NavBarButtons } from './styles';

type FileUploadState = {
  data: String;
};

export class FileUpload extends React.Component<{}, FileUploadState> {
  constructor({}) {
    super({});
    this.state = {
      data: '',
    };
  }

  baseConvert(targetFile: File) {
    var reader = new FileReader();
    reader.readAsDataURL(targetFile);
    reader.onload = () => {
      const pdfDataString = reader.result as string;
      console.log(pdfDataString.split(',')[1]);
      this.setState({ data: pdfDataString.split(',')[1] });
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
