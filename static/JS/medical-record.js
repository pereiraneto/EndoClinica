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

const fillAnamneseRow = (anamnese, tableBody) => {
    addTag(tr => {
        addTag(th => {
            th.scope = 'row'
            th.innerText = `${anamnese.date.slice(8,10)}/${anamnese.date.slice(5,7)}/${anamnese.date.slice(0,4)}`
        }, tr, 'th')
        addTag(td => td.innerText = anamnese.main_complaint, tr, 'td')
        addTag(td => {
            addTag(a => {
                a.innerText = 'Editar'
                a.className = 'default-link'
                a.href = `${window.location.origin}/ficha-medica/anamneses/${anamnese.id}`
            }, td, 'a')
        }, tr, 'td')
    }, tableBody, 'tr')
}

const baseApiUrl = window.location.origin+'/api/'

document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        filterPatient(patientId)

        requestFromApi(`${baseApiUrl}fichas-medicas/${medicalRecordId}/`, medicalRecord => {
            medicalRecord.anamneses.forEach(anamneseId => {
                requestFromApi(baseApiUrl+'anamneses/'+anamneseId, anamnese => {
                    fillAnamneseRow(anamnese, document.getElementById("anamnese-table-body"))
                })
            })
        })
    }
}