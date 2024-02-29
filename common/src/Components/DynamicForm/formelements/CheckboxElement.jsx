import React from "react";

const CheckboxElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;

  const arrayToString = (array) => {
    if (!array) return "";
    if (typeof array === "string") return array;
    return array.join(", ");
  };

  const stringToArray = (string) => {
    if (!string) return [];
    if (typeof string === "object") return string;
    return string.split(", ");
  };

  return (
    <>
      <div className="d-flex gap-3">
        {field?.options.map((option) => (
          <div className="form-check" key={option.value}>
            <input
              className="form-check-input"
              type="checkbox"
              name={field.name}
              id={option.value}
              value={option.value}
              checked={stringToArray(formik?.values?.[field.name])?.includes(option.value)}
              disabled={formState === "view" ? true : false}
              onChange={() => {
                const isChecked = stringToArray(
                  formik.values[field.name]
                )?.includes(option.value);
                if (isChecked) {
                  formik.setFieldValue(
                    field.name,
                    arrayToString(
                      stringToArray(formik.values[field.name])?.filter(
                        (item) => item !== option.value
                      )
                    )
                  );
                } else {
                  // formik.setFieldValue(field.name, [
                  //   ...formik.values[field.name],
                  //   arrayToString(option.value),
                  // ]);

                  formik.setFieldValue(
                    field.name,
                    arrayToString([
                      ...stringToArray(formik.values[field.name]),
                      option.value,
                    ])
                  );
                }
              }}
              tabIndex={tabIndexData?.[field?.fieldId]}
            />
            <label className="form-check-label" htmlFor={option.value}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CheckboxElement;
