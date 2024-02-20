export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const generateRandomString = (length) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomString += alphabet.charAt(randomIndex);
  }
  return randomString;
};

export const encode = (str) => {
  const hashedStr = btoa(btoa(str));
  const randomStr = generateRandomString(4);
  const updatedStr =
    hashedStr.substring(0, 4) + randomStr + hashedStr.substring(4);
  return updatedStr;
};

export const truncate = (input, length) =>
  input
    ? input.length > length
      ? `${input.substring(0, length)}...`
      : input
    : "";
