export const convertObjectToFormData = (object) => {
  const formData = new FormData();
  for (const key in object) {
    formData.append(key, object[key]);
  }
  return formData;
};

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
};

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
};

/* This function handles arrays, nested objects, and file attachments specifically.
 *
 * @param {Object} obj - The object to convert.
 * @param {FormData} [formData=new FormData()] - The FormData object to populate.
 * @param {string} [parentKey=''] - The base key from which to build nested keys.
 * @return {FormData} The populated FormData object.
 */
// export function convertToFormDataNested(
//   obj,
//   formData = new FormData(),
//   parentKey = ""
// ) {
//   if (obj === null || obj === undefined) {
//     // Optionally skip null or undefined values by returning formData as is
//     return formData;
//   }

//   if (typeof obj !== "object") {
//     // Append simple values with the parentKey
//     formData.append(parentKey, obj);
//   } else if (obj instanceof Date) {
//     // Handle dates by converting them to an ISO string
//     formData.append(parentKey, obj.toISOString());
//   } else if (obj instanceof File) {
//     // Append file objects directly
//     formData.append(parentKey, obj);
//   } else if (Array.isArray(obj)) {
//     // Convert array elements into a single string separated by commas
//     const arrayValue = obj
//       .map((item) => {
//         if (typeof item === "object" && item !== null) {
//           // If the item is an object and not a File, JSON stringify might be considered
//           // but since we expect simple values or Files, we assume it's not needed here
//           return JSON.stringify(item);
//         }
//         return item.toString();
//       })
//       .join(",");
//     formData.append(parentKey, arrayValue);
//   } else {
//     // Recurse for each property in the object
//     Object.keys(obj).forEach((key) => {
//       const itemKey = parentKey ? `${parentKey}.${key}` : key;
//       convertToFormDataNested(obj[key], formData, itemKey);
//     });
//   }
//   return formData;
// }

export function convertToFormDataNested(obj, formData = new FormData(), parentKey = "") {
  if (obj === null || obj === undefined) {
      // Optionally skip null or undefined values by returning formData as is
      return formData;
  }

  if (typeof obj !== "object") {
      // Append simple values with the parentKey
      formData.append(parentKey, obj);
  } else if (obj instanceof Date) {
      // Handle dates by converting them to an ISO string
      formData.append(parentKey, obj.toISOString());
  } else if (obj instanceof File) {
      // Append file objects directly
      formData.append(parentKey, obj);
  } else if (Array.isArray(obj)) {
      // Process each item in the array with its index included in the key
      obj.forEach((item, index) => {
          const key = parentKey + '[' + index + ']'; // Append index for each array item
          convertToFormDataNested(item, formData, key);
      });
  } else {
      // Recurse for each property in the object
      Object.keys(obj).forEach((key) => {
        const itemKey = parentKey ? `${parentKey}.${key}` : key;
        convertToFormDataNested(obj[key], formData, itemKey);
      });
  }
  return formData;
}
