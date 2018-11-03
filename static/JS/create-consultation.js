const baseUrl = window.location.origin + "/";

const addTag = (callback, parent, tag = "td") => {
    const newEl = document.createElement(tag);
    callback(newEl);
    parent.appendChild(newEl);
}

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

    if (['PUT'].includes(method)) {
        const csrftoken = Cookies.get('csrftoken');
        request.setRequestHeader("X-CSRFToken", csrftoken);
        request.setRequestHeader("Content-type", "application/json")
    }
    request.send(JSON.stringify(body));
}

const handleChangePatientSelector = () => {
    const patientId = document.getElementById("consultation-patients").value
    if (patientId != 0) {
        requestFromApi( patient => {
            document.getElementById("consultation-cell-phone").value = patient.cell_phone
            document.getElementById("consultation-phone").value = patient.phone
            document.getElementById("consultation-birth-date").value = patient.birth_date
        }, baseUrl + "pacientes/" + patientId)
    } else {
        document.getElementById("consultation-cell-phone").value = ""
        document.getElementById("consultation-phone").value = ""
        document.getElementById("consultation-birth-date").value = ""
    }
}

document.onreadystatechange = () => {
    if (!window.indexedDB) {
        window.alert("Atualize seu navegador para usar este site.");
    }
    if (document.readyState == "interactive") {
        requestFromApi(doctors => {
            doctors.forEach(doctor => {
                addTag(option => {
                    option.textContent = doctor.name;
                    option.value = doctor.id;
                }, document.getElementById("consultation-doctors"), 'option');
            });
            requestFromApi(procedures => {
                procedures.forEach(procedure => {
                    addTag(option => {
                        option.textContent = procedure.name;
                        option.value = procedure.id;
                    }, document.getElementById("consultation-procedures"), 'option');
                });
                requestFromApi(patients => {
                    patients.forEach(patient => {
                        addTag(option => {
                            option.textContent = patient.name;
                            option.value = patient.id;
                        }, document.getElementById("consultation-patients"), 'option');
                    });
                }, baseUrl + "pacientes/");
            }, baseUrl + "procedimentos/");
        }, baseUrl + "medicos/");
    }
}
