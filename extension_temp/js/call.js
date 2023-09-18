const backendURL = "https://localhost:3000"

export async function post(path, body, authenticateToken = '') {
    var res = await fetch(backendURL+ path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authenticateToken
        },
        body: JSON.stringify(body)
    })
    return await res.json()
}


export function get(path, authenticateToken = '') {
    fetch(backendURL+path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authenticateToken
        },
    }).then(res => res.json()).then(data => {
        if(data){
            return data
        }
    })
}