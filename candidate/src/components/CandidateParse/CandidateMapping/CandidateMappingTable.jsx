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

const CandidateMappingTable = () => {
  const [candidateFormFieldsData, setCandidateFormFieldsData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(null);
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch data
    axios
      .get("http://localhost:8050/api/candidates/fields/all")
      .then((res) => {
        // console.log("Candidate Headings", convertObjToArray(res.data));
        setCandidateFormFieldsData(convertObjToArray(res.data));
        setCategories(getKeysArrayFromObj(res.data));
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
      render: (data) => {
        return <span>{data.name}</span>;
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

  console.log("Categories State", categories);

  // Generate Body
  const generateBodyJsx = (config, data, categories, openModule) => {
    return categories?.map((category) => {
      const categoryData = data.filter(
        (rowData) => (rowData.category || "No Category") === category
      );

      console.log("Category Data", categoryData);

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
                <span>{convertCamelCaseToNormal(category)}</span>
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
                        {option.render(rowData, i)}
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

  // const generateBodyJsx = (config, data, openModule) => {
  //   return Object.keys(candidateFormFields).map((category) => {
  //     // const categoryData = data.filter(
  //     //   (rowData) => (rowData.category || "No Category") === category
  //     // );

  //     return (
  //       <React.Fragment key={category}>
  //         <tr style={{ cursor: "pointer" }} onClick={() => toggle(category)}>
  //           <td colSpan={config.length + 1}>
  //             <div className="d-flex flex-row align-items-middle gap-3">
  //               {openModule === module ? (
  //                 <i className="ri-arrow-up-s-line"></i>
  //               ) : (
  //                 <i className="ri-arrow-down-s-line"></i>
  //               )}
  //               <span>{convertCamelCaseToNormal(category)}</span>
  //             </div>
  //           </td>
  //         </tr>
  //         {openModule === category && (
  //           <>
  //             {data[category] && data[category].length > 0 ? (
  //               data[category]?.map((rowData) => (
  //                 // console.log("Row Data", rowData)
  //                 <tr key={rowData.formId}>
  //                   <td key={rowData} style={{ verticalAlign: "middle" }}>
  //                     {/* {option.render(rowData)} */}
  //                     {rowData.label}
  //                   </td>
  //                 </tr>
  //               ))
  //             ) : (
  //               <tr>
  //                 <td colSpan={config.length + 1}>No form templates found.</td>
  //               </tr>
  //             )}
  //           </>
  //         )}
  //       </React.Fragment>
  //     );
  //   });
  // };

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
      </Row>
    </Container>
  );
};

export default CandidateMappingTable;
