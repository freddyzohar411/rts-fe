import React, { useState } from 'react';
import htmlToDocx from 'html-docx-js/dist/html-docx';
import { saveAs } from 'file-saver';

function Test2() {
    const [htmlContent, setHtmlContent] = useState('<p>This is the first paragraph.</p><p>This is the second paragraph.</p><p>This is the third paragraph.</p>');

    const handleContentChange = (e) => {
        setHtmlContent(e.target.value);
    };

    const addPageBreaks = (content) => {
        return content.replace(/<\/p>/g, '</p><div style="page-break-before: always;"></div>');
    };

    const convertToDocx = () => {
        const contentWithPageBreaks = addPageBreaks(htmlContent);
        console.log("contentwithpagebreaks",contentWithPageBreaks);
        const blob = htmlToDocx.asBlob(contentWithPageBreaks);
        saveAs(blob, 'convertedDocument.docx');
    };

    return (
        <div>
            <textarea value={htmlContent} onChange={handleContentChange} rows="10" cols="50" />
            <button onClick={convertToDocx}>Convert to DOCX</button>
        </div>
    );
}

export default Test2;