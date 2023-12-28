import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_TEMPLATES,
  DELETE_TEMPLATE,
  CREATE_TEMPLATE,
  UPDATE_TEMPLATE,
  FETCH_TEMPLATE,
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
} from "./action";
import {
  createTemplate,
  deleteTemplateById,
  getTemplateById,
  updateTemplateById
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
    const response = yield call(updateTemplateById, updatedTemplate, templateId);
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

export default function* watchFetchTemplatesSaga() {
  yield takeEvery(FETCH_TEMPLATES, workFetchTemplates);
  yield takeEvery(DELETE_TEMPLATE, workDeleteTemplate);
  yield takeEvery(CREATE_TEMPLATE, workCreateTemplate);
  yield takeEvery(UPDATE_TEMPLATE, workUpdateTemplate);
  yield takeEvery(FETCH_TEMPLATE, workFetchTemplate);
}
