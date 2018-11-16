const apiBaseUrl = window.location.origin + "/api/";

const handleSavePatient = () => {
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
        notes: document.getElementById("patient-notes").value
    };
    
    console.log(requestBody);

    requestFromApi(() => {
        window.alert("Paciente salvo com sucesso!")
        window.history.back()
    }, `${apiBaseUrl}pacientes/`, requestBody, 'POST')
}