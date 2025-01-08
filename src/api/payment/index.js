import callApi from "../callApi";
import {
  getList,
  getListSuccess,
  getListFail,
  confirmPayment,
  confirmPaymentSuccess,
  confirmPaymentFail

} from "../../states/modules/payment";

export const getListPayment = () => async (dispatch, getState) => {

  let path = `api/v1/tables/findTableByStatus?status=occupied`;
  return callApi({
    method: 'get',
    apiPath: path,
    actionTypes: [getList, getListSuccess, getListFail],
    variables: {},
    dispatch,
    getState
  })
}

export const handleConfirmPayment = (data) => async (dispatch, getState) => {
  return callApi({
    method: 'post',
    apiPath: `api/v1/orders`,
    actionTypes: [confirmPayment, confirmPaymentSuccess, confirmPaymentFail],  // Đảm bảo action này hợp lệ
    variables: data,  // Truyền data vào đây
    dispatch,
    getState
  });
};
