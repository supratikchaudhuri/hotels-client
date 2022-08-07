import { USER_DETAILS_FAILURE, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_REGISTER_FAILURE, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT, USER_UPDATE_PROFILE_FAILURE, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_RESET, USER_UPDATE_PROFILE_SUCCESS, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAILURE, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAILURE, USER_UPDATE_PRIVILAGE_REQUEST, USER_UPDATE_PRIVILAGE_SUCCESS, USER_UPDATE_PRIVILAGE_FAILURE } from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAILURE:
            return {loading: false, error: action.payload};
        case USER_SIGNOUT:
            return {};
        default:
            return state;
    }
}

export const userRegisterReducer = (state={}, action) => {
    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_REGISTER_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDetailsReducer = (state={loading: true}, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return {loading: true};
        case USER_DETAILS_SUCCESS:
            return {loading: false, user: action.payload};
        case USER_DETAILS_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const updateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PROFILE_SUCCESS:
            return {loading: false, success: true};
        case USER_UPDATE_PROFILE_FAILURE:
            return {loading: false, error: action.payload};
        case USER_UPDATE_PROFILE_RESET:
            return {}; 
        default:
            return state;
    }
}

export const userListReducer = (state = {loading: true}, action) => {
    switch(action.type) {
        case USER_LIST_REQUEST:
            return {loading: true};
        case USER_LIST_SUCCESS:
            return {loading: false, users: action.payload};
        case USER_LIST_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_DELETE_REQUEST:
            return {loading: true};
        case USER_DELETE_SUCCESS:
            return {loading: false, success: action.payload};
        case USER_DELETE_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export const userUpdatePrevelageReducer = (state = {}, action) => {
    switch(action.type) {
        case USER_UPDATE_PRIVILAGE_REQUEST:
            return {loading: true};
        case USER_UPDATE_PRIVILAGE_SUCCESS:
            return {loading: false, success: action.payload};
        case USER_UPDATE_PRIVILAGE_FAILURE:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}