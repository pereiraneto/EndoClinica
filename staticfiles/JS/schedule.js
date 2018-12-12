const selectConsultationStatusEl = (consultationStatus) => {

    const statusIdNameList = [{
            id: "consultation-status-scheduled",
            name: "Agendado",
            cssClass: "btn btn-outline-secondary"
        },
        {
            id: "consultation-status-confirmed",
            name: "Confirmado",
            cssClass: "btn btn-outline-warning"
        },
        {
            id: "consultation-status-arrived",
            name: "Chegou",
            cssClass: "btn btn-outline-danger"
        },
        {
            id: "consultation-status-realized",
            name: "Realizado",
            cssClass: "btn btn-outline-success"
        },
        {
            id: "consultation-status-disengaged",
            name: "Desmarcado",
            cssClass: "btn btn-outline-primary"
        }
    ]

    statusIdNameList.forEach(status => {
        const el = document.getElementById(status.id)
        
        if (status.name == consultationStatus) {
            status.cssClass += " active";
            el.click();
        }
        el.className = status.cssClass;
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

    const idInputList = [{
            id: "consultation-cell-phone",
            value: consultationObj.cell_phone
        },
        {
            id: "consultation-phone",
            value: consultationObj.phone
        },
        {
            id: "consultation-birth-date",
            value: consultationObj.birth_date
        },
        {
            id: "consultation-insurance",
            value: consultationObj.insurance
        },
        {
            id: "consultation-date",
            value: consultationObj.date.slice(0, 10)
        },
        {
            id: "consultation-hour",
            value: consultationObj.date.slice(11, 16)
        },
        {
            id: "consultation-duration",
            value: consultationObj.duration
        },
        {
            id: "consultation-requester",
            value: consultationObj.requester
        },
        {
            id: "consultation-prepare",
            value: consultationObj.prepare
        },
        {
            id: "consultation-details",
            value: consultationObj.details
        },
        {
            id: "consultation-email",
            value: consultationObj.email
        },
        {
            id: "consultation-insurancenumber",
            value: consultationObj.insurance_number
        }
    ];

    const idSelectList = [
        {
            id: "consultation-priority",
            value: consultationObj.priority
        },
        {
            id: "consultation-procedures",
            value: consultationObj.procedure
        },
        {
            id: "consultation-doctors",
            value: consultationObj.doctor
        }
    ];

    document.getElementById("consultation-patients").innerHTML = "";
    addTag(opt=>{opt.innerText=consultationObj.patientName; opt.value=consultationObj.patient}, document.getElementById("consultation-patients"), 'option');
    selectConsultationStatusEl(consultationObj.status);
    setElsInputs(idInputList);
    setElsOption(idSelectList);
    setButtonOnClickFunction(consultationObj.id, "saveConsultation");
}

const setButtonOnClickFunction = (consultationId, buttonId) => {
    const button = document.getElementById(buttonId);
    button.onclick = () => handleSaveConsultationModal(consultationId);
}

const handleClickInfoModal = (consultationObj) => {
    fillInfoModal(consultationObj);
    if(document.getElementById("medical-record-button-div").children.length != 0) document.getElementById("medical-record-button").href = window.location.origin + "/ficha-medica/" + consultationObj.medicalRecord
    $("#consultation-form").modal('show');
}

const fillTable = (tableBody, consultations) => {

    tableBody.innerHTML = '';

    consultations.forEach(consultation => addTag(rowEl => {
        addTag(th => {
            th.scope = "row";
            const date = `${consultation.date.slice(8,10)}/${consultation.date.slice(5,7)}`;
            const hour = `${consultation.date.slice(11,13)}h${consultation.date.slice(14,16)}`;
            th.textContent = `${date} - ${hour}`;
        }, rowEl, "th");
        addTag(td => td.textContent = `${consultation.duration} min`, rowEl);
        addTag(td => td.textContent = consultation.patientName, rowEl);
        addTag(td => td.textContent = consultation.priority, rowEl);
        addTag(td => td.textContent = consultation.procedureName, rowEl);
        addTag(td => td.textContent = consultation.insurance, rowEl);
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
                rowElClass = "";
                break;
            case "Confirmado":
                rowElClass = "table-warning";
                break;
            case "Chegou":
                rowElClass = "table-danger";
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

const getExtraData = (consultations, callback = () => {}) => {
    let requestList
    if(consultations.length == 0) {
        callback([])
    } else {
        consultations.forEach(consultation => {
                requestList = [{
                    property: [{apiName: 'name', newName: 'patientName'}, {apiName: 'medical_record', newName: 'medicalRecord'}],
                    url: `${apiBaseUrl}pacientes/${consultation.patient}`
                },
                {
                    property: [{apiName: 'name', newName: 'doctorName'}],
                    url: `${apiBaseUrl}medicos/${consultation.doctor}`
                },
                {
                    property: [{apiName: 'name', newName: 'procedureName'}],
                    url: `${apiBaseUrl}procedimentos/${consultation.procedure}`
                }
            ];
            let dataCounter = 0
            requestList.forEach(request => {
                requestFromApi(response => {
                    request.property.forEach(property => {
                        consultation[property.newName] = response[property.apiName]
                    });
                    dataCounter++
                    if (dataCounter == requestList.length)
                        callback(consultations)
                }, request.url)
            })
        });
    }
}

const handleChangePatientSelector = () => {
    const patientId = document.getElementById("consultation-patients").value
    if (patientId != 0) {
        requestFromApi( patient => {
            document.getElementById("consultation-cell-phone").value = patient.cell_phone
            document.getElementById("consultation-phone").value = patient.phone
            document.getElementById("consultation-birth-date").value = patient.birth_date
        }, apiBaseUrl + "pacientes/" + patientId)
    } else {
        document.getElementById("consultation-cell-phone").value = ""
        document.getElementById("consultation-phone").value = ""
        document.getElementById("consultation-birth-date").value = ""
    }
}

const handleFilter = () => {
    const initialDate = document.getElementById("filter-initial-date").value
    const finalDate = document.getElementById("filter-final-date").value
    const doctor = document.getElementById("filter-doctors").value

    const urlRequest = `${apiBaseUrl}consultas/filtrar?medico=${doctor}&data_inicial=${initialDate}&data_final=${finalDate}`

    requestFromApi(consultations => {
        const scheduleEl = document.getElementById("schedule-body")
        getExtraData(consultations, consultations => fillTable(scheduleEl, consultations))
    }, urlRequest);
}

const handleSaveConsultationModal = (consultationId) => {
    let consultationStatus;

    document.getElementsByName("statusOptions").forEach(option => {
        if (option.checked) {
            consultationStatus = option.value;
        }
    });

    const requestBody = {
        status: consultationStatus,
        date: `${document.getElementById("consultation-date").value}T${document.getElementById("consultation-hour").value}:00Z`,
        duration: document.getElementById("consultation-duration").value,
        priority: document.getElementById("consultation-priority").value,
        prepare: document.getElementById("consultation-prepare").value,
        insurance: document.getElementById("consultation-insurance").value,
        cell_phone: document.getElementById("consultation-cell-phone").value,
        phone: document.getElementById("consultation-phone").value,
        birth_date: document.getElementById("consultation-birth-date").value,
        doctor: document.getElementById("consultation-doctors").value,
        procedure: document.getElementById("consultation-procedures").value,
        details: document.getElementById("consultation-details").value,
        requester: document.getElementById("consultation-requester").value,
        patient: document.getElementById("consultation-patients").value 
    };
    requestFromApi(() => {
        $('#consultation-form').modal('hide');
        handleFilter();
    }, `${apiBaseUrl}consultas/${consultationId}/`, requestBody, 'PUT');
}

// const renderScreen = () => {
//     handleFilter()
//     requestFromApi(consultations => {
//         const scheduleEl = document.getElementById("schedule-body")
//         handleIdFromConsultations(consultations, consultations => fillTable(scheduleEl, consultations))
//     }, `${baseUrl}consultas/`);
// }

const apiBaseUrl = window.location.origin + "/api/";

document.onreadystatechange = () => {
    if (!window.indexedDB) {
        window.alert("Atualize seu navegador para usar este site.");
    }
    if (document.readyState == "interactive") {
        requestFromApi(doctors => {
            doctors.forEach(doctor => {
                addTag(option => {
                    option.textContent = doctor.name
                    option.value = doctor.id
                }, document.getElementById("consultation-doctors"), 'option')

                const filterDoctorsEl = document.getElementById("filter-doctors")
                if (filterDoctorsEl.value == '0') {
                    addTag(option => {
                        option.textContent = doctor.name
                        option.value = doctor.id
                    }, filterDoctorsEl, 'option')
                }
            });
            requestFromApi(procedures => {
                procedures.forEach(procedure => {
                    addTag(option => {
                        option.textContent = procedure.name;
                        option.value = procedure.id;
                    }, document.getElementById("consultation-procedures"), 'option');
                });
                handleFilter();
            }, apiBaseUrl + "procedimentos/");
        }, apiBaseUrl + "medicos/");
    }
}
