const apiBaseUrl = window.location.origin + "/api/";

const requestFromApi = (callback, url, body = {}, method = 'GET') => {
    const request = new XMLHttpRequest();

    request.open(method, url);

    request.onload = () => {
        if (request.status == 200 || request.status == 201) {
            if (request.response) {
                const response = request.response;
                console.log("request response", response);
                callback(JSON.parse(response));
            } else {
                callback(null);
            }
        }
    }

    request.onerror = () => {
        console.log("On Error API Request")
        callback(null);
    }

    console.log("request obj > ", request);

    if (['PUT', 'POST'].includes(method)) {
        const csrftoken = Cookies.get('csrftoken');
        request.setRequestHeader("X-CSRFToken", csrftoken);
        request.setRequestHeader("Content-type", "application/json")
    }
    request.send(JSON.stringify(body));
}

const handleSavePatient = () => {
    const requestBody = {
        name: document.getElementById("patient-name").value,
        cell_phone: document.getElementById("patient-cell-phone").value,
        phone: document.getElementById("patient-phone").value,
        birth_date: document.getElementById("patient-birth-date").value
    };
    
    console.log(requestBody);

    requestFromApi(() => {
        window.alert("Paciente salvo com sucesso!")
        window.history.back()
    }, `${apiBaseUrl}pacientes/`, requestBody, 'POST')
}