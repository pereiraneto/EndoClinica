const apiBaseUrl = window.location.origin + '/api/'

const mrNonDinamicFields = [
    {api:'medical_record', elId:'medical-statement-patient'},
    {api:'doctor', elId:'medical-statement-doctor'},
    {api:'date', elId:'medical-statement-time'},
    {api:'date', elId:'medical-statement-date'},
]


// const handleSaveMedicalStatementTemplate = () => {
//     const requestBody = {
//         "json_medical_statement": statementTemplateQuill.getContents(),
//         "name": document.getElementById("statement-template-name").value,
//         "doctor": document.getElementById("medical-statement-doctor").value
//     }

//     requestFromApi(`${apiBaseUrl}modelos-recomendacoes/`, (response) => {
//         window.alert('Modelo de Recomendação salva com sucessso.\nRecarreque esta página para usar o novo template!')
//     }, (response) => {
//         console.log('erro ao salvar:', response)
//         window.alert("Erro ao salvar recomendação. Verifique os campos preenchidos.")
//         document.getElementById("statement-template-name").className = "form-control consultation-input is-invalid"
//     }, requestBody, 'POST')
// }


const handleSaveMedicalStatement = () => {
    const requestBody = {}
    mrNonDinamicFields.forEach(field => {
        requestBody[field.api] = document.getElementById(field.elId).value
    })
    requestBody.date += `T${document.getElementById('medical-statement-time').value}:00Z`

    requestBody.json_medical_statement = statementQuill.getContents()
    requestMethod = isEditionView ? 'PUT' : 'POST'
    requestUrl = isEditionView ? `${apiBaseUrl}declaracoes/${medicalStatementId}/` : `${apiBaseUrl}declaracoes/`


    requestFromApi(requestUrl, response => {
        window.alert('Declaração salva com sucessso')

        window.location.href = document.referrer
    }, response => {
        console.log('erro ao salvar:', response)

        window.alert("Erro ao salvar declaração. Verifique os campos preenchidos.")
        
        mrNonDinamicFields.forEach(field => {
            if (response.hasOwnProperty(field.api)) {
                document.getElementById(field.elId).className = "form-control consultation-input is-invalid"
            } else {
                document.getElementById(field.elId).className = "form-control consultation-input"
            }
        })
    }, requestBody, requestMethod);
}

// const handleDeleteStatementTemplate = () => {
//     const statementId = document.getElementById('statement-template-select').value

//     requestFromApi(`${apiBaseUrl}modelos-recomendacoes/${statementId}`, response => {
//         window.alert("Modelo de Recomendação deletada com sucesso!\nQuando você voltar a esta página, o modelo não estará mais aqui.")
//     }, () => {
//         window.alert("Houve um erro ao tentar deletar esse modelo.")
//     }, undefined, "DELETE")
// }

// const handleChangeSelectedstatementTemplate = () => {
//     const seletedstatementTemplateId = document.getElementById('statement-template-select').value

//     if (seletedstatementTemplateId != 0) {
//         requestFromApi(`${apiBaseUrl}modelos-recomendacoes/${seletedstatementTemplateId}`, statementTemplate => {
//             statementQuill.setContents(statementTemplate.json_medical_statement)
//         })
//     }
// }


// document.onreadystatechange = () => {
//     if (document.readyState == "interactive") {
//         if (isEditionView) {
//             requestFromApi(`${apiBaseUrl}recomendacoes/${medicalRecommedationId}`, medicalstatement => {
//                 statementQuill.setContents(medicalstatement.json_medical_statement)
//             })
//         }
//     }
// }
