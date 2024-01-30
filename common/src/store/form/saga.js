import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_FORMCATEGORIES, FETCH_FORMS_BY_CATEGORY } from "./actionTypes";
import {
  fetchFormCategoriesSuccess,
  fetchFormCategoriesFailure,
  fetchFormsByCategorySuccess,
  fetchFormsByCategoryFailure,
} from "./action";
import { getFormCategories, getFormsByCategories } from "../../helpers/backend_helper";

function* workFetchFormCategories() {
  try {
    const response = yield call(getFormCategories);
    const formCategories = response.data;
    yield put(fetchFormCategoriesSuccess(formCategories));
  } catch (error) {
    yield put(fetchFormCategoriesFailure(error));
  }
}

function* workFetchFormsByCategory(action) {
  try {
    const response = yield call(getFormsByCategories, action.payload);
    const formsByCategories = response.data;
    yield put(fetchFormsByCategorySuccess(formsByCategories));
  } catch (error) {
    yield put(fetchFormsByCategoryFailure(error));
  }
}

export default function* watchFetchAccountContactsSaga() {
  yield takeEvery(FETCH_FORMCATEGORIES, workFetchFormCategories);
  yield takeEvery(FETCH_FORMS_BY_CATEGORY, workFetchFormsByCategory);
}
