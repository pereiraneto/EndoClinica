const handleChangeProcedureSelector = (doctorToSelect) => {
    const procedureId = document.getElementById("consultation-procedures").value
    document.getElementById("consultation-doctors").innerHTML = ''

    addTag(option => {
        option.textContent = '--------------'
    }, document.getElementById("consultation-doctors"), 'option');
    
    if (procedureId != 0) {
        document.getElementById("consultation-doctors").disabled = false
        requestFromApi(apiBaseUrl + "procedimentos/" + procedureId, consultation => {
            consultation.doctors.forEach(doctorId => {
                requestFromApi(apiBaseUrl + "medicos/" + doctorId, doctor => {
                    addTag(option => {
                        option.textContent = doctor.name;
                        option.value = doctor.id;
                        if (doctor.id == doctorToSelect) option.selected = true
                    }, document.getElementById("consultation-doctors"), 'option');
                });
            });
        })
    } else {
        document.getElementById("consultation-doctors").disabled = true
    }
}