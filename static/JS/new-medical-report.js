const apiBaseUrl = window.location.origin + '/api/'

const mrNonDinamicFields = [
    {api:'medical_record', elId:'medical-report-patient'},
    {api:'doctor', elId:'medical-report-doctor'},
    {api:'date', elId:'medical-report-time'},
    {api:'date', elId:'medical-report-date'}
]

const handleChangeMRTemplateChange = () => {
    const mrSelectEl = document.getElementById('select-medical-report-model')

    requestFromApi(`${apiBaseUrl}modelos-laudos/${mrSelectEl.value}`, mrTemplate => {
        Object.keys(mrTemplate.json_template).forEach(field => {
            addTag(row => {
                row.className = 'row mt-3'
                addTag(col => {
                    col.className = 'col'

                    addTag(h6 => {
                        h6.innerText = field[0].toUpperCase() + field.slice(1)
                    }, col, 'h6')

                    addTag(input => {
                        input.name = field
                        input.value = mrTemplate.json_template[field]
                        input.className = 'form-control'
                    }, col, 'input')
                }, row, 'div')
            }, document.getElementById('medical-report-custom-fields'), 'div')
        });
    })
}

document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        handleChangeMRTemplateChange()
    }
}