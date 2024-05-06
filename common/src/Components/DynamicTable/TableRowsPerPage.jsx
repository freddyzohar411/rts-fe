import React from "react";
import { Input } from "reactstrap";

const TableRowsPerPage = ({ pageRequestSet }) => {
  return (
    <div className="d-flex align-items-center">
      <div>Rows per page:</div>
      <div>
        <Input
          onChange={(e) => pageRequestSet.setPageSize(parseInt(e.target.value))}
          type="select"
          className="form-select border-secondary bg-transparent border-0 fs-6"
          style={{
            width: "60px",
            paddingLeft: "5px",
            paddingRight: "0",
            marginRight:"0"
          }}
          defaultValue="20"
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </Input>
      </div>
    </div>
  );
};

export default TableRowsPerPage;
