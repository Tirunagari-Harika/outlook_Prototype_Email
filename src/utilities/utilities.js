import { sessionstore } from "../store/sessionstore";

const isEmptyObject = (val) => {
    return Object.entries(val).length === 0 && val.constructor === Object;
}

const isEmptyArr = (val) => {
    return Object.entries(val).length === 0 && val.constructor === Array;
}

const stringifyVar = (res) => {
    if (res === null || res === undefined || res === "null" || res === "undefined") return '';
    return `${res}`;
}

const calculateSelection = (arr, key, val) => {
    if (!arr.length) return 0;
    let newArr = arr.filter((ele) => {
        return ele[key] === val;
    });
    return newArr.length;
}


const limitingChars = (str, limit) => {
    let newStr = stringifyVar(str);
    if (newStr.length > limit) {
        return `${newStr.substr(0, limit + 1)}...`;
    }
    return newStr;
}

const findEleIndex = (arr, key, val) => {
    if (arr && !isEmptyArr(arr)) {
        return arr.findIndex((ele) => {
            return ele[key] === val;
        });
    }
    return -1;
}

const getParseJson = (ssdata) => {
    let rdata = {};
    if (ssdata) {
        // ssdata - string to parse
        let len = ssdata.length;
        let idex = ssdata.indexOf("{}");
        // not empty {} to parse

        let bool = idex === -1 || idex > 0;
        if (len > 2 && bool) {
            let dd = JSON.parse(ssdata);
            return dd;
        }
    }
    return rdata;
}

const getParsedSessionData = (key) => {
    return getParseJson(sessionstore.get(key));
}

export default {
    isEmptyObject,
    calculateSelection,
    limitingChars,
    findEleIndex,
    isEmptyArr,
    getParseJson,
    getParsedSessionData,
    stringifyVar
}