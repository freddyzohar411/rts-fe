import React from 'react'

const HiddenPDFDownloadElement = ({content, targetRef}) => {
  return (
    <div style={{ opacity: "0" }}>
    <div
      ref={targetRef}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  </div>
  )
}

export default HiddenPDFDownloadElement