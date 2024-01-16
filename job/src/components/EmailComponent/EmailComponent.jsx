import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { TemplateDisplayV3 } from "@workspace/common";
import { useEffect } from "react";

function EmailComponent({ isOpen, toggle, templateData }) {
  const [modal, setModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emailContent, setEmailContent] = useState("");

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setIsFullscreen(false);
      }, 300);
    };
  }, [isOpen]);

  return (
    <React.Fragment>
      <div>
        <Modal
          isOpen={isOpen}
          toggle={toggle}
          backdrop="false"
          style={{ position: "fixed", bottom: 0, right: 0, minWidth: "50%" }}
          fullscreen={isFullscreen}
        >
          <div className="modal-header py-2 d-flex flex-row justify-content-between align-items-center">
            <span className="modal-title h5">New Message</span>
            <div className="d-flex flex-row gap-2" onClick={toggle}>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <i className="ri-subtract-line fs-4"></i>
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
              >
                <i className="ri-fullscreen-line fs-5"></i>
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle();
                }}
              >
                <i className="ri-close-line fs-4"></i>
              </button>
            </div>
          </div>
          <ModalBody>
            <div>
              <div className="mb-3 input-group text-center position-relative">
                <span
                  className="input-group-text"
                  id="to-input"
                  style={{ width: "50px" }}
                >
                  To
                </span>
                <Input
                  type="text"
                  aria-label="To"
                  aria-describedby="to-input"
                  className="form-control email-compose-input"
                  defaultValue="support@themesbrand.com"
                />
                <div className="position-absolute top-0 end-0">
                  <div className="d-flex">
                    <Input
                      type="select"
                      className="form-select"
                      style={{ width: "200px" }}
                    >
                      <option value="">Select</option>
                      <option value="">Template 1</option>
                      <option value="">Template 2</option>
                    </Input>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-group mb-3 text-center">
                  <span
                    className="input-group-text"
                    id="cc-input"
                    style={{ width: "50px" }}
                  >
                    CC
                  </span>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="CC"
                    aria-label="CC"
                    aria-describedby="cc-input"
                  ></Input>
                </div>
              </div>
              <div>
                <div className="input-group mb-3 text-center">
                  <span
                    className="input-group-text"
                    id="bcc-input"
                    style={{ width: "50px" }}
                  >
                    BCC
                  </span>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="BCC"
                    aria-label="BCC"
                    aria-describedby="bcc-input"
                  ></Input>
                </div>
              </div>

              <div className="mb-3">
                <Input
                  type="text"
                  className="form-control"
                  placeholder="Subject"
                />
              </div>
            </div>
            <TemplateDisplayV3
              content={templateData?.content ?? null}
              allData={null}
              isView={false}
              handleOutputContent={setEmailContent}
              autoResize={false}
              height={350}
            />
            <ModalFooter className="p-0 mt-3">
              <div className="d-flex flex-row gap-3 justify-content-end">
                <Button
                  type="button"
                  className="btn btn-ghost-danger"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  Discard
                </Button>

                <UncontrolledDropdown className="btn-group">
                  <Button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Send
                  </Button>
                  <DropdownToggle
                    tag="button"
                    type="button"
                    className="btn btn-success"
                    split
                  >
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                    <li>
                      <DropdownItem href="#">
                        <i className="ri-timer-line text-muted me-1 align-bottom"></i>{" "}
                        Schedule Send
                      </DropdownItem>
                    </li>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
            </ModalFooter>
          </ModalBody>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default EmailComponent;
