import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
// import { countries } from "./countries";
import SimpleBar from "simplebar-react";
import { useDispatch, useSelector } from "react-redux";
import Flag from "react-world-flags";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

<<<<<<< HEAD
function CountryModal({ setCountry }) {
=======
function CountryModal() {
  const dispatch = useDispatch();
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );
>>>>>>> develop-settings
  const [modal, setModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  function toggle() {
    setModal(!modal);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCountries(countryData);
    } else {
      const filtered = countryData.filter((country) =>
        country.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

<<<<<<< HEAD
  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, [selectedCountry]);

=======
  // Render the card of each country
>>>>>>> develop-settings
  const renderCountries = (country, index) => (
    <Col lg={4} md={4} sm={4} xs={4} key={index}>
      <Card
        className="p-3 my-2 d-flex flex-row gap-2 align-items-center"
        style={{ height: "70px" }}
      >
        <Input
          type="radio"
          name="country"
          className="form-check-input"
          value={searchQuery}
          onChange={() => handleCountrySelect(country)}
        />

<<<<<<< HEAD
        <ReactCountryFlag
          style={{ fontSize: "25px" }}
          className="mx-1"
          countryCode={country.code}
          svg
        />
=======
        <Flag code={country.iso3} height="17" width="25.5" />
>>>>>>> develop-settings
        <span style={{ fontSize: "15px" }}>{country.name}</span>
      </Card>
    </Col>
  );

  const rows = [];
  for (let i = 0; i < filteredCountries.length; i += 3) {
    rows.push(filteredCountries.slice(i, i + 3));
  }

  useEffect(() => {
    if (countryData && countryData.length > 0) {
      setFilteredCountries(countryData);
    }
  }, [countryData]);

  return (
    <Modal
      size="xl"
      isOpen={modal}
      id="countryModal"
      scrollable={true}
      toggle={toggle}
      backdrop="static"
      centered
    >
<<<<<<< HEAD
      <ModalHeader className="border-bottom d-flex flex-column align-items-center">
        <Row>
          <Col>
            <h4 className="modal-title my-3 text-center">
              Select a Country for Account
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              {selectedCountry && (
                <p
                  className="text-muted text-center"
                  style={{ fontSize: "15px" }}
                >
                  You have selected: {selectedCountry.name}
                </p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="search-box">
              <Input
                type="text"
                placeholder="Search for a country.."
                className="form-control"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ width: "1050px" }}
              />
              <i className="ri-search-line search-icon"></i>
=======
      <ModalHeader className="border-bottom d-flex flex-column justify-content-center p-4">
        <div className="modal-title text-center mb-3">
          Select a Country for Account Creation
        </div>
        <div className="mb-2 text-center">
          {selectedCountry ? (
            <div className="text-muted" style={{ fontSize: "13px" }}>
              You have selected: {selectedCountry.name}
            </div>
          ) : (
            <div className="text-muted" style={{ fontSize: "13px" }}>
              Please select a country to continue.
>>>>>>> develop-settings
            </div>
          )}
        </div>
        <div className="search-box" style={{ minWidth: "1070px" }}>
          <Input
            type="text"
            placeholder="Search for a country.."
            className="form-control"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <i className="ri-search-line search-icon"></i>
        </div>
      </ModalHeader>
      <ModalBody>
<<<<<<< HEAD
        <div className="p-4">
          <Row>
            <Col lg={12}>
              <div>
                {rows && rows.length > 0 ? (
                  <div>
                    {rows.map((row, rowIndex) => (
                      <Row key={rowIndex}>
                        {row.map((country, index) =>
                          renderCountries(country, index)
                        )}
                      </Row>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted">
                    No country found. Please try again.
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </div>
=======
        <SimpleBar style={{ height: "330px", overflowY: "auto" }}>
          <div className="p-3">
            <Row>
              <Col lg={12}>
                <div>
                  {rows && rows.length > 0 ? (
                    <div>
                      {rows.map((row, rowIndex) => (
                        <Row key={rowIndex}>
                          {row.map((country, index) =>
                            renderCountries(country, index)
                          )}
                        </Row>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted">
                      No country found. Please try again.
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        </SimpleBar>
>>>>>>> develop-settings
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          disabled={!selectedCountry}
          onClick={() => {
            setSelectedCountry(null);
            document.querySelector(
              'input[name="country"]:checked'
            ).checked = false;
          }}
        >
          Clear Selection
        </Button>
        <Button
          className="btn btn-success"
          type="button"
          disabled={!selectedCountry}
          onClick={() => {
            setModal(!modal);
          }}
        >
          Proceed
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default CountryModal;

{
  /* <Row>
          <Col lg={12}>
            <h4 className="modal-title my-3 text-center">
              Select a Country for Account
            </h4>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div>
              {selectedCountry ? (
                <p
                  className="text-muted text-center"
                  style={{ fontSize: "15px" }}
                >
                  You have selected: {selectedCountry.name}
                </p>
              ) : (
                <p
                  className="text-muted text-center"
                  style={{ fontSize: "15px" }}
                >
                  You have not chosen a country.
                </p>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="search-box">
              <Input
                type="text"
                placeholder="Search for a country.."
                className="form-control"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </Col>
        </Row> */
}
