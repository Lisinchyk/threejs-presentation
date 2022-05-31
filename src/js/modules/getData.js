'use strict';

const axios = require('axios').default;

export const getData = (url) => {
    try {
        return axios.get(url);
    } catch (error) {
        console.error(error);
    }
}