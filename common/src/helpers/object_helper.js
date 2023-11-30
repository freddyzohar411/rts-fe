
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


  