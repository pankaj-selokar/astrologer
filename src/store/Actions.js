// src/store/actions.js
export const ADD_ASTROLOGER = 'ADD_ASTROLOGER';
export const DELETE_ASTROLOGER = 'DELETE_ASTROLOGER';
export const UPDATE_ASTROLOGER = 'UPDATE_ASTROLOGER';
export const FETCH_ASTROLOGER = 'FETCH_ASTROLOGER';

export const addRecord = (record) => ({
    type: ADD_ASTROLOGER,
    payload: record
});

export const deleteRecord = (id) => ({
    type: DELETE_ASTROLOGER,
    payload: id
});

export const updateRecord = (record) => ({
    type: UPDATE_ASTROLOGER,
    payload: record
});

export const fetchRecords = (records) => ({
    type: FETCH_ASTROLOGER,
    payload: records
});



