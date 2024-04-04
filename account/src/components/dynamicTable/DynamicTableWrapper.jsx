import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import { ACCOUNT_INITIAL_OPTIONS } from "../../pages/AccountListing/accountListingConstants";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { DateHelper, FileHelper } from "@workspace/common";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  confirmDelete,
}) => {
  const { Permission, checkAllPermission } = useUserAuth();
  const [customViewShow, setCustomViewShow] = useState(false);
  const [selectedOptGroup, setSelectedOptGroup] = useState(
    ACCOUNT_INITIAL_OPTIONS
  );
  const [isCustomViewModalOpen, setIsCustomModalView] = useState(false);
  const accountsMeta = useSelector(
    (state) => state.AccountReducer.accountsMeta
  );

  const handleChange = (selected) => {
    const selectedObjects = selected.map((value) => {
      return optGroup.find((option) => option.value === value);
    });
    setSelectedOptGroup(selectedObjects);
  };

  const areOptionsEmpty = () => {
    return !(optGroup && optGroup.length > 0);
  };

  // Export
  function getDynamicNestedResultForExport(data, value) {
    const result = value?.split(".").reduce((acc, part) => {
      const value = acc ? acc[part] : "";
      if (value === null || value === undefined) {
        return "";
      }
      return value;
    }, data);
    return result;
  }

  function convertConfigDataToObject(
    configData,
    allData,
    customRenderList,
    addIndexing = false
  ) {
    const exportData = allData.map((data) => {
      return configData.reduce((acc, curr) => {
        let renderMethod = null;

        if (customRenderList.length > 0) {
          renderMethod =
            customRenderList.find((item) => {
              return item.names.includes(curr?.name);
            })?.render || null;
        }

        if (renderMethod) {
          acc[curr?.header] = renderMethod(data, curr);
          return acc;
        }

        acc[curr?.header] = getDynamicNestedResultForExport(data, curr?.name);
        return acc;
      }, {});
    });
    if (addIndexing) {
      exportData.forEach((data, index) => {
        exportData[index] = { "#": index + 1, ...data };
      });
    }
    return exportData;
  }

  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          getDynamicNestedResultForExport(data, opt?.name) || ""
        ),
    },
  ];

  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("No data to export");
      return;
    }
    if (config.length === 0) {
      toast.error("No fields to export");
      return;
    }

    const exportData = convertConfigDataToObject(
      config.slice(2, -1),
      data,
      customRenderList,
      true
    );

    if (exportData.length === 0) {
      toast.error("No data to export");
      return;
    }

    console.log("Export Data", exportData);

    // FileHelper.exportToCSV(exportData, "accounts");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Modal
          isOpen={isCustomViewModalOpen}
          setIsOpen={setIsCustomModalView}
          size="xl"
          centered
        >
          <ModalHeader className="border border-bottom border-primary pb-3">
            <div className="d-flex flex-column gap-1">
              <span className="modal-title">Account Fields Options</span>
              <span className="text-muted fs-6">
                Select fields to show on account listing table.
              </span>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="p-2">
              <DualListBox
                id="preserve-order"
                canFilter
                filterCallback={(optGroup, filterInput) => {
                  if (filterInput === "") {
                    return true;
                  }
                  return new RegExp(filterInput, "i").test(optGroup.label);
                }}
                options={optGroup ?? []}
                preserveSelectOrder
                selected={selectedOptGroup.map((option) => option?.value) ?? []}
                showOrderButtons
                onChange={handleChange}
                icons={{
                  moveLeft: [
                    <span
                      className={`mdi mdi-chevron-left ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveAllLeft: [
                    <span
                      className={`mdi mdi-chevron-double-left ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveRight: (
                    <span
                      className={`mdi mdi-chevron-right ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />
                  ),
                  moveAllRight: [
                    <span
                      className={`mdi mdi-chevron-double-right ${
                        areOptionsEmpty() ? "disabled-icon cursor-none" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveDown: <span className="mdi mdi-chevron-down" />,
                  moveUp: <span className="mdi mdi-chevron-up" />,
                  moveTop: <span className="mdi mdi-chevron-double-up" />,
                  moveBottom: <span className="mdi mdi-chevron-double-down" />,
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter className="border border-top border-primary pt-3">
            <div className="d-flex flex-row gap-2 justify-content-end">
              <Button
                className="btn btn-danger"
                onClick={() => setIsCustomModalView(!isCustomViewModalOpen)}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-custom-primary px-3"
                onClick={() => {
                  setCustomConfigData(selectedOptGroup);
                  setIsCustomModalView(false);
                }}
              >
                Set
              </Button>
            </div>
          </ModalFooter>
        </Modal>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
                      {setSearch && (
                        <Col>
                          <div className="search-box">
                            <form onSubmit={pageRequestSet.setSearchTerm}>
                              <Input
                                type="text"
                                placeholder="Search"
                                className="form-control search"
                                value={search}
                                style={{ width: "350px" }}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </form>
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </Col>
                      )}
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <Button
                            type="button"
                            className="btn btn-custom-primary d-flex align-items-center header-btn"
                            onClick={handleExport}
                          >
                            <span>
                              <i className="mdi mdi-download me-1"></i>
                            </span>
                            Export
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              if (areOptionsEmpty()) {
                                toast.error(
                                  "No fields to show. Please have at least one account"
                                );
                                return;
                              }
                              setIsCustomModalView(true);
                              setCustomViewShow(!customViewShow);
                            }}
                            className="btn btn-custom-primary d-flex align-items-center header-btn"
                          >
                            <span>
                              <i className="ri-settings-3-fill me-1"></i>
                            </span>
                            Custom View
                          </Button>
                          {checkAllPermission([Permission.ACCOUNT_WRITE]) && (
                            <Link
                              to="/accounts/create"
                              style={{ color: "black" }}
                            >
                              <Button
                                type="button"
                                className="btn btn-custom-primary header-btn"
                              >
                                Create New Account
                              </Button>
                            </Link>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <DynamicTable
                      config={config}
                      data={data}
                      pageRequestSet={pageRequestSet}
                      pageInfo={pageInfo}
                      isLoading={accountsMeta?.isLoading}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
