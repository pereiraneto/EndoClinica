const baseApiUrl = location.origin + '/api/'

anamneseModelElRelation = [
    {elementId:"anamnese-date", modelField:"date"},
    {elementId:"anamnese-maincomplaint", modelField:"main_complaint"},
    {elementId:"anamnese-hda", modelField:"hda"},
    {elementId:"anamnese-pathology", modelField:"pathology"},
    {elementId:"anamnese-comorbidities", modelField:"comorbidities"},
    {elementId:"anamnese-medications", modelField:"medications"},
    {elementId:"anamnese-alergies", modelField:"alergies"},
    {elementId:"anamnese-habits", modelField:"habits"},
    {elementId:"anamnese-family-history", modelField:"family_history"},
    {elementId:"anamnese-physical-exam", modelField:"physical_exam"},
    {elementId:"anamnese-diagnostical-hypothesis", modelField:"diagnostical_hypothesis"},
    {elementId:"anamnese-conduct", modelField:"conduct"},
    {elementId:"anamnese-adicional-info", modelField:"adicional_info"},
    {elementId:"anamnese-insurance", modelField:"insurance"},
    {elementId:"anamnese-madical-record", modelField:"medical_record"},
    {elementId:"anamnese-doctor", modelField:"doctor"},
    {elementId:"anamnese-executed-exams", modelField:"executed_exams"}
]

const handleSaveAnamnese = () => {
    const anamneseData = {}
    anamneseModelElRelation.forEach(field => {
        el = document.getElementById(field.elementId)
        if (el.tagName == 'SELECT' && el.multiple){
            anamneseData[field.modelField] = []
            el.childNodes.forEach(option => {
                if(option.selected) anamneseData[field.modelField].push(option.value)
            })
        } else
            anamneseData[field.modelField] = el.value
    });

    const method = isEditionView ? 'PUT' : 'POST'
    const url = isEditionView ? baseApiUrl+'anamneses/'+anamneseId+'/' : baseApiUrl+'anamneses/'

    requestFromApi(url, response => {
        window.alert('Anamnese salva com sucessso')

        window.location.href = document.referrer
    }, response => {
        console.log('erro ao salvar:', response)

        window.alert("Erro ao salvar anamnse. Verifique os campos preenchidos.")
        
        anamneseModelElRelation.forEach(field => {
            if (response.hasOwnProperty(field.modelField)) {
                document.getElementById(field.elementId).className = "form-control consultation-input is-invalid"
            } else {
                document.getElementById(field.elementId).className = "form-control consultation-input"
            }
        })
    }, anamneseData, method)
}

const fillAnamnesefields = () => {
    requestFromApi(baseApiUrl+'anamneses/'+anamneseId, anamnese => {
        anamneseModelElRelation.forEach(field => {
            const elField = document.getElementById(field.elementId)
            if (elField.tagName == 'SELECT' && elField.multiple) {
                elField.childNodes.forEach(option => {
                    if (anamnese[field.modelField].indexOf(parseInt(option.value)) != -1)
                        option.selected = true
                })
            } else {
                elField.value = anamnese[field.modelField]
            }
        })
    })
}

const isEditionView = typeof anamneseId !== 'undefined'

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        const isEditionView = anamneseId != undefined

        if (isEditionView)
            fillAnamnesefields()
    }
}
