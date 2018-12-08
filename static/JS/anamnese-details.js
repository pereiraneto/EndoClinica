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

    requestFromApi(baseApiUrl+'anamneses/', undefined, undefined, anamneseData, 'POST')
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        
        const isEditionView = typeof anamneseId !== 'undefined'

        requestFromApi(`${baseApiUrl}fichas-medicas/${medicalRecordId}`, medicalRecord => {
            medicalRecord.complementary_exams.forEach(complementaryExamId => {
                requestFromApi(`${baseApiUrl}exames-complementares/${complementaryExamId}`, complementaryExam => {
                    addTag(option => {
                        option.value = complementaryExamId
                        option.innerText = `${complementaryExam.exam_type} - ${complementaryExam.date.slice(8,10)}/${complementaryExam.date.slice(5,7)}/${complementaryExam.date.slice(0,4)} - ${complementaryExam.date.slice(11,16)}`
                    }, document.getElementById('anamnese-executed-exams'), 'option')
                })
            })
        })
        if (isEditionView)
            requestFromApi(baseApiUrl+'anamneses/'+anamneseId, anamnese => {
                anamneseModelElRelation.forEach(field => {
                    document.getElementById(field.elementId).value = anamnese[field.modelField]
                })
            })
    }
}
