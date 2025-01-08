import {
    all, fork, put, takeLatest
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import {getNotification} from "../../../utils/helper";

  import {getListPayment} from "../../../api/payment";
  import {
    confirmPaymentSuccess,
    confirmPaymentFail,
    setVisibleModalShowListFood
  } from "./index";
//   import {getNotification} from "../../../utils/helper";
//   import _ from "lodash";
  
  function* loadRouteData () {
    yield put(setTitlePage('Payment Management'));
  
  }
  
  function* handleActions () {

    yield takeLatest(confirmPaymentSuccess, function* () {
      getNotification('success', 'Payment success');
      yield put(setVisibleModalShowListFood(false));
      yield put(getListPayment());
    });

    yield takeLatest(confirmPaymentFail, function () {
      getNotification('error', 'Payment fail');
    });
  
  }
  
  export default function* loadPaymentSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  