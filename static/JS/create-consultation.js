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

    if (['PUT', 'POST'].includes(method)) {
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

const handleChangeProcedureSelector = () => {
    const procedureId = document.getElementById("consultation-procedures").value
    document.getElementById("consultation-doctors").innerHTML = ''
    if (procedureId != 0) {
        document.getElementById("consultation-doctors").disabled = false
        requestFromApi( consultation => {
            consultation.doctors.forEach(doctorId => {
                console.log("MEDIQUINHO", doctorId)
                requestFromApi(doctor => {
                    addTag(option => {
                        option.textContent = doctor.name;
                        option.value = doctor.id;
                    }, document.getElementById("consultation-doctors"), 'option');
                }, baseUrl + "medicos/" + doctorId);
            });
        }, baseUrl + "procedimentos/" + procedureId)
    } else {
        document.getElementById("consultation-doctors").disabled = true
    }
}

const handleSaveConsultation = () => {
    let consultationStatus;

    document.getElementsByName("statusOptions").forEach(option => {
        if (option.checked) {
            console.log("Status", option.value, option)
            consultationStatus = option.value;
        }
    });

    const requestBody = {
        status: consultationStatus,
        date: `${document.getElementById("consultation-date").value}T${document.getElementById("consultation-hour").value}:00Z`,
        duration: document.getElementById("consultation-duration").value,
        priority: document.getElementById("consultation-priority").value,
        prepare: document.getElementById("consultation-prepare").value,
        insurance: document.getElementById("consultation-insurance").value,
        cell_phone: document.getElementById("consultation-cell-phone").value,
        phone: document.getElementById("consultation-phone").value,
        birth_date: document.getElementById("consultation-birth-date").value,
        doctor: document.getElementById("consultation-doctors").value,
        procedure: document.getElementById("consultation-procedures").value,
        details: document.getElementById("consultation-details").value,
        requester: document.getElementById("consultation-requester").value,
        patient: document.getElementById("consultation-patients").value
    };
    
    console.log(requestBody);

    requestFromApi(() => {
        window.alert("Consulta salva com sucesso!")
        window.location.href='/'
    }, `${baseUrl}consultas/`, requestBody, 'POST');
}

document.onreadystatechange = () => {
    if (!window.indexedDB) {
        window.alert("Atualize seu navegador para usar este site.");
    }
    if (document.readyState == "interactive") {
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
    }
}
