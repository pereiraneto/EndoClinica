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

const fillComplementaryExamRow = (complementaryExam, tableBody) => {
    addTag(tr => {
        addTag(th => {
            th.scope = 'row'
            th.innerText = `${complementaryExam.date.slice(8,10)}/${complementaryExam.date.slice(5,7)}/${complementaryExam.date.slice(0,4)} - ${complementaryExam.date.slice(11,16)}`
        }, tr, 'th')
        addTag(td => td.innerText = complementaryExam.exam_type, tr, 'td')
        addTag(td => {
            addTag(a => {
                a.innerText = 'Editar'
                a.className = 'default-link'
                a.href = `${window.location.origin}/ficha-medica/exames-complementares/${complementaryExam.id}`
            }, td, 'a')
        }, tr, 'td')
    }, tableBody, 'tr')
}

const fillMedicalReport = (medicalReport, tableBody) => {
    addTag(tr => {
        addTag(th => {
            th.scope = 'row'
            th.innerText = `${medicalReport.date.slice(8,10)}/${medicalReport.date.slice(5,7)}/${medicalReport.date.slice(0,4)} - ${medicalReport.date.slice(11,16)}`
        }, tr, 'th')
        addTag(td => td.innerText = medicalReport.report_type, tr, 'td')
        addTag(td => {
            addTag(a => {
                a.innerText = 'Editar'
                a.className = 'default-link'
                a.href = `${window.location.origin}/ficha-medica/laudos/${medicalReport.id}`
            }, td, 'a')
        }, tr, 'td')
    }, tableBody, 'tr')
}

const fillMedicalRecommendation = (medicalRecommendation, tableBody) => {
    addTag(tr => {
        addTag(th => {
            th.scope = 'row'
            th.innerText = `${medicalRecommendation.date.slice(8,10)}/${medicalRecommendation.date.slice(5,7)}/${medicalRecommendation.date.slice(0,4)}`
        }, tr, 'th')
        addTag(td => {
            addTag(a => {
                a.innerText = 'Editar'
                a.className = 'default-link'
                a.href = `${window.location.origin}/ficha-medica/recomendacao/${medicalRecommendation.id}`
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

            medicalRecord.complementary_exams.forEach(complementaryExamId => {
                requestFromApi(baseApiUrl+'exames-complementares/'+complementaryExamId, complementaryExam => {
                    fillComplementaryExamRow(complementaryExam, document.getElementById("complementary-exam-table-body"))
                })
            })

            medicalRecord.medical_reports.forEach(medicalReportId => {
                requestFromApi(baseApiUrl+'laudos/'+medicalReportId, medicalReport => {
                    fillMedicalReport(medicalReport, document.getElementById("medical-report-table-body"))
                })
            })

            medicalRecord.medical_recommendation.forEach(medicalRecommendationId => {
                requestFromApi(`${baseApiUrl}recomendacoes/${medicalRecommendationId}`, medicalRecommendation => {
                    fillMedicalRecommendation(medicalRecommendation, document.getElementById("medical-recommedation-table-body"))
                })
            })
        })
    }
}