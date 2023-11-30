export const resetMetaData = () => {
  isLoading: false;
  isSuccess: false;
  isError: false;
  errorMessage: "";
  successMessage: "";
};

export const resetAllMetaData = () => ({
  isLoading: false,
  isSuccess: false,
  isError: false,
  isAbort: false,
  successMessage: "",
  errorMessage: "",
})

export const pendingMetaData = (successMessage = "", errorMessage = "") => ({
  isLoading: true,
  isSuccess: false,
  isError: false,
  isAbort: false,
  successMessage,
  errorMessage,
});

export const successMetaData = (successMessage = "", errorMessage = "") => ({
  isLoading: false,
  isSuccess: true,
  isError: false,
  isAbort: false,
  successMessage,
  errorMessage,
});

export const errorMetaData = (successMessage = "", errorMessage = "") => ({
  isLoading: false,
  isSuccess: false,
  isError: true,
  isAbort: false,
  successMessage,
  errorMessage,
});
