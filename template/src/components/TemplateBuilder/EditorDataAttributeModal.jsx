import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
} from "reactstrap";
import { CreateSelectElement } from "@workspace/common";

const EditorDataAttributeModal = ({
  isModalOpen,
  setIsModalOpen,
  header = "My Header",
  data,
  setData,
  action,
}) => {
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={closeModal}
      centered
      scrollable
      size="md"
    >
      <ModalHeader
        toggle={closeModal}
        style={{
          paddingBottom: "0px",
        }}
      >
        <h3>{header || "Header"}</h3>
      </ModalHeader>
      <ModalBody>
        <div>
          <CreateSelectElement
            label="Choose Section"
            value={{
              value: data?.section,
              label: data?.section,
            }}
            setSelectedOptionData={(dataIn) => {
              setData((prev) => ({ ...prev, section: dataIn?.value }));
            }}
            optionsData={[
              { value: "section1", label: "Section 1" },
              { value: "section2", label: "Section 2" },
              { value: "section3", label: "Section 3" },
            ]}
          />
          <div className="mt-2">
            <Label>Field Label</Label>
            <Input
              type="text"
              value={data?.label}
              onChange={(e) => {
                setData((prev) => ({ ...prev, label: e.target.value }));
              }}
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end gap-2">
          <Button className="btn-danger" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            className="btn-danger"
            onClick={() => {
                action(data);
            }}
          >
            Add Attribute
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditorDataAttributeModal;
