import React from "react";

const EditorDataAttributeModal = () => {
  return (
    <Modal
      isOpen={isFormModalOpen}
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
        <Form
          template={formTemplate}
          userDetails={getAllUserGroups()}
          country={null}
          editData={null}
          onSubmit={handleFormSubmit}
          onFormFieldsChange={null}
          errorMessage={null}
          view={false}
          ref={formikRef}
        />
      </ModalBody>
      <ModalFooter>
        <div className="d-flex justify-content-end gap-2">
          <Button className="btn-danger" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            className="btn-danger"
            onClick={() => {
              console.log("Hello")
            }}
          >
            Confirm
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditorDataAttributeModal;
