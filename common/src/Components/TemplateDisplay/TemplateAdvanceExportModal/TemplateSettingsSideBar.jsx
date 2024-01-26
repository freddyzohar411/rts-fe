import React, { useState } from "react";
import { Col, Row, Label, Input, Button } from "reactstrap";
import SelectElement from "../../Elements/SelectElement";

const TemplateSettingsSideBar = ({ setSettings, settings, exportCallback }) => {
  const [tempSettings, setTempSettings] = useState(settings);
  const setFirstLetterUpperCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  console.log("settings", settings);

  return (
    <div>
      <h2>Settings</h2>
      <hr />
      <Row className="mb-2">
        <Col>
          <Label>Page Type</Label>
          <SelectElement
            value={{
              label: setFirstLetterUpperCase(tempSettings.pageType),
              value: tempSettings.pageType,
            }}
            optionsData={[
              { label: "A4", value: "a4" },
              { label: "A3", value: "a3" },
              { label: "Letter", value: "letter" },
            ]}
            setSelectedOptionData={(e) =>
              //   setSettings((prev) => ({ ...prev, pageType: e.value }))
              setTempSettings((prev) => ({ ...prev, pageType: e.value }))
            }
            clearable={false}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Label>Page Orientation</Label>
          <SelectElement
            value={{
              label: setFirstLetterUpperCase(tempSettings.pageOrientation),
              value: tempSettings.pageOrientation,
            }}
            optionsData={[
              { label: "Portrait", value: "portrait" },
              { label: "Landscape", value: "landscape" },
            ]}
            setSelectedOptionData={(e) =>
              //   setSettings((prev) => ({ ...prev, pageOrientation: e.value }))
              setTempSettings((prev) => ({ ...prev, pageOrientation: e.value }))
            }
            clearable={false}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Col>
          <Label>Unit</Label>
          <SelectElement
            value={{
              label: setFirstLetterUpperCase(tempSettings.unit),
              value: tempSettings.unit,
            }}
            optionsData={[
              { label: "In", value: "in" },
              { label: "Mm", value: "mm" },
            ]}
            setSelectedOptionData={(e) =>
              //   setSettings((prev) => ({ ...prev, unit: e.value }))
              setTempSettings((prev) => ({ ...prev, unit: e.value }))
            }
            clearable={false}
          />
        </Col>
      </Row>
      <Row className="mb-2">
        <Label>Margin</Label>
        <Col col="6" className="d-flex flex-column">
          <Label style={{ fontSize: "0.75rem" }}>Top</Label>
          <Input
            type="number"
            value={tempSettings.marginTop}
            onChange={(e) =>
              //   setSettings((prev) => ({
              //     ...prev,
              //     marginTop: parseFloat(e.target.value),
              //   }))
              setTempSettings((prev) => ({
                ...prev,
                marginTop: parseFloat(e.target.value),
              }))
            }
            placeholder="Top Margin"
          />
        </Col>
        <Col col="6" className="d-flex flex-column">
          <Label style={{ fontSize: "0.75rem" }}>Bottom</Label>
          <Input
            type="number"
            value={tempSettings.marginBottom}
            onChange={(e) =>
              //   setSettings((prev) => ({
              //     ...prev,
              //     marginBottom: parseFloat(e.target.value),
              //   }))
              setTempSettings((prev) => ({
                ...prev,
                marginBottom: parseFloat(e.target.value),
              }))
            }
            placeholder="Bottom Margin"
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col col="6" className="d-flex flex-column">
          <Label style={{ fontSize: "0.75rem" }}>Right</Label>
          <Input
            type="number"
            value={tempSettings.marginLeft}
            onChange={(e) =>
              //   setSettings((prev) => ({
              //     ...prev,
              //     marginLeft: parseFloat(e.target.value),
              //   }))
              setTempSettings((prev) => ({
                ...prev,
                marginLeft: parseFloat(e.target.value),
              }))
            }
            placeholder="Left Margin"
          />
        </Col>
        <Col col="6" className="d-flex flex-column">
          <Label style={{ fontSize: "0.75rem" }}>Left</Label>
          <Input
            type="number"
            value={tempSettings.marginRight}
            onChange={(e) =>
              //   setSettings((prev) => ({
              //     ...prev,
              //     marginRight: parseFloat(e.target.value),
              //   }))
              setTempSettings((prev) => ({
                ...prev,
                marginRight: parseFloat(e.target.value),
              }))
            }
            placeholder="Right Margin"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button
            className="btn btn-custom-primary"
            onClick={() => setSettings({
                ...settings,
                unit: tempSettings.unit,
                pageType: tempSettings.pageType,
                pageOrientation: tempSettings.pageOrientation,
                marginTop: tempSettings.marginTop,
                marginBottom: tempSettings.marginBottom,
                marginLeft: tempSettings.marginLeft,
                marginRight: tempSettings.marginRight,
            })}
          >
            Set & Preview
          </Button>
        </Col>
      </Row>
      <h2>Export</h2>
      <hr />
      <Row className="mb-2">
        <Col>
          <Label>Export File Type</Label>
          <SelectElement
            value={{
              label: setFirstLetterUpperCase(settings.exportType),
              value: settings.exportType,
            }}
            optionsData={[
              { label: "Pdf", value: "pdf" },
              { label: "Docx", value: "docx" },
              { label: "Html", value: "html" },
            ]}
            setSelectedOptionData={(e) =>
              setSettings((prev) => ({ ...prev, exportType: e.value }))
            }
            clearable={false}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col col="6">
          <Label>File Name</Label>
          <Input
            type="text"
            value={settings.fileName}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, fileName: e.target.value }))
            }
            placeholder="Enter File Name"
          />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-end">
          <Button className="btn btn-custom-primary" onClick={exportCallback}>Export</Button>
        </Col>
      </Row>
    </div>
  );
};

export default TemplateSettingsSideBar;
