import axios from "axios";

const token = localStorage.getItem('token');
const URL = process.env.REACT_APP_API_URL;
async function httpGet(path: string, query?: any) {
    const url = URL + path;
    return await axios({
        method: 'GET',
        url: url,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            "Access-Control-Allow-Origin": "*",
        },
        params: query
    });
}

async function httpPost(path: string, body: any) {
    const url = URL + path;
    return await axios({
        method: 'POST',
        url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
}

async function httpPut(path: string, body: any) {
    const url = URL + path;
    return await axios({
        method: 'PUT',
        url,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        },
    });
}

export {
    httpGet,
    httpPost,
    httpPut,
};