import {
    all, fork, put, takeLatest, call
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import {
    getListDiscount
  } from "../../../api/discount";
  import {
    setErrorCreateOrUpdateDiscount,
    setVisibleModalCreateOrUpdateDiscount,
    setVisibleModalDeleteDiscount,
    createDiscountFail, createDiscountSuccess,
    updateDiscountFail, updateDiscountSuccess,
    deleteDiscountFail, deleteDiscountSuccess,
  } from "./index";
  import {getNotification} from "../../../utils/helper";
  import _ from "lodash";
  
  function* loadRouteData () {
    yield put(setTitlePage('Discount Management'));
  
  }
  
  function* handleActions () {
    yield takeLatest(createDiscountSuccess, function* () {
      getNotification('success', 'Create Discount success');
      yield put(setVisibleModalCreateOrUpdateDiscount(false));
      yield put(getListDiscount());
    });
  
    yield takeLatest(createDiscountFail, function* (action) {
      let status = action.payload.data.code;
  
      if (status === 409) {
        let errors = action.payload.data.message;
        
        yield put(setErrorCreateOrUpdateDiscount({
          phone_number: errors,
        }));
      }
      getNotification('error', 'Create Discount fail');
    });
  
    yield takeLatest(updateDiscountSuccess, function* () {
      getNotification('success', 'Update Discount success');
      yield put(setVisibleModalCreateOrUpdateDiscount(false));
      yield put(getListDiscount());
    });
  
    yield takeLatest(updateDiscountFail, function* (action) {
      let status = action.payload.data.code;
      if (status === 409) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateDiscount({
          code: _.get(errors, 'code', ''),
          description: _.get(errors, 'description', ''),
          discount_type: _.get(errors, 'discount_type', ''),
          discount_amount: _.get(errors, 'discount_amount', ''),
          min_order_value: _.get(errors, 'min_order_value', ''),
          start_date: _.get(errors, 'start_date', ''),
          end_date: _.get(errors, 'end_date', ''),
          is_anniversary: _.get(errors, 'is_anniversary', ''),
          is_loyal_customer: _.get(errors, 'is_loyal_customer', ''),
          total_money_spent: _.get(errors, 'total_money_spent', ''),
        }));
      } else if (status === 403) {
        getNotification('error', "You don't have permission to access!");
      } else {
        getNotification('error', 'Update Discount fail');
      }
    });
  
  
    yield takeLatest(deleteDiscountSuccess, function* () {
      getNotification('success', 'Delete Discount success');
      yield put(setVisibleModalDeleteDiscount(false));
      yield put(getListDiscount());
    });
  
    yield takeLatest(deleteDiscountFail, function* () {
      yield call(getNotification, 'error', 'Failed to delete Discount.');
    });
  
  }
  
  export default function* loadDiscountSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  