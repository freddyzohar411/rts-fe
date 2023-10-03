import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Progress,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { fetchCountryCurrency } from "../../store/countrycurrency/action";
import { fetchIndustry } from "../../store/industry/action";
import { fetchParentCompany } from "../../store/parentcompany/action";
import { fetchDraftAccount } from "../../store/accountregistration/action";
import { fetchDepartment } from "../../store/department/action";
import { useDispatch, useSelector } from "react-redux";
import CountryModal from "../CountryModal/CountryModal";

function Stepper() {
  const dispatch = useDispatch();
  // Fetch all the countries, parent companies and industries
  useEffect(() => {
    dispatch(fetchCountryCurrency());
    dispatch(fetchIndustry());
    dispatch(fetchIndustry());
    dispatch(fetchParentCompany());
    dispatch(fetchDraftAccount());
    dispatch(fetchDepartment());
  }, []);

  const [activeTab, setActiveTab] = useState(1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const location = useLocation().pathname;
  const [isModalOpen, setIsModalOpen] = useState(true);

  function getTabNumber(location) {
    if (location === "/account/account-creation") {
      return [1, 0];
    }
    if (location === "/account/contact-creation") {
      return [2, 20];
    }
    if (location === "/account/document-creation") {
      return [3, 40];
    }
    if (location === "/account/client-instructions-creation") {
      return [4, 60];
    }
    if (location === "/account/access-creation") {
      return [5, 80];
    }
    if (location === "/account/commercial-creation") {
      return [6, 100];
    }
  }

  function toggleTab(tab, value) {
    if (activeTab !== tab) {
      var modifiedSteps = [...passedSteps, tab];

      if (tab >= 1 && tab <= 6) {
        setActiveTab(tab);
        setPassedSteps(modifiedSteps);
      }
    }
    setProgressBarValue(value);
  }

  useEffect(() => {
    setActiveTab(getTabNumber(location)[0]);
    setProgressBarValue(getTabNumber(location)[1]);
    setIsModalOpen(true);
  }, [location]);

  document.title = "Account Creation | RTS";

  return (
    <React.Fragment>
      <div className="page-content">
        {isModalOpen && <CountryModal/>}
        <Container>
          <Row>
            <Col xl={12}>
              <Card>
                <CardBody className="m-4">
                  <div className="progress-nav mb-5">
                    <Progress
                      value={progressBarValue}
                      style={{ height: "1px" }}
                    />
                    <Nav
                      className="nav-pills progress-bar-tab custom-nav"
                      role="tablist"
                    >
                      <NavItem>
                        <NavLink
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 1,
                              done: activeTab <= 6 && activeTab >= 0,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(1, 0);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-account mt-2"></i>
                            <p className="h6">Account</p>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="/contact-creation"
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 2,
                              done: activeTab <= 6 && activeTab > 1,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(2, 20);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-contacts mt-2"></i>
                            <p className="h6">Contacts</p>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 3,
                              done: activeTab <= 6 && activeTab > 2,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(3, 40);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-file-document-outline mt-2"></i>
                            <p className="h6">Documents</p>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 4,
                              done: activeTab <= 6 && activeTab > 3,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(4, 60);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-file-document-multiple-outline mt-2"></i>
                            <p className="h6 text-nowrap">
                              Client Instructions
                            </p>
                          </div>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          to="#"
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 5,
                              done: activeTab <= 6 && activeTab > 4,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(5, 80);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-folder-eye-outline mt-2"></i>
                            <p className="h6">Access</p>
                          </div>
                        </NavLink>
                      </NavItem>

                      <NavItem>
                        <NavLink
                          to="#"
                          id="pills-gen-info-tab"
                          className={classnames(
                            {
                              active: activeTab === 6,
                              done: activeTab <= 7 && activeTab > 5,
                            },
                            "rounded-pill"
                          )}
                          onClick={() => {
                            toggleTab(6, 100);
                          }}
                          tag="button"
                        >
                          <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                            <i className="mdi mdi-calculator mt-2"></i>
                            <p className="h6">Commercial</p>
                          </div>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                  <Outlet />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default Stepper;
