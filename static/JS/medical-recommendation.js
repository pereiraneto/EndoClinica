const apiBaseUrl = window.location.origin + '/api/'

const mrNonDinamicFields = [
    {api:'medical_record', elId:'medical-recommendation-patient'},
    {api:'doctor', elId:'medical-recommendation-doctor'},
    {api:'date', elId:'medical-recommendation-date'}
]


const handleSaveMedicalrecommendation = () => {
    const requestBody = {}
    mrNonDinamicFields.forEach(field => {
        requestBody[field.api] = document.getElementById(field.elId).value
    })

    requestBody.json_medical_recommendation = recommendationQuill.getContents()

    requestFromApi(`${apiBaseUrl}recomendacoes/`, undefined, undefined, requestBody, 'POST');

    console.log("requestBody > ", requestBody)
    console.log("recommendationQuill > ", recommendationQuill)
}