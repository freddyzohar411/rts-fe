// Sort array of object by key
function sortArrayObj(arr, key) {
  return arr?.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}

export { sortArrayObj };
