import callApi from "../callApi";
import {
  getList, getListSuccess, getListFail,
  createTable, createTableSuccess, createTableFail,
  updateTable, updateTableSuccess, updateTableFail,
  deleteTable, deleteTableSuccess, deleteTableFail,
  createBookingTable, createBookingTableSuccess, createBookingTableFail,
  updateBookingTable, updateBookingTableSuccess, updateBookingTableFail,
  cancelBookingTable, cancelBookingTableSuccess, cancelBookingTableFail,
  receiveBookingTable, receiveBookingTableSuccess, receiveBookingTableFail,
  confirmOrder, confirmOrderSuccess, confirmOrderFail,
  getListOrder, getListOrderSuccess, getListOrderFail,
  updateListOrder, updateListOrderSuccess, updateListOrderFail

} from "../../states/modules/table";


export const getListTable = (dataFilter = {
  perPage: 10,
  page: 1
}) => async (dispatch, getState) => {

  let path = `api/v1/tables?limit=${dataFilter.perPage}&page=${dataFilter.page}`;

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

export const handleCreateTable = (data) => async (dispatch, getState) => {
  // console.log('data', data);
  
  return callApi({
    method: 'post',
    apiPath: `api/v1/Tables`,
    actionTypes: [createTable, createTableSuccess, createTableFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateTable = (data, idTable) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/Tables/${idTable}`,
    actionTypes: [updateTable, updateTableSuccess, updateTableFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleDeleteTable = (idTable) => async (dispatch, getState) => {
  return callApi({
    method: 'delete',
    apiPath: `api/v1/Tables/${idTable}`,
    actionTypes: [deleteTable, deleteTableSuccess, deleteTableFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleCreateBookingTable = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/tables/bookingTable`,
    actionTypes: [createBookingTable, createBookingTableSuccess, createBookingTableFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleUpdateBookingTable = (data, idBookingTable) => async (dispatch, getState) => {
  return callApi({
    method: 'patch',
    apiPath: `api/v1/tables/bookingTable/${idBookingTable}`,
    actionTypes: [updateBookingTable, updateBookingTableSuccess, updateBookingTableFail],
    variables: data,
    dispatch,
    getState
  })
}

export const handleCancelBookingTable = (idBookingTable) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/tables/cancelTable`,
    actionTypes: [cancelBookingTable, cancelBookingTableSuccess, cancelBookingTableFail],
    variables:  idBookingTable ,
    dispatch,
    getState
  })
}

export const handleReceiveBookingTable = (idBookingTable) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/tables/customerReceiveTable`,
    actionTypes: [receiveBookingTable, receiveBookingTableSuccess, receiveBookingTableFail],
    variables:  idBookingTable ,
    dispatch,
    getState
  })
}

export const handleConfirmOrder = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/tables/orderFoodByTable`,
    actionTypes: [confirmOrder, confirmOrderSuccess, confirmOrderFail],
    variables:  data,
    dispatch,
    getState
  })
}

export const getListFood = (listTableId) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/tables/getListFoodByTable`,
    actionTypes: [getListOrder, getListOrderSuccess, getListOrderFail],
    variables: listTableId,
    dispatch, 
    getState
  })
}

export const updateListFoodOrder = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/tables/updateFoodTable`,
    actionTypes: [updateListOrder, updateListOrderSuccess, updateListOrderFail],
    variables: data,
    dispatch,
    getState
  })
}