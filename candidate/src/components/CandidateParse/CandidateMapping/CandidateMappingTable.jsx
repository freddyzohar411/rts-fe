import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner,
  Table,
} from "reactstrap";
import axios from "axios";
import { SelectElement } from "@workspace/common";
import {
  candidateParseFields,
  candidateParseFieldsFilter,
} from "./candidateMappingObject";
import { toast } from "react-toastify";

const CandidateMappingTable = ({ setCandidateMappingData }) => {
  const [candidateFormFieldsData, setCandidateFormFieldsData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(null);
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setIsLoading] = useState(false);
  const [mappingData, setMappingData] = useState(null);

  // ===================== User Setting ======================
  console.log("candidateFormFieldsData", candidateFormFieldsData);
  const exlcudeDynamicFields = [
    { category: "educationDetails", value: "educationList" },
    { category: "educationDetails", value: "educationDetailsList" },
    { category: "educationDetails", value: "description" },
  ];
  // =========================================================

  // Fetch data For dynamic form fields
  useEffect(() => {
    // Fetch data
    axios
      .get("http://localhost:8050/api/candidates/fields/all")
      .then((res) => {
        setCandidateFormFieldsData(
          convertObjectToArrayFilter(res.data, exlcudeDynamicFields)
        );
        setCategories(getKeysArrayFromObj(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);



  const convertObjectToArrayFilter = (obj, exlcude = []) => {
    const data = convertObjToArray(obj);
    // Filter data based on label and exlude array
    return data.filter((item) => {
      return !exlcude.some((excludeItem) => {
        return (
          excludeItem.category === item.category &&
          excludeItem.value === item.value
        );
      });
    });
  };

  // Fetch data for mapping
  useEffect(() => {
    // Fetch data
    axios
      .get("http://localhost:8050/api/candidates/mapping/get")
      .then((res) => {
        if (res.data.candidateMapping) {
          setMappingData(res.data.candidateMapping);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getKeysArrayFromObj = (obj) => {
    return Object.keys(obj);
  };

  const convertObjToArray = (obj) => {
    const data = [];
    Object.keys(obj).map((key) =>
      obj[key].map((item) =>
        data.push({
          category: key,
          label: item.label,
          value: item.value,
        })
      )
    );
    return data;
  };

  const toggle = (module) => {
    setOpen(open === module ? null : module);
  };

  const deletedNestedObjectIfEmpty = (obj) => {
    Object.keys(obj).map((key) => {
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    });
    return obj;
  };

  function getLabelValueFromArray(labelValueArray, value) {
    if (!labelValueArray) return null;
    for (let group of labelValueArray) {
      for (let option of group.options) {
        if (option.value === value) {
          return option;
        }
      }
    }
    return null; // Return null if the value is not found in any group
  }

  const config = [
    {
      header: "#",
      name: "indexing",
      sort: false,
      sortValue: "indexing",
      render: (data, index) => (
        <div className="d-flex column-gap-2">{index + 1}.</div>
      ),
    },
    {
      header: "Dynamic Form Field Name",
      label: "Dynamic Form Field Name",
      value: "id",
      sort: false,
      render: (data) => {
        return <span>{data.label}</span>;
      },
    },
    {
      header: "Parse Field Name",
      label: "Parse Field Name",
      value: "name",
      sort: false,
      render: (data, i, category) => {
        return (
          <div>
            <SelectElement
              optionsData={candidateParseFieldsFilter([
                convertCamelCaseToNormal(category),
              ])}
              value={getLabelValueFromArray(
                candidateParseFields,
                mappingData?.[data?.category]?.[data?.value]
              )}
              setSelectedOptionData={(selectedOptions) => {
                if (selectedOptions) {
                  setMappingData((prev) => {
                    return {
                      ...prev,
                      [data?.category]: {
                        ...prev?.[data?.category],
                        [data?.value]: selectedOptions["value"],
                      },
                    };
                  });
                } else {
                  setMappingData((prev) => {
                    delete prev[data?.category][data?.value];
                    const newObj = deletedNestedObjectIfEmpty(prev);
                    return {
                      ...newObj,
                    };
                  });
                }
              }}
              disabled={false}
            />
            {/* <span>{getLabelValueFromArray(
                candidateParseFields,
                mappingData?.[data?.category]?.[data?.value]
              ) && `Done`}</span> */}
          </div>
        );
      },
    },
  ];

  // Generate Header
  const generateHeaderJsx = (config) => (
    <>
      {config?.map((option) => {
        if (option.sort === true) {
          return (
            <th
              key={option.name}
              scope="col"
              className="cursor-pointer"
              onClick={() => pageRequestSet.setSortAndDirection(option)}
              style={{ color: "#00000099" }}
            >
              {option.header} <i className="mdi mdi-sort-descending"></i>
            </th>
          );
        } else {
          return (
            <th key={option.name} scope="col" style={{ color: "#00000099" }}>
              {option.header}
            </th>
          );
        }
      })}
    </>
  );

  const convertCamelCaseToNormal = (text) => {
    return text.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
      return str.toUpperCase();
    });
  };

  // Generate Body
  const generateBodyJsx = (config, data, categories, openModule) => {
    return categories?.map((category) => {
      const categoryData = data.filter(
        (rowData) => (rowData.category || "No Category") === category
      );

      return (
        <React.Fragment key={category}>
          <tr style={{ cursor: "pointer" }} onClick={() => toggle(category)}>
            <td colSpan={config.length + 1}>
              <div className="d-flex flex-row align-items-middle gap-3">
                {openModule === module ? (
                  <i className="ri-arrow-up-s-line"></i>
                ) : (
                  <i className="ri-arrow-down-s-line"></i>
                )}
                <span>{`${convertCamelCaseToNormal(
                  category
                )}  (${countMappingData(mappingData, category)})`}</span>
              </div>
            </td>
          </tr>
          {openModule === category && (
            <>
              {categoryData && categoryData.length > 0 ? (
                categoryData?.map((rowData, i) => (
                  <tr key={rowData.formId}>
                    {config.map((option) => (
                      <td key={option.name} style={{ verticalAlign: "middle" }}>
                        {option.render(rowData, i, category)}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={config.length + 1}>No form templates found.</td>
                </tr>
              )}
            </>
          )}
        </React.Fragment>
      );
    });
  };

  const saveCandidateMapping = () => {
    axios
      .post("http://localhost:8050/api/candidates/mapping/save", {
        candidateMapping: mappingData,
      })
      .then((res) => {
        setCandidateMappingData(res.data.candidateMapping);
        toast.success("Candidate Mapping Data Saved Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const countMappingData = (mappingData, category) => {
    return mappingData?.[category]
      ? Object.keys(mappingData[category]).length
      : 0;
  };

  return (
    <Container fluid>
      <Row>
        <Table className="table table-hover table-striped table-bordered border-secondary align-start">
          <thead>
            <tr>
              {data && data.length > 0 ? (
                generateHeaderJsx(config)
              ) : isLoading ? (
                <Skeleton />
              ) : (
                <span>Header is not available.</span>
              )}
            </tr>
          </thead>
          <tbody>
            {candidateFormFieldsData && candidateFormFieldsData.length > 0 ? (
              generateBodyJsx(config, candidateFormFieldsData, categories, open)
            ) : isLoading ? (
              <Skeleton />
            ) : (
              <span>Data is not available.</span>
            )}
          </tbody>
        </Table>
        <Button
          className="btn btn-custom-primary"
          onClick={saveCandidateMapping}
        >
          Save
        </Button>
      </Row>
    </Container>
  );
};

export default CandidateMappingTable;
