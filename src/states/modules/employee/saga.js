import {
  all, fork, put, takeLatest, call
} from "redux-saga/effects";
import {setTitlePage} from "../app";
import {
  getListEmployee
} from "../../../api/employee";
import {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  createEmployeeFail, createEmployeeSuccess,
  updateEmployeeFail, updateEmployeeSuccess,
  deleteEmployeeFail, deleteEmployeeSuccess,
} from "./index";
import {getNotification} from "../../../utils/helper";
import _ from "lodash";

function* loadRouteData () {
  yield put(setTitlePage('User Management'));

}

function* handleActions () {
  yield takeLatest(createEmployeeSuccess, function* () {
    getNotification('success', 'Create employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(createEmployeeFail, function* (action) {
    let status = action.payload.data.code;

    if (status === 409) {
      let errors = action.payload.data.details;
      
      yield put(setErrorCreateOrUpdateEmployee({
        username: _.get(errors, 'username', ''),
        name: _.get(errors, 'full_name', ''),
        email: _.get(errors, 'email', ''),
        phone: _.get(errors, 'phone_number', ''),
        password: _.get(errors, 'password', ''),
      }));
    }
    getNotification('error', 'Create employee fail');
  });

  yield takeLatest(updateEmployeeSuccess, function* () {
    getNotification('success', 'Update employee success');
    yield put(setVisibleModalCreateOrUpdateEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(updateEmployeeFail, function* (action) {
    let status = action.payload.data.code;
    if (status === 409) {
      let errors = action.payload.data.details;
      yield put(setErrorCreateOrUpdateEmployee({
        name: _.get(errors, 'full_name', ''),
        phone: _.get(errors, 'phone_number', ''),
      }));
    } else if (status === 403) {
      getNotification('error', "You don't have permission to access!");
    } else {
      getNotification('error', 'Update employee fail');
    }
  });


  yield takeLatest(deleteEmployeeSuccess, function* () {
    getNotification('success', 'Delete employee success');
    yield put(setVisibleModalDeleteEmployee(false));
    yield put(getListEmployee());
  });

  yield takeLatest(deleteEmployeeFail, function* () {
    yield call(getNotification, 'error', 'Failed to delete employee.');
  });

}

export default function* loadEmployeeSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}
