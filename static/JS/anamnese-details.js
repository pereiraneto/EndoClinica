const baseApiUrl = location.origin + '/api/'

anamneseModelElRelation = [
    {element_id:"anamnese-date", model_field:"date"},
    {element_id:"anamnese-maincomplaint", model_field:"main_complaint"},
    {element_id:"anamnese-hda", model_field:"hda"},
    {element_id:"anamnese-pathology", model_field:"pathology"},
    {element_id:"anamnese-comorbidities", model_field:"comorbidities"},
    {element_id:"anamnese-medications", model_field:"medications"},
    {element_id:"anamnese-alergies", model_field:"alergies"},
    {element_id:"anamnese-habits", model_field:"habits"},
    {element_id:"anamnese-family-history", model_field:"family_history"},
    {element_id:"anamnese-physical-exam", model_field:"physical_exam"},
    {element_id:"anamnese-diagnostical-hypothesis", model_field:"diagnostical_hypothesis"},
    {element_id:"anamnese-conduct", model_field:"conduct"},
    {element_id:"anamnese-adicional-info", model_field:"adicional_info"},
    {element_id:"anamnese-insurance", model_field:"insurance"},
    {element_id:"anamnese-madical-record", model_field:"medical_record"},
    {element_id:"anamnese-doctor", model_field:"doctor"},
]

const handleSaveAnamnese = () => {
    const anamneseData = {}
    anamneseModelElRelation.forEach(field => {
        anamneseData[field.model_field] = document.getElementById(field.element_id).value
    });

    requestFromApi(baseApiUrl+'anamneses/', undefined, undefined, anamneseData, 'POST')
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        requestFromApi()
    }
}
