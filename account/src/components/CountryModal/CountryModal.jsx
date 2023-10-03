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
import { countries } from "./countries";
import ReactCountryFlag from "react-country-flag";
import SimpleBar from "simplebar-react";

function CountryModal() {
  const [modal, setModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  function toggle() {
    setModal(!modal);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const renderCountries = (country, index) => (
    <Col key={index}>
      <Card
        className="p-3 my-2 d-flex flex-row gap-2 align-items-center"
        style={{ minHeight: "60px" }}
      >
        <Input
          type="radio"
          name="country"
          className="form-check-input"
          value={searchQuery}
          onChange={() => handleCountrySelect(country)}
        />
        
          <ReactCountryFlag style={{fontSize: "25px"}} className="mx-1" countryCode={country.code} svg />
          <span style={{fontSize: "15px"}}>{country.name}</span>
        
      </Card>
    </Col>
  );

  const rows = [];
  for (let i = 0; i < filteredCountries.length; i += 3) {
    rows.push(filteredCountries.slice(i, i + 3));
  }

  useEffect(() => {}, [filteredCountries]);

  return (
    <Modal
      size="xl"
      isOpen={modal}
      id="countryModal"
      scrollable={true}
      toggle={toggle}
      backdrop="static"
    >
      <ModalHeader className="border-bottom d-flex flex-column align-items-center">
        <Row>
          <Col>
            <h4 className="modal-title my-3 text-center">Select a Country for Account</h4>
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
                style={{width: "1050px"}}
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </Col>
        </Row>
      </ModalHeader>
      <ModalBody>
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
                  <div className="text-muted">No country found. Please try again.</div>
                )}
              </div>
            </Col>
          </Row>
        </div>
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
