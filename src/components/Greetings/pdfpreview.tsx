import { Document } from 'react-pdf/dist/umd/entry.webpack';
import { Page } from 'react-pdf'

import React, { useState } from 'react';

export const PdfPreview = () => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({numPages}:any) {
      setNumPages(numPages);
    }
  
    return (
      <div>
        <Document
          file="Harsh Topiwala - Resume.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }

