import { ADD_TO_LIST, REMOVE_FROM_LIST, CLEAR_ALL_LIST, ADD_NEW_LIST } from './constants'



export const addToList = (data) => {
    return { type: ADD_TO_LIST, payload: data };
};

export const addNewToList = (data) => {
    return { type: ADD_NEW_LIST, payload: data };
};

export const removeFromList = (data) => {
    return { type: REMOVE_FROM_LIST, payload: data };
};

export const clearAllList = () => {
    return { type: CLEAR_ALL_LIST };
};

