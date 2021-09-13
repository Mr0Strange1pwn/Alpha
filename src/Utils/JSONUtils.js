import axios from "axios";

export const Post = (url, requestContent) => {
    return axios.post(url,requestContent)
}