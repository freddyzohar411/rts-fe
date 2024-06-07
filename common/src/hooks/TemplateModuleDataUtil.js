export function flattenObject(obj) {
  let flattened = {};

  function recursiveFlatten(currentObj) {
    for (const key in currentObj) {
      if (currentObj.hasOwnProperty(key)) {
        if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
          // Recursively flatten nested objects
          recursiveFlatten(currentObj[key]);
        } else {
          flattened[key] = currentObj[key];
        }
      }
    }
  }

  recursiveFlatten(obj);
  return flattened;
}

export function extractNameAndEmail(input) {
  // Define the regex to capture the name and email, allowing spaces before the parentheses
  const regex = /^(.+?)\s*\(([^)]+)\)$/;
  const matches = input.match(regex);

  // Check if the input matches the regex pattern
  if (matches) {
    return {
      name: matches[1].trim(),
      email: matches[2].trim(),
    };
  } else {
    // If no parentheses are found, return the name and an empty email
    return {
      name: input.trim(),
      email: "",
    };
  }
}
