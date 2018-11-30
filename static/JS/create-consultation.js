const apiBaseUrl = window.location.origin + "/api/";

const handleChangePatientSelector = () => {
    const patientId = document.getElementById("consultation-patients").value
    if (patientId != 0) {
        requestFromApi( patient => {
            document.getElementById("consultation-cell-phone").value = patient.cell_phone
            document.getElementById("consultation-phone").value = patient.phone
            document.getElementById("consultation-birth-date").value = patient.birth_date
            document.getElementById("consultation-insurance").value = patient.insurance
            document.getElementById("consultation-insurancenumber").value = patient.insurance_number
            document.getElementById("consultation-email").value = patient.email      
        }, () => {console.log("bad request!")},apiBaseUrl + "pacientes/" + patientId)
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
        requestFromApi( consultation => {
            consultation.doctors.forEach(doctorId => {
                requestFromApi(doctor => {
                    addTag(option => {
                        option.textContent = doctor.name;
                        option.value = doctor.id;
                    }, document.getElementById("consultation-doctors"), 'option');
                }, () => {console.log("bad request!")}, apiBaseUrl + "medicos/" + doctorId);
            });
        }, () => {console.log("bad request!")}, apiBaseUrl + "procedimentos/" + procedureId)
    } else {
        document.getElementById("consultation-doctors").disabled = true
    }
}

const handleSaveConsultation = () => {
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

    requestFromApi(() => {
        window.alert("Consulta salva com sucesso!")
        window.location.href='/'
    }, (response) => {
        console.log("bad request!", response)

        // selecionar todos os inputs da requisição e remover o estilo de preechimento incorreto

        const consultationInputs = document.getElementsByClassName("consultation-input")

        consultationInputs.forEach(consultationInput => {
            while (consultationInput.className.indexOf("is-invalid") != -1) {
                consultationInput.className = consultationInput.className.replace("is-invalid", "")
            }
        });

        // selecionar todas as mensagens dos inputs de erro e esconder
        // marcar novos erros

    }, `${apiBaseUrl}consultas/`, requestBody, 'POST');
}

document.onreadystatechange = () => {
    if (!window.indexedDB) {
        window.alert("Atualize seu navegador para usar este site.");
    }
    if (document.readyState == "interactive") {
        requestFromApi(patients => {
            patients.forEach(patient => {
                addTag(option => {
                    option.textContent = patient.name;
                    option.value = patient.id;
                }, document.getElementById("consultation-patients"), 'option');
            });
            if (!document.getElementById("consultation-doctors").hasChildNodes()) {
                requestFromApi(procedures => {
                    procedures.forEach(procedure => {
                        addTag(option => {
                            option.textContent = procedure.name;
                            option.value = procedure.id;
                        }, document.getElementById("consultation-procedures"), 'option');
                    });
                }, () => {console.log("bad request!")}, apiBaseUrl + "procedimentos/");
            }
        }, () => {console.log("bad request!")}, apiBaseUrl + "pacientes/");
    }
}
