import cookie from "js-cookie";

export function setCookie(key, value){
    cookie.set(key, value, {
        expires: 1
    }) 
}

export function removeCookie(key){
    cookie.remove(key, {
        expires: 1
    })
}

export function getCookie(key){
    return cookie.get(key)
}

export function setLocalStorage(key, value){
    localStorage.setItem(key, JSON.stringify(value))
}

export function removeLocalStorage(key){
    localStorage.removeItem(key)
}

export function authenticate(response, next){
    setCookie('token', response.data.token)
    setLocalStorage('user', JSON.stringify(response.data.user))
    next()
}

export function isAuth(){
    const checkCookie = getCookie('token')
    if(checkCookie){
        const readLS = localStorage.getItem('user')
        if(readLS){
            return JSON.parse(readLS)
        }
        return false;
    }
}

export function signout(next){
    removeCookie('token');
    removeLocalStorage('user');
    next();
}