const apiBaseUrl = window.location.origin + "/api/";

const handleSavePatient = (patientId) => {

    const consultationInputs = document.getElementsByClassName("consultation-input")

    for(let i = 0; i < consultationInputs.length; i++) {
        const consultationInput = consultationInputs[i]

        if (consultationInput.className.indexOf("is-invalid") != -1) {
            consultationInput.className = consultationInput.className.replace("is-invalid", "")
        }
    }

    const requestBody = {
        name: document.getElementById("patient-name").value,
        cell_phone: document.getElementById("patient-cell-phone").value,
        phone: document.getElementById("patient-phone").value,
        birth_date: document.getElementById("patient-birth-date").value,
        email: document.getElementById("patient-email").value,
        marital_status: document.getElementById("patient-maritualstate").value,
        gender: document.getElementById("patient-gender").value,
        job: document.getElementById("patient-job").value,
        insurance: document.getElementById("patient-insurance").value,
        insurance_number: document.getElementById("patient-insurancenumber").value,
        cpf: document.getElementById("patient-cpf").value,
        rg: document.getElementById("patient-rg").value,
        address: document.getElementById("patient-address").value,
        neighborhood: document.getElementById("patient-neighborhood").value,
        city: document.getElementById("patient-city").value,
        notes: document.getElementById("patient-notes").value,
        allergies: document.getElementById("patient-allergies").value
    };    

    if (patientId == undefined) {
        requestFromApi(`${apiBaseUrl}pacientes/`, response => {
            if (response == null)
                window.alert("Paciente salvo sem sucesso!")
            else {
                window.alert("Paciente salvo com sucesso!")
                window.history.back()
            }
        }, response => {
            console.log("bad request!", response)

            const possibleWrongInputs = [
                {modelField: "birth_date", elementId: "patient-birth-date"},
                {modelField: "name", elementId: "patient-name"},
            ]

            possibleWrongInputs.forEach(pwi => {
                if (response[pwi.modelField] !== undefined)
                    document.getElementById(pwi.elementId).className = "form-control consultation-input is-invalid"
            });
        }, requestBody, 'POST')
    } else {
        requestFromApi(`${apiBaseUrl}pacientes/${patientId}/`, response => {
            if (response == null)
                window.alert("Paciente atualizado SEM sucesso!")
            else {
                window.alert("Paciente atualizado com sucesso!")
                window.history.back()
            }
        }, undefined, requestBody, 'PUT')
    }
}

const deletePatient = patientId => {

    requestFromApi(`${apiBaseUrl}pacientes/${patientId}/`, response => {
        if (response == null) {
            window.alert("Paciente deletado SEM sucesso!")
        } else {
            window.alert("Paciente deletado com sucesso!")
            window.history.back()
        }
    }, undefined, undefined, 'DELETE')
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        const isEditionPage = document.getElementById('page-title').innerText == 'Editar paciente'

        if (isEditionPage) {
            requestFromApi(`${apiBaseUrl}pacientes/${patientId}/`, patient => {
                document.getElementById("patient-name").value = patient.name
                document.getElementById("patient-cell-phone").value = patient.cell_phone
                document.getElementById("patient-phone").value = patient.phone
                document.getElementById("patient-birth-date").value = patient.birth_date
                document.getElementById("patient-email").value = patient.email
                document.getElementById("patient-maritualstate").value = patient.marital_status
                document.getElementById("patient-gender").value = patient.gender
                document.getElementById("patient-job").value = patient.job
                document.getElementById("patient-insurance").value = patient.insurance
                document.getElementById("patient-insurancenumber").value = patient.insurance_number
                document.getElementById("patient-cpf").value = patient.cpf
                document.getElementById("patient-rg").value = patient.rg
                document.getElementById("patient-address").value = patient.address
                document.getElementById("patient-neighborhood").value = patient.neighborhood
                document.getElementById("patient-city").value = patient.city
                document.getElementById("patient-notes").value = patient.notes
                document.getElementById("patient-allergies").value = patient.allergies
            })
        }
    }
}