import { getCookie } from "./cookies.js";
import { post } from "./call.js";
export function checkLogin() {
    const refreshToken = getCookie('refreshToken');
    const accessToken = getCookie('accessToken');
    if(accessToken == null){
        post("/token/refresh",{
            username: getCookie("username"),
            refreshToken: refreshToken
        }).then(data => {
            setCookie('accessToken', data.accessToken, 15);
            setCookie('refreshToken', refreshToken, 14400);
            setCookie('username', username, 14400);
        })
    }
    return refreshToken !== null
}