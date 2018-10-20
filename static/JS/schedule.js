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
    consultations.forEach(consultation => {
        const addTag = (callback, parent, tag = "td") => {
            const th = document.createElement(tag);
            callback(th);
            parent.appendChild(th);
        }

        const tr = document.createElement("tr");

        addTag(th => {
            th.scope = "row";
            const date = `${consultation.date.slice(8,10)}/${consultation.date.slice(5,7)}`;
            const hour = `${consultation.date.slice(11,13)}h${consultation.date.slice(14,16)}`;
            th.textContent = `${date} - ${hour}`;
        }, tr, "th");
        addTag(th => th.textContent = `${consultation.duration} min`, tr);
        addTag(th => th.textContent = consultation.patient, tr);
        addTag(th => th.textContent = consultation.priority, tr);
        addTag(th => th.textContent = consultation.procedure, tr);
        addTag(th => th.textContent = consultation.prepare ? "Sim" : "Não", tr);
        addTag(th => {
            addTag(a => {
                a.textContent = "Visualizar";
                a.style = "color: #007bff !important; margin-right: 1em;"
            }, th, "a");
            addTag(a => {
                a.textContent = "Editar";
                a.style = "color: #007bff !important;"
            }, th, "a");
        }, tr);

        tableBody.appendChild(tr)

    });
}

baseUrl = window.location

document.onreadystatechange = () => {
    getOnApi(function (consultations) {
        console.log(consultations, document.getElementById("schedule-body"));

        fillTable(document.getElementById("schedule-body"), consultations)

    }, `${baseUrl}consultas/`, {})
}