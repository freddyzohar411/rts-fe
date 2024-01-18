import React, { useRef } from "react";
import html2pdf from "html2pdf.js";

function Test() {
  const ref = useRef();

  const generatePDF = () => {
    const element = ref.current;
    const opt = {
      margin: 1,
      filename: "myfile.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "mm", format: "A4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const htmlString = `<p>dedede</p><div style="break-after: page;"></div><p>dededed</p>`;

  // how to set dangerouslySetInnerHTML

  return (
    <>
      <div ref={ref} dangerouslySetInnerHTML={{ __html: htmlString }}>
      {/* <div ref={ref}> */}
        {/* <div>
        <h1>Page 1</h1>
        <p>Content for page 1</p>
        <div style={{ pageBreakAfter: 'always' }}></div>
        <h1>Page 2</h1>
        <p>Content for page 2</p>
      </div>
      <div>
        <h1>Page 3</h1>
        <p>Content for page 3</p>
        <div style={{ pageBreakAfter: 'always' }}></div>
        <h1>Page 4</h1>
        <p>Content for page 4</p>
      </div> */}
        {/* <p>dedede</p>
        <div style={{ pageBreakAfter: "always" }}></div>
        <p>dededed</p> */}
      </div>
      <button onClick={generatePDF}>Generate PDF</button>
    </>
  );
}

export default Test;
