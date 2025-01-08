import {
  all,
  fork,
  put,
  takeLatest,
  // call,
} from "redux-saga/effects";
import {
  setTitlePage
} from "../app";
import {
  getListTable, getListFood, 
} from "../../../api/table";
import {
  setErrorCreateOrUpdateTable,
  setErrorCreateOrUpdateBookingTable,
  setVisibleModalCreateOrUpdateTable,
  // setVisibleModalDeleteTable,
  createTableFail,
  createTableSuccess,
  // updateTableFail,
  updateTableSuccess,
  // deleteTableFail,
  // deleteTableSuccess,
  createBookingTableFail,
  createBookingTableSuccess,
  cancelBookingTableSuccess,
  setVisibleModalCancelBookingTable,
  setVisibleModalReceiveBookingTable,
  receiveBookingTableSuccess,
  setVisibleModalCreateOrUpdateBookingTable,
  confirmOrderSuccess,
  updateListOrderSuccess,
} from "./index";
import {
  getNotification
} from "../../../utils/helper";
// import _ from "lodash";

function* loadRouteData() {
  yield put(setTitlePage('Table Management'));

}

function* handleActions() {
  yield takeLatest(createTableSuccess, function* () {
    getNotification('success', 'Create Table success');
    yield put(setVisibleModalCreateOrUpdateTable(false));
    yield put(getListTable());
  });

  yield takeLatest(createTableFail, function* (action) {
    let status = action.payload.data.code;

    if (status === 409) {
      let errors = action.payload.data.message;

      yield put(setErrorCreateOrUpdateTable({
        number: errors,
      }));
    }
    getNotification('error', 'Create Table fail');
  });

  yield takeLatest(updateTableSuccess, function* () {
    getNotification('success', 'Update Table success');
    yield put(setVisibleModalCreateOrUpdateTable(false));
    yield put(getListTable());
  });

  // yield takeLatest(updateTableFail, function* (action) {
  //   let status = action.payload.data.code;
  //   if (status === 409) {
  //     let errors = action.payload.data.details;
  //     yield put(setErrorCreateOrUpdateTable({
  //       phone_number: _.get(errors, 'phone_number', ''),
  //     }));
  //   } else if (status === 403) {
  //     getNotification('error', "You don't have permission to access!");
  //   } else {
  //     getNotification('error', 'Update Table fail');
  //   }
  // });


  // yield takeLatest(deleteTableSuccess, function* () {
  //   getNotification('success', 'Delete Table success');
  //   yield put(setVisibleModalDeleteTable(false));
  //   yield put(getListTable());
  // });

  // yield takeLatest(deleteTableFail, function* () {
  //   yield call(getNotification, 'error', 'Failed to delete Table.');
  // });

  yield takeLatest(createBookingTableSuccess, function* () {
    getNotification('success', 'Create Booking Table success');
    yield put(setVisibleModalCreateOrUpdateBookingTable(false));
    yield put(getListTable());
  });

  yield takeLatest(createBookingTableFail, function* (action) {
    let status = action.payload.data.code;
    if (status === 409) {
      yield put(setErrorCreateOrUpdateBookingTable({
        listTable: 'The table is currently occupied',
      }));
    } else if (status === 403) {
      getNotification('error', "You don't have permission to access!");
    } else {
      getNotification('error', 'Create Booking Table fail');
    }
  });

  yield takeLatest(cancelBookingTableSuccess, function* () {
    getNotification('success', 'Cancel Booking Table success');
    yield put(setVisibleModalCancelBookingTable(false));
    yield put(getListTable());
  });

  yield takeLatest(receiveBookingTableSuccess, function* () {
    getNotification('success', 'Receive Booking Table success');
    yield put(setVisibleModalReceiveBookingTable(false));
    yield put(getListTable());
  });

  yield takeLatest(confirmOrderSuccess, function* () {
    getNotification('success', 'Confirm Order success');
    yield put(getListFood());
  });

  yield takeLatest(updateListOrderSuccess, function* () {
    getNotification('success', 'Update List Order success');
    yield put(getListFood());
  });
}



export default function* loadTableSaga() {
  yield all([
    fork(loadRouteData),
    fork(handleActions)
  ]);
}