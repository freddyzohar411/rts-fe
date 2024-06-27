import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_TEMPLATES,
  DELETE_TEMPLATE,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  FETCH_TEMPLATE,
  FETCH_TEMPLATE_CATEGORIES,
  FETCH_TEMPLATE_BY_CATEGORY,
  FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY,
  FETCH_SINGLE_TEMPLATE_BY_CATEGORY,
} from "./actionTypes";
import {
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  fetchTemplateSuccess,
  fetchTemplateFailure,
  deleteTemplateFailure,
  deleteTemplateSuccess,
  createTemplateFailure,
  createTemplateSuccess,
  updateTemplateFailure,
  updateTemplateSuccess,
  fetchTemplateCategoriesSuccess,
  fetchTemplateCategoriesFailure,
  fetchTemplateByCategorySuccess,
  fetchTemplateByCategoryFailure,
  fetchTemplateByCategoryAndSubCategorySuccess,
  fetchTemplateByCategoryAndSubCategoryFailure,
  fetchSingleTemplateByCategorySuccess,
  fetchSingleTemplateByCategoryFailure,
} from "./action";
import {
  createTemplate,
  deleteTemplateById,
  getTemplateById,
  updateTemplateById,
  getTemplates,
  getTemplateCategories,
  getTemplatesByCategory,
  getTemplatesByCategoryAndSubCategory,
} from "../../helpers/backend_helper.js";
import { toast } from "react-toastify";

function* workFetchTemplates(action) {
  try {
    const response = yield call(getTemplates, action.payload);
    yield put(fetchTemplatesSuccess(response.data));
  } catch (error) {
    yield put(fetchTemplatesFailure(error));
  }
}

function* workDeleteTemplate(action) {
  try {
    const response = yield call(deleteTemplateById, action.payload);
    yield put(deleteTemplateSuccess(action.payload));
  } catch (error) {
    yield put(deleteTemplateFailure(error));
  }
}

function* workCreateTemplate(action) {
  const { newTemplate, navigate, path } = action.payload;
  try {
    const response = yield call(createTemplate, newTemplate);
    yield put(createTemplateSuccess(response.data));
    toast.success("Template created successfully!");
    navigate(path);
  } catch (error) {
    yield put(createTemplateFailure(error));
  }
}

function* workUpdateTemplate(action) {
  const { templateId, updatedTemplate, navigate, path } = action.payload;
  try {
    const response = yield call(
      updateTemplateById,
      templateId,
      updatedTemplate
    );
    yield put(updateTemplateSuccess(response.data));
    toast.success("Template updated successfully!");
    navigate(path);
  } catch (error) {
    yield put(updateTemplateFailure(error));
  }
}

function* workFetchTemplate(action) {
  try {
    const response = yield call(getTemplateById, action.payload);
    yield put(fetchTemplateSuccess(response.data));
  } catch (error) {
    yield put(fetchTemplateFailure(error));
  }
}

function* workFetchTemplateCategories(action) {
  try {
    const response = yield call(getTemplateCategories);
    yield put(fetchTemplateCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchTemplateCategoriesFailure(error));
  }
}

function* workFetchTemplateByCategory(action) {
  try {
    const response = yield call(getTemplatesByCategory, action.payload);
    yield put(fetchTemplateByCategorySuccess(response.data));
  } catch (error) {
    yield put(fetchTemplateByCategoryFailure(error));
  }
}

function* workFetchSingleTemplateByCategory(action) {
  try {
    const { category, template } = action.payload;
    const response = yield call(getTemplatesByCategory, category);
    const data = response?.data?.filter((ob) => ob?.name === template) ?? [];
    yield put(fetchSingleTemplateByCategorySuccess(data));
  } catch (error) {
    yield put(fetchSingleTemplateByCategoryFailure(error));
  }
}

function* workFetchTemplateByCategorySubcategory(action) {
  try {
    const response = yield call(
      getTemplatesByCategoryAndSubCategory,
      action.payload.category,
      action.payload.subCategory
    );
    yield put(fetchTemplateByCategoryAndSubCategorySuccess(response.data));
  } catch (error) {
    yield put(fetchTemplateByCategoryAndSubCategoryFailure(error));
  }
}

export default function* watchFetchTemplatesSaga() {
  yield takeEvery(FETCH_TEMPLATES, workFetchTemplates);
  yield takeEvery(DELETE_TEMPLATE, workDeleteTemplate);
  yield takeEvery(CREATE_TEMPLATE, workCreateTemplate);
  yield takeEvery(UPDATE_TEMPLATE, workUpdateTemplate);
  yield takeEvery(FETCH_TEMPLATE, workFetchTemplate);
  yield takeEvery(FETCH_TEMPLATE_CATEGORIES, workFetchTemplateCategories);
  yield takeEvery(FETCH_TEMPLATE_BY_CATEGORY, workFetchTemplateByCategory);
  yield takeEvery(
    FETCH_SINGLE_TEMPLATE_BY_CATEGORY,
    workFetchSingleTemplateByCategory
  );
  yield takeEvery(
    FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY,
    workFetchTemplateByCategorySubcategory
  );
}
