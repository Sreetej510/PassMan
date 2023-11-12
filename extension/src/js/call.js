const backendURL = "https://localhost:3300"
export function post(path, body, authenticateToken = '') {
    return fetch(backendURL + path, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authenticateToken,
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
      })
      .then((data) => ({ data, err: null }))
      .catch((err) => ({ data: null, err: err.message }));
  }
  


export async function get(path, authenticateToken = '') {

    const res = await fetch(backendURL+path, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authenticateToken
        }
    })
    if(res.ok){
        return {data:await res.json(), err: null}
    }else{
        return {data:null, err: `error! Status: ${res.status}`}
    }
}