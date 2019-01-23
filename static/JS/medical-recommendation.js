const apiBaseUrl = window.location.origin + '/api/'

const mrNonDinamicFields = [
    {api:'medical_record', elId:'medical-recommendation-patient'},
    {api:'doctor', elId:'medical-recommendation-doctor'},
    {api:'date', elId:'medical-recommendation-date'}
]


const handleSaveMedicalRecommendationTemplate = () => {
    const requestBody = {
        "json_medical_recommendation": recommendationTemplateQuill.getContents(),
        "name": document.getElementById("recommendation-template-name").value,
        "doctor": document.getElementById("medical-recommendation-doctor").value
    }

    requestFromApi(`${apiBaseUrl}modelos-recomendacoes/`, (response) => {
        window.alert('Modelo de Recomendação salva com sucessso')
    }, (response) => {
        console.log('erro ao salvar:', response)
        window.alert("Erro ao salvar recomendação. Verifique os campos preenchidos.")
        document.getElementById("recommendation-template-name").className = "form-control consultation-input is-invalid"
    }, requestBody, 'POST')
}


const handleSaveMedicalRecommendation = () => {
    const requestBody = {}
    mrNonDinamicFields.forEach(field => {
        requestBody[field.api] = document.getElementById(field.elId).value
    })

    requestBody.json_medical_recommendation = recommendationQuill.getContents()

    requestFromApi(`${apiBaseUrl}recomendacoes/`, response => {
        window.alert('Recomendação salva com sucessso')

        window.location.href = document.referrer
    }, response => {
        console.log('erro ao salvar:', response)

        window.alert("Erro ao salvar recomendação. Verifique os campos preenchidos.")
        
        mrNonDinamicFields.forEach(field => {
            if (response.hasOwnProperty(field.api)) {
                document.getElementById(field.elId).className = "form-control consultation-input is-invalid"
            } else {
                document.getElementById(field.elId).className = "form-control consultation-input"
            }
        })
    }, requestBody, 'POST');

    console.log("requestBody > ", requestBody)
    console.log("recommendationQuill > ", recommendationQuill)
}