
export const convertObjectToFormData = (object) => {
    const formData = new FormData();
    for (const key in object) {
      formData.append(key, object[key]);
    }
    return formData;
  }

  export const convertObjectToFormDataWithFiles = (object) => {
    const formData = new FormData();
    for (const key in object) {
      // Check if it is an array of files
      if (Array.isArray(object[key])) {
        for (const file of object[key]) {
          if (file === null || file === undefined) {
            continue;
          }
          formData.append(key, file);
        }
        continue;
      }
      formData.append(key, object[key]);
    }
    return formData;
  }

  // Can i have another convertObjecttoFormDatawithArray that add array data type to formdata
  // For example in java i will get String[] names
  // If is a array and is empty array just append empty array
  // If is a array and is not empty array append each element of array

  export const convertObjectToFormDataWithArray = (object) => {
    const formData = new FormData();
    for (const key in object) {
      // Check if it is an array of files
      if (Array.isArray(object[key])) {
        for (const file of object[key]) {
          if (file === null || file === undefined) {
            continue;
          }
          formData.append(key, file);
        }
        continue;
      }
      formData.append(key, object[key]);
    }
    return formData;
  }



  