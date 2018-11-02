const selectConsultationStatusEl = (consultationStatus) => {

    const statusIdNameList = [
        {id: "consultation-status-scheduled", name: "Agendado", cssClass: "btn btn-outline-secondary"},
        {id: "consultation-status-confirmed", name: "Confirmado", cssClass: "btn btn-outline-warning"},
        {id: "consultation-status-arrived", name: "Chegou", cssClass: "btn btn-outline-danger"},
        {id: "consultation-status-realized", name: "Realizado", cssClass: "btn btn-outline-success"},
        {id: "consultation-status-disengaged", name: "Desmarcado", cssClass: "btn btn-outline-primary"}
    ]

    statusIdNameList.forEach(status => {
        if (status.name == consultationStatus) status.cssClass += " active";
        document.getElementById(status.id).className = status.cssClass
    });
}

const setElsInputs = (idInputList) => {
    idInputList.forEach(relatedIdInput => {
        document.getElementById(relatedIdInput.id).value = relatedIdInput.value;
    });
}

const setElsOption = (idSelectList) => {
    idSelectList.forEach(relatedIdSelect => {
        document.getElementById(relatedIdSelect.id).value = relatedIdSelect.value
    });
}

const fillInfoModal = (consultationObj) => {

    const idInputList = [
        {id: "consultation-patient", value: consultationObj.patient},
        {id: "consultation-cell-phone", value: consultationObj.cell_phone},
        {id: "consultation-phone", value: consultationObj.phone},
        {id: "consultation-birth-date", value: consultationObj.birth_date},
        {id: "consultation-insurance", value: consultationObj.insurance},
        {id: "consultation-date", value: consultationObj.date.slice(0, 10)},
        {id: "consultation-hour", value: consultationObj.date.slice(11, 16)},
        {id: "consultation-duration", value: consultationObj.duration},
        {id: "consultaion-requester", value: consultationObj.requester},
        {id: "consultaion-prepare", value: consultationObj.prepare},
        {id: "consultaion-details", value: consultationObj.details}
    ];
    
    const idSelectList = [
        {id: "consultation-priority", value: consultationObj.priority},
        {id: "consultaion-procedure", value: consultationObj.procedure}
    ];

    selectConsultationStatusEl(consultationObj.status);
    setElsInputs(idInputList);
    setElsOption(idSelectList);
}

const handleClickInfoModal = (consultationObj) => {
    fillInfoModal(consultationObj);
    $("#consultation-form").modal('show');
}



function getOnApi(callback, url, body = {}) {

    const request = new XMLHttpRequest();
    request.open('GET', url);

    request.onload = () => {
        console.log(request.status)
        if (request.status == 200 || request.status == 201) {
            if (request.response) {
                const response = request.response;
                console.log("request response", response);
                callback(JSON.parse(response));
            } else {
                callback(null);
            }
        }
    }

    request.onerror = function () {
        console.log("On Error API Request")
        callback(null);
    }

    request.send(body);
}

function fillTable(tableBody, consultations) {
    tableBody.innerHTML = '';

    const addTag = (callback, parent, tag = "td") => {
        const newEl = document.createElement(tag);
        callback(newEl);
        parent.appendChild(newEl);
    }

    consultations.forEach(consultation => addTag(rowEl => {
        addTag(th => {
            th.scope = "row";
            const date = `${consultation.date.slice(8,10)}/${consultation.date.slice(5,7)}`;
            const hour = `${consultation.date.slice(11,13)}h${consultation.date.slice(14,16)}`;
            th.textContent = `${date} - ${hour}`;
        }, rowEl, "th");
        addTag(td => td.textContent = `${consultation.duration} min`, rowEl);
        addTag(td => td.textContent = consultation.patient, rowEl);
        addTag(td => td.textContent = consultation.priority, rowEl);
        addTag(td => td.textContent = consultation.procedure, rowEl);
        addTag(td => td.textContent = consultation.prepare ? "Sim" : "Não", rowEl);
        addTag(td => {
            addTag(a => {
                a.textContent = "Editar";
                a.classList += "default-link mr-2";
                a.onclick = () => handleClickInfoModal(consultation);
            }, td, "a");
        }, rowEl);

        let rowElClass;
        switch (consultation.status) {
            case "Agendado":
                rowElClass = "table-danger";
                break;
            case "Confirmado":
                rowElClass = "table-warning";
                break;
            case "Chegou":
                rowElClass = "bg-danger";
                break;
            case "Realizado":
                rowElClass = "table-success";
                break;
            case "Desmarcado":
                rowElClass = "table-info line-through-text";
                break;
        }

        rowEl.classList += rowElClass;

    }, tableBody, "tr"));
}

const handleIdFromConsultations = (consultations, callback = ()=>{}) => {
    const consultationPropertiesUrls = [
        {property: "patient", url: `${baseUrl}pacientes/`},
        {property: "doctor", url: `${baseUrl}medicos/`},                
        {property: "procedure", url: `${baseUrl}procedimentos/`}
    ];

    consultations.forEach(consultation => {
        consultationPropertiesUrls.forEach(pu => {
            getOnApi(response => {
                consultation[pu.property] = response.name;
                console.log("consultation", consultation);
                console.log("response", response)
                callback(consultations);
            }, pu.url+consultation[pu.property]);
        });
    });
}

const baseUrl = window.location;

document.onreadystatechange = () => {
    if (document.readyState == "interactive") {
        getOnApi(consultations => {
            const scheduleEl = document.getElementById("schedule-body")
            console.log(consultations, scheduleEl);

            handleIdFromConsultations(consultations, consultations => fillTable(scheduleEl, consultations));

        }, `${baseUrl}consultas/`);
    }
}