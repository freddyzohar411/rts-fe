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
  const parenthesisIndex = input.indexOf("(");

  if (parenthesisIndex !== -1) {
    const name = input.slice(0, parenthesisIndex).trim();
    const email = input
      .slice(parenthesisIndex + 1, input.indexOf(")", parenthesisIndex))
      .trim();
    return {
      name: name,
      email: email,
    };
  } else {
    return {
      name: input.trim(),
      email: "",
    };
  }
}
