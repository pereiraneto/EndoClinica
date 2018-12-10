const baseApiUrl = window.location.origin+"/api/"

const examFields = [
    {modelName: "date", elId: "exam-time"},
    {modelName: "date", elId: "exam-date"},
    {modelName: "exam_type", elId: "exam-type"},
    {modelName: "result", elId: "exam-result"},
    {modelName: "doctor", elId: "exam-doctor"},
    {modelName: "medical_record", elId: "exam-medical-record"}
]

const handleSaveExam = () => {
    const examData = {}

    examFields.forEach(field => {
        examData[field.modelName] = document.getElementById(field.elId).value
    });

    examData.date += "T"+document.getElementById("exam-time").value

    const method = isEditionView ? 'PUT' : 'POST'
    const url = isEditionView ? baseApiUrl+"exames-complementares/"+complementaryExamId+"/" : baseApiUrl+"exames-complementares/"

    requestFromApi(url, response => {
        window.alert('Exame salvo com sucesso')
        window.location.href = document.referrer
    }, response => {
        console.log("bad request >", response)
        examFields.forEach(field => {
            if (response.hasOwnProperty(field.modelName)) {
                document.getElementById(field.elId).className = "form-control consultation-input is-invalid"
            } else {
                document.getElementById(field.elId).className = "form-control consultation-input"
            }
        })
    }, examData, method)
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive' && isEditionView) {
        requestFromApi(`${baseApiUrl}exames-complementares/${complementaryExamId}`, exam => {
            requestFromApi(`${baseApiUrl}pacientes/${patientId}`, patient => {
                addTag(option => {
                    option.innerText = patient.name
                    option.value = patient.medical_record
                    option.selected = true
                }, document.getElementById('exam-medical-record'), 'option')
            })
            requestFromApi(`${baseApiUrl}medicos/${exam.doctor}`, doctor => {
                addTag(option => {
                    option.innerText = doctor.name
                    option.value = doctor.id
                    option.selected = true
                }, document.getElementById('exam-doctor'), 'option')
            })

            examFields.forEach(field => {
                document.getElementById(field.elId).value = exam[field.modelName]
            })

            document.getElementById('exam-date').value = exam.date.slice(0,10)
            document.getElementById('exam-time').value = exam.date.slice(11,16)
        })
    }
}