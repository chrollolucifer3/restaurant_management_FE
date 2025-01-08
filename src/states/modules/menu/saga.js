import {
    all, fork, put, takeLatest, call
  } from "redux-saga/effects";
  import {setTitlePage} from "../app";
  import {
    getListMenu
  } from "../../../api/menu";
  import {
    setErrorCreateOrUpdateMenu,
    setVisibleModalCreateOrUpdateMenu,
    setVisibleModalDeleteMenu,
    createMenuFail, createMenuSuccess,
    updateMenuFail, updateMenuSuccess,
    deleteMenuFail, deleteMenuSuccess,
  } from "./index";
  import {getNotification} from "../../../utils/helper";
  import _ from "lodash";
  
  function* loadRouteData () {
    yield put(setTitlePage('Menu Management'));
  
  }
  
  function* handleActions () {
    yield takeLatest(createMenuSuccess, function* () {
      getNotification('success', 'Create Menu success');
      yield put(setVisibleModalCreateOrUpdateMenu(false));
      yield put(getListMenu());
    });
  
    yield takeLatest(createMenuFail, function* (action) {
      let status = action.payload.data.code;
  
      if (status === 409) {
        let errors = action.payload.data.message;
        
        yield put(setErrorCreateOrUpdateMenu({
          name: errors,
        }));
      }
      if (status === 422) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateMenu({
          name: _.get(errors, 'name', ''),
          price: _.get(errors, 'price', ''),
          description: _.get(errors, 'description', ''),
          unit_id: _.get(errors, 'unit_id', ''),
          category_id: _.get(errors, 'category_id', ''),
        }));
      }
      getNotification('error', 'Create Menu fail');
    });
  
    yield takeLatest(updateMenuSuccess, function* () {
      getNotification('success', 'Update Menu success');
      yield put(setVisibleModalCreateOrUpdateMenu(false));
      yield put(getListMenu());
    });
  
    yield takeLatest(updateMenuFail, function* (action) {
      let status = action.payload.data.code;
      if (status === 409) {
        let errors = action.payload.data.details;
        yield put(setErrorCreateOrUpdateMenu({
          phone_number: _.get(errors, 'phone_number', ''),
        }));
      } else if (status === 403) {
        getNotification('error', "You don't have permission to access!");
      } else {
        getNotification('error', 'Update Menu fail');
      }
    });
  
  
    yield takeLatest(deleteMenuSuccess, function* () {
      getNotification('success', 'Delete Menu success');
      yield put(setVisibleModalDeleteMenu(false));
      yield put(getListMenu());
    });
  
    yield takeLatest(deleteMenuFail, function* () {
      yield call(getNotification, 'error', 'Failed to delete Menu.');
    });
  
  }
  
  export default function* loadMenuSaga() {
    yield all([
      fork(loadRouteData),
      fork(handleActions)
    ]);
  }
  