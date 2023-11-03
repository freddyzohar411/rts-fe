
export const convertObjectToFormData = (object) => {
    const formData = new FormData();
    for (const key in object) {
      formData.append(key, object[key]);
    }
    return formData;
  }
  