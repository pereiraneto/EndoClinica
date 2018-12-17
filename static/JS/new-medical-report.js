const apiBaseUrl = window.location.origin + '/api/'

const mrNonDinamicFields = [
    {api:'medical_record', elId:'medical-report-patient'},
    {api:'doctor', elId:'medical-report-doctor'},
    {api:'report_type', elId: 'select-medical-report-template'},
    {api:'requester', elId:'medical-report-requester'},
    {api:'date', elId:'medical-report-time'},
    {api:'date', elId:'medical-report-date'}
]

const handleChangeMRTemplateChange = () => {
    const mrSelectEl = document.getElementById('select-medical-report-template')

    requestFromApi(`${apiBaseUrl}modelos-laudos/${mrSelectEl.value}`, mrTemplate => {
        Object.keys(mrTemplate.json_template).forEach(field => {
            addTag(row => {
                row.className = 'row mt-3'
                addTag(col => {
                    col.className = 'col'

                    addTag(h6 => {
                        h6.innerText = field[0].toUpperCase() + field.slice(1)
                    }, col, 'h6')

                    addTag(textarea => {
                        textarea.name = field
                        textarea.value = mrTemplate.json_template[field]
                        textarea.className = 'form-control mr-form-dynamicfield'
                        textarea.rows = 5
                    }, col, 'textarea')
                }, row, 'div')
            }, document.getElementById('medical-report-custom-fields'), 'div')
        });
    })
}

const handleSaveMedicalReport = () => {
    const requestBody = {}
    mrNonDinamicFields.forEach(field => {
        requestBody[field.api] = document.getElementById(field.elId).value
    })
    requestBody.date += `T${document.getElementById('medical-report-time').value}:00Z`
    requestBody.report_type = document.getElementById('select-medical-report-template').selectedOptions[0].innerText

    const jsonMedicalReport = {}

    const dynamicFields = document.getElementsByClassName('mr-form-dynamicfield')
    for (let i = 0; i < dynamicFields.length; i++) {
        const field = dynamicFields[i]
        jsonMedicalReport[field.name] = field.value
    }
    requestBody.json_medical_report = jsonMedicalReport

    requestFromApi(`${apiBaseUrl}laudos/`, response => {
        window.alert('Salvo com sucesso!')
        window.location.href = document.referrer
    }, response => {
        console.log('erro ao salvar:', response)

        window.alert("Erro ao salvar o laudo. Verifique os campos preenchidos.")
        
        mrNonDinamicFields.forEach(field => {
            if (response.hasOwnProperty(field.api)) {
                document.getElementById(field.elId).className = "form-control consultation-input is-invalid"
            } else {
                document.getElementById(field.elId).className = "form-control consultation-input"
            }
        })
    }, requestBody, 'POST')
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        handleChangeMRTemplateChange()
    }
}