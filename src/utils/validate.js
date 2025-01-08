import {
  isValidEmail,
  isValidPassword,
  isValidPhone
} from "./helper";
import _ from "lodash";

export const isValidate = (data, type, errors) => {
  let error = false
  let dataError = _.cloneDeep(errors);

  switch (type) {
    case 'name':
      if (data.name.length === 0) {
        dataError.name = 'Please complete this required field!';
        error = true;
      } else if (data.name.length > 200) {
        dataError.name = 'Maximum number of characters allowed: 200';
        error = true;
      } else {
        dataError.name = '';
      }
      break;
    case 'full_name':
      if (data.full_name.length === 0) {
        dataError.full_name = 'Please complete this required field!';
        error = true;
      } else if (data.full_name.length > 200) {
        dataError.full_name = 'Maximum number of characters allowed: 200';
        error = true;
      } else {
        dataError.full_name = '';
      }
      break;
    case 'email':
      if (data.email.length === 0) {
        dataError.email = 'Please complete this required field!';
        error = true;
      } else if (!isValidEmail(data.email)) {
        dataError.email = 'Invalid email format';
        error = true;
      } else if (data.email.length > 200) {
        dataError.email = 'Maximum number of characters allowed: 200';
        error = true;
      } else {
        dataError.email = '';
      }
      break;
    case 'phone_number':
      if (data.phone_number.length === 0) {
        dataError.phone_number = 'Please complete this required field!';
        error = true;
      } else if (!isValidPhone(data.phone_number)) {
        dataError.phone_number = 'Please input 10-digit phone number';
        error = true;
      } else if (data.phone_number.length > 200) {
        dataError.phone_number = 'Maximum number of characters allowed: 200';
        error = true;
      } else {
        dataError.phone_number = '';
      }
      break;
    case 'address':
      if (data.address.length === 0) {
        dataError.address = 'Please complete this required field!';
        error = true;
      } else if (data.address.length > 500) {
        dataError.address = 'Maximum number of characters allowed: 500';
        error = true;
      } else {
        dataError.address = '';
      }
      break;
    case 'currentPassword':
      if (data.currentPassword.length === 0) {
        dataError.currentPassword = 'Please complete this required field!';
        error = true;
      } else if (!isValidPassword(data.currentPassword)) {
        dataError.currentPassword = "Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters."
        error = true
      } else {
        dataError.currentPassword = '';
      }
      break;
    case 'password':
      if (data.password.length === 0) {
        dataError.password = 'Please complete this required field!';
        error = true;
      } else if (!isValidPassword(data.password)) {
        dataError.password = "Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters."
        error = true
      } else {
        dataError.password = '';
      }
      break;
    case 'passwordOld':
      if (data.passwordOld.length === 0) {
        dataError.passwordOld = 'Please complete this required field!';
        error = true;
      } else if (!isValidPassword(data.passwordOld)) {
        dataError.passwordOld = "Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters."
        error = true
      } else {
        dataError.passwordOld = '';
      }
      break;
    case 'passwordNew':
      if (data.passwordNew.length === 0) {
        dataError.passwordNew = 'Please complete this required field!';
        error = true;
      } else if (!isValidPassword(data.passwordNew)) {
        dataError.passwordNew = "Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters."
        error = true
      } else {
        dataError.passwordNew = '';
      }
      break;
      // case 'confirmPassword':
      //   if (data.confirmPassword.length === 0) {
      //     dataError.confirmPassword = 'Please complete this required field!';
      //     error = true;
      //   } else if (data.password && data.confirmPassword !== data.password) {
      //     dataError.confirmPassword = 'Passwords do not match. Please try again.'
      //     error = true
      //   } else {
      //     dataError.confirmPassword = '';
      //   }
      //   break;
    case 'position':
      if (data.position.length === 0) {
        dataError.position = 'Please complete this required field!';
        error = true;
      } else if (data.position.length > 200) {
        dataError.position = 'Maximum number of characters allowed: 200';
        error = true;
      } else {
        dataError.position = '';
      }
      break;
    case 'username':
      if (data.username.length === 0) {
        dataError.username = 'Please complete this required field!';
        error = true;
      } else if (data.username.length > 200) {
        dataError.username = 'Maximum number of characters allowed: 200';
        error = true;
      } else if (!/[a-zA-Z]/.test(data.username) || !/[0-9]/.test(data.username)) {
        dataError.username = 'Username must contain both letters and numbers';
        error = true;
        dataError.username = 'Username must be at least 6 characters';
        error = true;
      } else {
        dataError.username = '';
      }
      break;
    case 'roleName':
      if (data.roleName === '') {
        dataError.roleName = 'Please complete this required field!';
        error = true;
      } else {
        dataError.roleName = '';
      }
      break;
    case 'description':
      if (data.description.length === 0) {
        dataError.description = 'Please complete this required field!';
        error = true;
      } else if (data.description.length > 500) {
        dataError.description = 'Maximum number of characters allowed: 500';
        error = true;
      } else {
        dataError.description = '';
      }
      break;
    case 'price':
      if (data.price.length === 0) {
        dataError.price = 'Please complete this required field!';
        error = true;
      } else if (data.price < 0) {
        dataError.price = 'Price must be greater than 0';
        error = true;
      } else if (!Number.isInteger(Number(data.price))) {
        dataError.price = 'Price must be an integer';
        error = true;
      } else {
        dataError.price = '';
      }
      break;
    case 'category_id':
      if (data.category_id === '') {
        dataError.category_id = 'Please complete this required field!';
        error = true;
      } else {
        dataError.category_id = '';
      }
      break;
    case 'unit_id':
      if (data.unit_id === '') {
        dataError.unit_id = 'Please complete this required field!';
        error = true;
      } else {
        dataError.unit_id = '';
      }
      break;
    case 'number':
      if (data.number.length === 0) {
        dataError.number = 'Please complete this required field!';
        error = true;
      } else if (data.number < 0) {
        dataError.number = 'Number must be greater than 0';
        error = true;
      } else if (!Number.isInteger(Number(data.number))) {
        dataError.number = 'Number must be an integer';
        error = true;
      } else {
        dataError.number = '';
      }
      break;
    case 'seat_number':
      if (data.seat_number.length === 0) {
        dataError.seat_number = 'Please complete this required field!';
        error = true;
      } else if (data.seat_number < 1) {
        dataError.seat_number = 'Seat number must be greater than 1';
        error = true;
      } else if (!Number.isInteger(Number(data.seat_number))) {
        dataError.seat_number = 'Seat number must be an integer';
        error = true;
      } else {
        dataError.seat_number = '';
      }
      break;
    case 'code':
      if (data.code.length === 0) {
        dataError.code = 'Please complete this required field!';
        error = true;
      } else {
        dataError.code = '';
      }
      break;
    case 'discount_amount':
      if (data.discount_amount.length === 0) {
        dataError.discount_amount = 'Please complete this required field!';
        error = true;
      } else if (data.discount_amount < 0) {
        dataError.discount_amount = 'Discount amount must be greater than 0';
        error = true;
      } else if (!Number.isInteger(Number(data.discount_amount))) {
        dataError.discount_amount = 'Discount amount must be an integer';
        error = true;
      } else {
        dataError.discount_amount = '';
      }
      break;
    case 'discount_type':
      if (data.discount_type === '') {
        dataError.discount_type = 'Please complete this required field!';
        error = true;
      } else {
        dataError.discount_type = '';
      }
      break;
    case 'min_order_value':
      if (data.min_order_value.length === 0) {
        dataError.min_order_value = 'Please complete this required field!';
        error = true;
      } else if (data.min_order_value < 0) {
        dataError.min_order_value = 'Min order value must be greater than 0';
        error = true;
      } else if (!Number.isInteger(Number(data.min_order_value))) {
        dataError.min_order_value = 'Min order value must be an integer';
        error = true;
      } else {
        dataError.min_order_value = '';
      }
      break;
    case 'total_money_spent':
      if (data.total_money_spent.length === 0) {
        dataError.total_money_spent = 'Please complete this required field!';
        error = true;
      } else if (data.total_money_spent < 0) {
        dataError.total_money_spent = 'Total money spent must be greater than 0';
        error = true;
      } else if (!Number.isInteger(Number(data.total_money_spent))) {
        dataError.total_money_spent = 'Total money spent must be an integer';
        error = true;
      } else {
        dataError.total_money_spent = '';
      }
      break;
    case 'listTable':
      if (data.listTable.length === 0) {
        dataError.listTable = 'Please complete this required field!';
        error = true;
      } else {
        dataError.listTable = '';
      }
      break;
    case 'customer_name':
      if (data.customer_name.length === 0) {
        dataError.customer_name = 'Please complete this required field!';
        error = true;
      } else {
        dataError.customer_name = '';
      }
      break;
    case 'type_booking':
      if (data.type_booking.length === 0) {
        dataError.type_booking = 'Please complete this required field!';
        error = true;
      } else {
        dataError.type_booking = '';
      }
      break;
    case 'time_reserved':
      if (data.time_reserved === null) {
        dataError.time_reserved = 'Please complete this required field!';
        error = true;
      } else {
        dataError.time_reserved = '';
      }
      break;
  }

  return {
    isError: error,
    error: dataError,
  }
}