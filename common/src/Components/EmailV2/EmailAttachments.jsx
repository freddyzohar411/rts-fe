import React, { useState } from "react";
import { Button, DropdownItem } from "reactstrap";
import ActionDropDown from "@workspace/common/src/Components/DynamicTable/Components/ActionDropDown";

const EmailAttachments = ({ attachments, setAttachments, num = 3 }) => {
  const [showMore, setShowMore] = useState(false);
  const downloadAttachment = (attachment) => {
    // Assuming attachment.file is a Blob or File object
    const url = window.URL.createObjectURL(attachment);
    const a = document.createElement("a");
    a.href = url;
    a.download = attachment.name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  function truncateFilenameMiddle(filename, totalLength) {
    // If the total filename length is within the specified limit, return it as is
    if (filename.length <= totalLength) {
      return filename;
    }

    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
      // No extension found, handle as normal string
      return filename.slice(0, totalLength - 3) + "...";
    }

    const extension = filename.substring(lastDotIndex); // Get the extension including the dot
    const endLength = 2 + extension.length; // Calculate the length of the end part (2 chars + extension)

    if (totalLength <= endLength + 1) {
      // If the total length isn't enough to show any start characters meaningfully
      return "..." + filename.slice(-endLength);
    }

    const startLength = totalLength - endLength - 3; // Calculate the length of the start part, leave room for ellipsis

    if (startLength < 1) {
      // Not enough space to show any start characters effectively
      return "..." + filename.slice(-endLength);
    }

    // Return the string with start part, ellipsis, and end part
    return filename.slice(0, startLength) + "..." + filename.slice(-endLength);
  }

  const generateAttachmentDropdownItems = (attachments, num) => {
    if (attachments.length > num) {
      const arrDropDown = attachments.slice(num);
      return arrDropDown.map((attachment, i) => {
        return (
          <DropdownItem
            key={i}
            className="d-flex gap-2 align-items-center justify-content-between"
            onClick={() => downloadAttachment(attachment)}
          >
            <span>
              {`${i + 1} - `}
              {`${truncateFilenameMiddle(attachment.name, 18)}`}
            </span>
            <span
              className="text-danger cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setAttachments(
                  attachments.filter((item, index) => index !== i + num)
                );
              }}
            >
              <i className="ri-close-fill fs-5"></i>
            </span>
          </DropdownItem>
        );
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 flex-grow-1 flex-wrap">
        {attachments.length > 0 &&
          attachments.map((attachment, i) => {
            if (i < num) {
              return (
                <Button
                  color="light"
                  className="btn-white bg-gradient border-2 border-light-grey d-flex gap-2 align-items-center"
                  style={{
                    padding: "2px 5px",
                    borderRadius: "10px",
                    width: "170px",
                  }}
                >
                  <div
                    className="d-flex gap-1 align-items-center cursor-pointer flex-grow-1"
                    onClick={() => downloadAttachment(attachment)}
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    <i className="ri-attachment-line"></i>
                    <span className="cursor-pointer">
                      <strong>
                        {`${truncateFilenameMiddle(attachment.name, 16)}`}
                      </strong>
                    </span>
                  </div>
                  <span
                    className="text-danger cursor-pointer"
                    onClick={() => {
                      setAttachments(
                        attachments.filter((item, index) => index !== i)
                      );
                    }}
                  >
                    <i className="ri-close-fill fs-5"></i>
                  </span>
                </Button>
              );
            }
          })}
      </div>
      <div>
        {attachments.length > num && (
          <ActionDropDown
            width="200px"
            dropDownIcon={
              <div
                className="btn btn-white bg-gradient border-2 border-light-grey d-flex align-items-center gap-1"
                style={{
                  padding: "5px 8px",
                  borderRadius: "10px",
                }}
              >
                <i className="ri-attachment-line"></i>
                <span
                  className="cursor-pointer"
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  <strong>+ {attachments.length - num}</strong>
                </span>
              </div>
            }
            portal={false}
          >
            {generateAttachmentDropdownItems(attachments, num)}
          </ActionDropDown>
        )}
      </div>
    </>
  );
};

export default EmailAttachments;
