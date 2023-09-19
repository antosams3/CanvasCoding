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
                    return response.json(); // Estrai il JSON dalla risposta
                } else {
                    console.log(response);
                    throw new Error('Errore nella risposta dell\'API');
                }
            })
            .then((data) => {
                const token = data.token;
                resolve(token);
            })
            .catch((err) => {
                console.error(err);
                let status = err.response ? err.response.status : 'Nessuna risposta disponibile';
                if (status === 429) {
                    console.log('Hai raggiunto il limite massimo delle richieste al giorno', status);
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
                    return response.json(); // Estrai il JSON dalla risposta
                } else {
                    console.log(response);
                    throw new Error('Errore nella risposta');
                }
            })
            .then((data) => {
                let statusId = data.status?.id;
                if (statusId === 1 || statusId === 2) {
                    // Ancora in elaborazione, attendi 2 secondi e controlla di nuovo lo stato
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