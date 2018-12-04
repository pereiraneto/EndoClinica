const apiBaseUrl = window.location.origin + "/api/";

const getExtraData = (consultations, callback = () => {}) => {
    let requestList
    if(consultations.length == 0) {
        callback([])
    } else {
        consultations.forEach(consultation => {
                requestList = [
                {
                    property: [{apiName: 'name', newName: 'procedureName'}],
                    url: `${apiBaseUrl}procedimentos/${consultation.procedure}`
                }
            ]
            let dataCounter = 0
            requestList.forEach(request => {
                requestFromApi(request.url, response => {
                    request.property.forEach(property => {
                        consultation[property.newName] = response[property.apiName]
                    })
                    dataCounter++
                    if (dataCounter == requestList.length)
                        callback(consultations)
                })
            })
        })
    }
}

const filterPatient = (patient) => {
    const urlRequest = `${apiBaseUrl}consultas/filtrar?paciente=${patient}`

    requestFromApi(urlRequest, consultations => {
        const historyEl = document.getElementById("history-body")
        getExtraData(consultations, consultations => fillConsultationHistoryTable(historyEl, consultations))
    });
}