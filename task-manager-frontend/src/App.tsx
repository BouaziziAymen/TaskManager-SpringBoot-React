import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import MyDocument from "./Pdf";

const App = () => {
  return (
    <div style={{ height: "100vh" }}>
      {/* PDFViewer to render the PDF document */}
      <PDFViewer width="100%" height="100%">
        <MyDocument />
      </PDFViewer>
    </div>
  );
};

export default App;
