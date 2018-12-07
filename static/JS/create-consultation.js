const apiBaseUrl = window.location.origin + "/api/";

const handleChangePatientSelector = () => {
    const patientId = document.getElementById("consultation-patients").value
    if (patientId != 0) {
        requestFromApi(apiBaseUrl + "pacientes/" + patientId, patient => {
            document.getElementById("consultation-cell-phone").value = patient.cell_phone
            document.getElementById("consultation-phone").value = patient.phone
            document.getElementById("consultation-birth-date").value = patient.birth_date
            document.getElementById("consultation-insurance").value = patient.insurance
            document.getElementById("consultation-insurancenumber").value = patient.insurance_number
            document.getElementById("consultation-email").value = patient.email      
        })
    } else {
        document.getElementById("consultation-cell-phone").value = ""
        document.getElementById("consultation-phone").value = ""
        document.getElementById("consultation-birth-date").value = ""
        document.getElementById("consultation-insurance").value = ""
        document.getElementById("consultation-insurancenumber").value = ""
        document.getElementById("consultation-email").value = ""
    }
}

const handleChangeProcedureSelector = () => {
    const procedureId = document.getElementById("consultation-procedures").value
    document.getElementById("consultation-doctors").innerHTML = ''
    if (procedureId != 0) {
        document.getElementById("consultation-doctors").disabled = false
        requestFromApi(apiBaseUrl + "procedimentos/" + procedureId, consultation => {
            consultation.doctors.forEach(doctorId => {
                requestFromApi(apiBaseUrl + "medicos/" + doctorId, doctor => {
                    addTag(option => {
                        option.textContent = doctor.name;
                        option.value = doctor.id;
                    }, document.getElementById("consultation-doctors"), 'option');
                });
            });
        })
    } else {
        document.getElementById("consultation-doctors").disabled = true
    }
}

const handleSaveConsultation = () => {

    const consultationInputs = document.getElementsByClassName("consultation-input")

    for(let i = 0; i < consultationInputs.length; i++) {
        const consultationInput = consultationInputs[i]

        if (consultationInput.className.indexOf("is-invalid") != -1) {
            consultationInput.className = consultationInput.className.replace("is-invalid", "")
        }
    }

    let consultationStatus;

    document.getElementsByName("statusOptions").forEach(option => {
        if (option.checked) {
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
        insurance_number: document.getElementById("consultation-insurancenumber").value,
        cell_phone: document.getElementById("consultation-cell-phone").value,
        phone: document.getElementById("consultation-phone").value,
        email: document.getElementById("consultation-email").value,
        birth_date: document.getElementById("consultation-birth-date").value,
        doctor: document.getElementById("consultation-doctors").value,
        procedure: document.getElementById("consultation-procedures").value,
        details: document.getElementById("consultation-details").value,
        requester: document.getElementById("consultation-requester").value,
        patient: document.getElementById("consultation-patients").value
    };

    requestFromApi(`${apiBaseUrl}consultas/`, () => {
        window.alert("Consulta salva com sucesso!")
        window.location.href='/'
    }, (response) => {
        console.log("bad request!", response)

        const possibleWrongInputs = [
            {modelField: "birth_date", elementId: "consultation-birth-date"},
            {modelField: "date", elementId: "consultation-date"},
            {modelField: "date", elementId: "consultation-hour"},
            {modelField: "doctor", elementId: "consultation-doctors"},
            {modelField: "insurance", elementId: "consultation-insurance"},
            {modelField: "patient", elementId: "consultation-patients"},
            {modelField: "procedure", elementId: "consultation-procedures"},
        ]

        possibleWrongInputs.forEach(pwi => {
            if (response[pwi.modelField] !== undefined)
                document.getElementById(pwi.elementId).className = "form-control consultation-input is-invalid"
        });

    }, requestBody, 'POST');
}

document.onreadystatechange = () => {
    if (!window.indexedDB) {
        window.alert("Atualize seu navegador para usar este site.");
    }
    if (document.readyState == "interactive") {
        requestFromApi(apiBaseUrl + "pacientes/", patients => {
            patients.forEach(patient => {
                addTag(option => {
                    option.textContent = patient.name;
                    option.value = patient.id;
                }, document.getElementById("consultation-patients"), 'option');
            });
            if (!document.getElementById("consultation-doctors").hasChildNodes()) {
                requestFromApi(apiBaseUrl + "procedimentos/", procedures => {
                    procedures.forEach(procedure => {
                        addTag(option => {
                            option.textContent = procedure.name;
                            option.value = procedure.id;
                        }, document.getElementById("consultation-procedures"), 'option');
                    });
                });
            }
        });
    }
}
