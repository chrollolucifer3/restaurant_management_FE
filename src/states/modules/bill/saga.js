import {
    all, fork, put
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
//   import _ from "lodash";
//   import {
//     getListBill
//   } from "../../../api/bill";

  import {

  } from "./index";

//   import {getNotification} from "../../../utils/helper";
  
  function* loadRouteData () {
    yield put(setTitlePage('Bill Management'));
  }
  
  function* handleActions () {
   

}

  export default function* loadCategorySaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  