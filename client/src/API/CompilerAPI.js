const judge0url = new URL('https://judge0-ce.p.rapidapi.com/submissions');

/* Returns a token that must be checked later */
function compile(code, input) {
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': '7f13832be5msh57cbc1e9d2b3b96p1b1e04jsne51bf04c3d35',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        body: {
            language_id: 62, // language id for Java
            source_code: btoa(code),
            stdin: btoa(input),
        }
    };

    return new Promise((resolve, reject) => {
        fetch(new URL('?base64_encoded=true&fields=*', judge0url), options)
            .then((response) => {
                const token = response.data.token;
                resolve(token);
            })
            .catch((err) => {
                let status = err.response.status;
                if (status === 429) {
                    console.log("Maximum request a day reached", status);
                }
                reject({ error: err.toString() });
            });
    })

}

function checkStatus(token) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7f13832be5msh57cbc1e9d2b3b96p1b1e04jsne51bf04c3d35',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        }
    };

    return new Promise((resolve, reject) => {
        fetch(new URL("/" + token + "?base64_encoded=true&fields=*", judge0url), options)
            .then((response) => {
                let statusId = response.data.status?.id;
                if (statusId === 1 || statusId === 2) {
                    // still processing
                    setTimeout(() => {
                        resolve(checkStatus(token));
                    }, 2000);
                } else {
                    resolve(response.data);
                }
            }).catch((err) => {
                reject({ error: err.toString() });
            })
    })
}

const CompilerAPI = {
    compile, checkStatus
}

export default CompilerAPI;