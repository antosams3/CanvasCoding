function compile(code, input) {
    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_RAPID_API_URL}?base64_encoded=true&fields=*`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
                'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
            },
            body: JSON.stringify({
                language_id: 62,
                source_code: btoa(code),
                stdin: btoa(input),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    throw new Error('API internal error');
                }
            })
            .then((data) => {
                const token = data.token;
                resolve(token);
            })
            .catch((err) => {
                let status = err.response ? err.response.status : 'API internal error';
                if (status === 429) {
                    console.log('Max number of requests p day reached', status);
                }
                reject({ error: err.toString() });
            });
    });
}

function checkStatus(token) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        },
    };

    return new Promise((resolve, reject) => {
        fetch(`${process.env.REACT_APP_RAPID_API_URL}/${token}?base64_encoded=true&fields=*`, options)
            .then((response) => {
                if (response.ok) {
                    return response.json(); 
                } else {
                    console.log(response);
                    throw new Error('Errore nella risposta');
                }
            })
            .then((data) => {
                let statusId = data.status?.id;
                if (statusId === 1 || statusId === 2) { // Compiler pending, wait 2 secs and try again
                    setTimeout(() => {
                        resolve(checkStatus(token));
                    }, 2000);
                } else {
                    resolve(data);
                }
            })
            .catch((err) => {
                console.error(err);
                reject({ error: err.toString() });
            });
    });
}


const CompilerAPI = {
    compile, checkStatus
}

export default CompilerAPI;