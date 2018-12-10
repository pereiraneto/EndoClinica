const fillConsultationHistoryTable = (tableBody, consultations) => {
    tableBody.innerHTML = '';

    consultations.forEach(consultation => addTag(rowEl => {
        addTag(th => {
            th.scope = "row";
            const date = `${consultation.date.slice(8,10)}/${consultation.date.slice(5,7)}`;
            const hour = `${consultation.date.slice(11,13)}h${consultation.date.slice(14,16)}`;
            th.textContent = `${date} - ${hour}`;
        }, rowEl, "th");
        addTag(td => td.textContent = consultation.procedureName, rowEl);
        addTag(td => {
            addTag(a => {
                a.textContent = "Editar";
                a.classList += "default-link mr-2";
                a.onclick = () => handleClickInfoModal(consultation);
            }, td, "a");
        }, rowEl);
    }, tableBody, "tr"));
}

const baseApiUrl = window.location.origin+'/api/'

document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        filterPatient(patientId)

        requestFromApi(`${baseApiUrl}fichas-medicas/${medicalRecordId}/`, medicalRecord => {
            medicalRecord.anamneses.forEach(anamneseId => {
                requestFromApi(baseApiUrl+'anamneses/'+anamneseId, anamnese => {
                    console.log('nhe > ', anamnese);
                })
            })
        })
    }
}