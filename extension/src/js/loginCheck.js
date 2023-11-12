import { post } from "./call.js";
import { getCookie, setCookie } from "./cookies.js";

export const checkLogin = () => {
    const refreshToken = getCookie('refreshToken');
    const accessToken = getCookie('accessToken');
    const username = getCookie("username")
    if (accessToken == null && refreshToken !== null) {
        post("/token/refresh", {
            username: username,
            refreshToken: refreshToken
        }).then(({data}) => {
            if (data) {
                setCookie('accessToken', data.accessToken, 15);
                setCookie('refreshToken', refreshToken, 14400);
                setCookie('username', username, 14400);
            }
        })

    }
    return accessToken !== null
}