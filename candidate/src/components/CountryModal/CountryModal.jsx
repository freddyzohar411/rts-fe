import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { Actions } from "@workspace/common";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function CountryModal({ setCountry }) {
  const dispatch = useDispatch();
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.businessCountries
  );

  const [modal, setModal] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    dispatch(Actions.fetchBusinessCountries());
  }, []);

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

  useEffect(() => {
    if (selectedCountry) {
      setCountry(selectedCountry);
    }
  }, [selectedCountry]);

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
        <Flag code={country.iso3} height="17" width="25.5" />
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
      </ModalBody>
      <ModalFooter
        as="div"
        className="d-flex justify-content-between align-items-center"
      >
        <Link to="/accounts">
          <Button className="btn btn-danger">Cancel</Button>
        </Link>
        <div className="d-flex gap-3">
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
        </div>
      </ModalFooter>
    </Modal>
  );
}

export default CountryModal;
