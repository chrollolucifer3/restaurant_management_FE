import callApi from "api/callApi";

import {
    getList, getListSuccess, getListFail,
    createCategory, createCategorySuccess, createCategoryFail,
    updateCategory, updateCategorySuccess, updateCategoryFail,
    getListFoodByCategoryId, getListFoodByCategoryIdSuccess, getListFoodByCategoryIdFail
} from "states/modules/category";

export const getListCategory = (dataFilter = { 
    perPage : 10,
    page : 1
}) => async (dispatch, getState) => {
    let path = `api/v1/foodCategories/getAll?limit=${dataFilter.perPage}&page=${dataFilter.page}`;
    if (dataFilter.keySearch) {
        path += `&keyword=${dataFilter.keySearch}`;
    }
    if (dataFilter.order && dataFilter.column) {
        path += `&orderBy=${dataFilter.order}&sortBy=${dataFilter.column}`;
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

export const handleCreateCategory = (data) => async (dispatch, getState) => {
    return callApi({
        method: 'post',
        apiPath: `api/v1/foodCategories`,
        actionTypes: [createCategory, createCategorySuccess, createCategoryFail],
        variables: data,
        dispatch,
        getState
    })
}

export const handleUpdateCategory = (data, idCategory) => async (dispatch, getState) => {    
    return callApi({
        method: 'patch',
        apiPath: `api/v1/foodCategories/${idCategory}`,
        actionTypes: [updateCategory, updateCategorySuccess, updateCategoryFail],
        variables: data,
        dispatch,
        getState
    })
}

export const getListFoodByCategory = (idCategory) => async (dispatch, getState) => {
    console.log("Calling getListFoodByCategory with ID:", idCategory);
    return callApi({
        method: 'get',
        apiPath: `api/v1/foodCategories/${idCategory}`,
        actionTypes: [getListFoodByCategoryId, getListFoodByCategoryIdSuccess, getListFoodByCategoryIdFail],
        variables: {},
        dispatch,
        getState
    })
}
