import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    totalEmployee: 0,
    isLoadingTableEmployee: false,
    paginationListEmployee: {
      currentPage: 1,
      perPage: 10,
      totalPage: 1,
      totalRecord: 0,
    },
    allRole: [],
    visibleModalCreateOrUpdateEmployee: false,
    isLoadingBtnCreateOrUpdateEmployee: false,
    visitableModalUpdateStatusEmployee: false,
    isLoadingBtnUpdateStatusEmployee: false,
    visibleModalDeleteEmployee: false,
    isLoadingBtnDeleteEmployee: false,
    
    errorCreateOrUpdateEmployee: {
      username: '',
      full_name: '',
      email: '',
      phone_number: '',
      address : '',
      position: '',
      password: '',
      roleName: '',
    },
  },
  reducers: {
    setErrorCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      errorCreateOrUpdateEmployee: action.payload
    }),
    setVisibleModalCreateOrUpdateEmployee: (state, action) => ({
      ...state,
      visibleModalCreateOrUpdateEmployee: action.payload
    }),
    setVisibleModalDeleteEmployee: (state, action) => ({
      ...state,
      visibleModalDeleteEmployee: action.payload
    }),
    setVisibleModalUpdateStatusEmployee: (state, action) => ({
      ...state,
      visibleModalUpdateStatusEmployee: action.payload
    }),
    getList: (state) => ({
      ...state,
      employees: [],
      totalEmployee: 0,
      isLoadingTableEmployee: true
    }),
    getListSuccess: (state, action) => ({
      ...state,
      isLoadingTableEmployee: false,
      employees: action.payload.metadata.listUser,
      totalEmployee: action.payload.metadata.total,
      paginationListEmployee: {
        currentPage: action.payload.metadata.page,
        perPage: action.payload.metadata.limit,
        totalPage: action.payload.metadata.totalPage,
        totalRecord: action.payload.metadata.total,
      },
    }),
    getListFail: (state) => ({
      ...state,
      employees: [],
      totalEmployee: 0,
      isLoadingTableEmployee: false
    }),
    getAllRole: (state) => ({...state}),
    getAllRoleSuccess: (state, action) => ({
      ...state,
      allRole: action.payload.data,
    }),
    getAllRoleFail: (state) => ({...state}),
    createEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true
    }),
    createEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    createEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    updateEmployee: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: true
    }),
    updateEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    updateEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnCreateOrUpdateEmployee: false
    }),
    deleteEmployee: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: true
    }),
    deleteEmployeeSuccess: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
    deleteEmployeeFail: (state) => ({
      ...state,
      isLoadingBtnDeleteEmployee: false
    }),
  }
})

export const {
  setErrorCreateOrUpdateEmployee,
  setVisibleModalDeleteEmployee,
  setVisibleModalCreateOrUpdateEmployee,
  setVisibleModalUpdateStatusEmployee,
  getList, getListSuccess, getListFail,
  getAllRole, getAllRoleSuccess, getAllRoleFail,
  createEmployee, createEmployeeSuccess, createEmployeeFail,
  updateEmployee, updateEmployeeSuccess, updateEmployeeFail,
  deleteEmployee, deleteEmployeeSuccess, deleteEmployeeFail,
} = employeeSlice.actions

export default employeeSlice.reducer;
