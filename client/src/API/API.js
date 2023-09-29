const API_URL = new URL('http://localhost:8081/API/'); 

function logIn(credentials) {
    // POST /API/login
    return new Promise((resolve, reject) => {
        fetch(new URL('login', API_URL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            })
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then(jwtToken => {
                        sessionStorage.setItem("jwtToken", jwtToken.access_token)
                        resolve()
                    })
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    });
            } else {
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch((err) => {
            reject({error: err.toString()})
        }); // connection errors
    });
}

function signUp(credentials) {
    // POST /API/login
    return new Promise((resolve, reject) => {
        fetch(new URL('signup', API_URL), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                name: credentials.name,
                surname: credentials.surname,
                course_id: credentials.course_id
            })
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then(() => resolve())
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    });
            } else {
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch(() => {
            reject({error: "Cannot communicate with the server."})
        }); // connection errors
    });
}
function getProfile(email) {
    // GET /API/profiles/{email}
    return new Promise((resolve, reject) => {
        fetch(new URL(`profiles/${email}`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((profile) => {
                        resolve(profile);
                    })
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    });
            } else {
                response.json()
                    .then((message) => {
                        reject(message);
                    }) // error message in the response body
                    .catch(() => {
                        reject({error: "Cannot parse server response."})
                    }); // something else
            }
        }).catch((err) => {
            reject({error: err.toString()})
        }); // connection errors
    });
}

const API = {
    logIn,
    signUp,
    getProfile
}

export default API;