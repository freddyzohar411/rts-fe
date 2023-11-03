/**
 * This method will convert all the values within the objects in the array to string
 * @param {} arrayObject 
 * @returns 
 */

export const stringifyArrayObjectValues = (arrayObject) => {
  const newArray = arrayObject.map((item) => {
    const newItem = { ...item };
    for (const key in newItem) {
      if (typeof newItem[key] === "object") {
        newItem[key] = JSON.stringify(newItem[key]);
      }
    }
    return newItem;
  });
  return newArray;
};

export const parseArrayObjectValues = (arrayObject) => {
  const newArray = arrayObject.map((item) => {
    let newItem = {...item};
    for (const key in newItem) {
      try {
        newItem[key] = JSON.parse(newItem[key]);
      } catch (error) {
        newItem[key] = newItem[key]; // Assign the original string if it's not valid JSON
      }
    }
    return newItem;
  });
  return newArray;
}
