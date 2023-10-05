import {
  FETCH_ACCOUNTFORM,
  FETCH_ACCOUNTFORM_SUCCESS,
  FETCH_ACCOUNTFORM_FAILURE,
} from "./actionTypes";
import { JsonHelper } from "@workspace/common";

const initialState = {
  forms: [],
  form: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const AccountFormReducer = (state = initialState, action) => {
  switch (action.type) {
  
    // Fetch Form by id
    case FETCH_ACCOUNTFORM:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTFORM_SUCCESS:
      const data = action.payload;
      const newForm = {
        formName: data?.formName,
        formType: data?.formType,
        baseFormId: data?.baseFormId || 0,
        entityType: data?.entityType,
        stepperNumber: parseInt(data?.stepperNumber),
        formSchema: JsonHelper.parseArrayObjectValues(data.formFieldsList),
        formLayoutSchema: data.formSchemaList,
      };
      return {
        ...state,
        loading: false,
        form: newForm,
      };
    case FETCH_ACCOUNTFORM_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    default:
      return state;
  }
};

export default AccountFormReducer;
