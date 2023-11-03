import React, { useContext, useEffect, useState } from "react";
import FormBuilder from "./FormBuilder2";
import { UserContext } from "../context/UserProvider";
import { useParams } from "react-router-dom";
// import AccountUnusedFields from "../unusedfields/accountUnsedField.json"

const FormBuilderPage = () => {
  const [unusedFields, setUnusedFields] = useState(null);
  const [template, setTemplate] = useState(null);
  const { templateName } = useParams();
  const { userDetails } =
    useContext(UserContext);

  /**
   * This useEffect is to load the template json file
   */
  useEffect(() => {
    if (templateName) {
      console.log("templateName", templateName);
      import(`../data/${templateName}.json`).then((data) => {
        const newData = JSON.parse(JSON.stringify(data.default));
        setTemplate(newData);
      });
    } else {
      setTemplate(null);
    }

  }, [templateName]);

  /**
   * This useEffect is to load the unused fields json file
   */
  useEffect(() => {
    import(`../unusedfields/accountUnsedField.json`).then((data) => {
      const newData = JSON.parse(JSON.stringify(data.default));
      setUnusedFields(newData);
      console.log("UnusedFields ASYNC", data.default);
    });
  }, [template]);

  console.log("Template from FormBuilderPage", template)
  return (
    <FormBuilder
      template={template}
      fields={unusedFields}
      userDetails={userDetails}
      onSubmit={(values, formFields, formState) => {
        // console.log("Out-values:", values);
        // console.log("Out-formfields:", formFields);
        // Let test out creating a post
        // return fetch("https://jsonplaceholder.typicode.com/posts", {
        //   method: "POST",
        //   body: JSON.stringify(values),
        //   headers: {
        //     "Content-type": "application/json; charset=UTF-8",
        //   },
        // })
        //   .then((response) => response.json())
        //   .then((json) => console.log(json));

        // 


      }}
    />
  );
};

export default FormBuilderPage;
