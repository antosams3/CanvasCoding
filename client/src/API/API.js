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
function getProfile() {
    // GET /API/profiles/{email}
    return new Promise((resolve, reject) => {
        fetch(new URL(`profile`, API_URL), {
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
function getCurrentGameSession() {
    // GET /API/game_session/latest
    return new Promise((resolve, reject) => {
        fetch(new URL(`game_session/latest`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((game_session) => {
                        resolve(game_session);
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

function getStepById(id) {
    // GET /API/step/{id}
    return new Promise((resolve, reject) => {
        fetch(new URL(`step/${id}`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((step) => {
                        resolve(step);
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

function getLevelById(id) {
    // GET /API/step/{id}
    return new Promise((resolve, reject) => {
        fetch(new URL(`levels/${id}`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((level) => {
                        resolve(level);
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

function putCode(code, game_session) {
    // PUT /API/game_session/code
    
    return new Promise((resolve, reject) => {
        fetch(new URL(`game_session/code`, API_URL), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: game_session.id,
                code: code,
            })
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((game_session) => {
                        resolve(game_session);
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

function getStepsByLevelId(level_id) {
    // GET /API/steps/{level_id}
    return new Promise((resolve, reject) => {
        fetch(new URL(`steps/${level_id}`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((steps) => {
                        resolve(steps);
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

function putNextLevel(code,stepId) {
    // PUT /API/game_session/next
    
    return new Promise((resolve, reject) => {
        fetch(new URL(`game_session/next`, API_URL), {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken"),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                step_id: stepId
            })
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((game_session) => {
                        resolve(game_session);
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

function getPreviousLevel(stepId) {
    // GET /API/game_session/previous
    return new Promise((resolve, reject) => {
        fetch(new URL(`game_session/previous`, API_URL), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + sessionStorage.getItem("jwtToken")
            },
            body: JSON.stringify({
                step_id: stepId
            })
        }).then((response) => {
            if (response.ok) {
                response.json()
                    .then((gameSession) => {
                        resolve(gameSession);
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
    getProfile,
    getCurrentGameSession,
    getStepById,
    getLevelById,
    putCode,
    getStepsByLevelId,
    putNextLevel,
    getPreviousLevel
}

export default API;