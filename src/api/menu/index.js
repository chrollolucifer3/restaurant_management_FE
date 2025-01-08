import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  createMenu, createMenuSuccess, createMenuFail,
  updateMenu, updateMenuSuccess, updateMenuFail,
  deleteMenu, deleteMenuSuccess, deleteMenuFail,
} from "../../states/modules/menu";

export const getListMenu = (dataFilter = {
  perPage: 16,
  page: 1
}) => async (dispatch, getState) => {

  let path = `api/v1/foods/getAll?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

  if (dataFilter.keySearch) {
    path += `&keyword=${dataFilter.keySearch}`;
  }

  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateMenu = (data) => async (dispatch, getState) => {
  // console.log('data', data);
  
  return callApi({
    method: 'post',
    apiPath: `api/v1/foods`,
    actionTypes: [createMenu, createMenuSuccess, createMenuFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateMenu = (data, idMenu) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/foods/${idMenu}`,
    actionTypes: [updateMenu, updateMenuSuccess, updateMenuFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteMenu = (idMenu) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `api/v1/foods/${idMenu}`,
    actionTypes: [deleteMenu, deleteMenuSuccess, deleteMenuFail],
    variables: {},
    dispatch,
    getState
  })
}
