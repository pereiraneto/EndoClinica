const apiBaseUrl = window.location.origin + "/api/";

const handleSavePatient = (patientId) => {

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

    console.log(requestBody)

    if (patientId == undefined) {
        requestFromApi(response => {
            if (response == null)
                window.alert("Paciente salvo sem sucesso!")
            else {
                window.alert("Paciente salvo com sucesso!")
                window.history.back()
            }
        }, `${apiBaseUrl}pacientes/`, requestBody, 'POST')
    } else {
        requestFromApi(response => {
            if (response == null)
                window.alert("Paciente atualizado SEM sucesso!")
            else {
                window.alert("Paciente atualizado com sucesso!")
                window.history.back()
            }
        }, `${apiBaseUrl}pacientes/${patientId}/`, requestBody, 'PUT')
    }
}

const deletePatient = patientId => {

    requestFromApi(response => {
        if (response == null) {
            window.alert("Paciente deletado SEM sucesso!")
        } else {
            window.alert("Paciente deletado com sucesso!")
            window.history.back()
        }
    }, `${apiBaseUrl}pacientes/${patientId}/`, null, 'DELETE')
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        const isEditionPage = document.getElementById('page-title').innerText == 'Editar paciente'

        if (isEditionPage) {
            requestFromApi(patient => {
                document.getElementById("patient-name").value = patient.name
                document.getElementById("patient-cell-phone").value = patient.cell_phone
                document.getElementById("patient-phone").value = patient.phone
                document.getElementById("patient-birth-date").value = patient.birth_date
                document.getElementById("patient-email").value = patient.email
                document.getElementById("patient-maritualstate").value = patient.maritual_state
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
            }, `${apiBaseUrl}pacientes/${patientId}/`)
        }
    }
}