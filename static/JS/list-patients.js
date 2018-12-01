const apiBaseUrl = window.location.origin + "/api/"


document.onreadystatechange = () => {
    if (document.readyState == 'interactive') {
        requestFromApi(apiBaseUrl + 'pacientes/', patients => {
            const patientsTableBody = document.getElementById('patients-table-body')

            patients.forEach(patient => {
                addTag(tr => {
                    addTag(th => {
                        th.scope = "row"
                        th.textContent = patient.name
                    }, tr, 'th')
                    addTag(td => td.textContent = patient.phone, tr)
                    addTag(td => td.textContent = patient.cell_phone, tr)
                    addTag(td => td.textContent = new Date().getFullYear() - patient.birth_date.slice(0,4), tr)
                    addTag(td => {
                        addTag(a => {
                            a.textContent = 'Editar'
                            a.href = window.location.origin + '/pacientes/' + patient.id
                            a.classList = 'default-link mr-2'
                        }, td, 'a')
                        if (userIsDoctor)
                            addTag(a => {
                                a.textContent = 'Abrir Ficha'
                                a.href = window.location.origin + '/ficha-medica/' + patient.medical_record
                                a.classList = 'default-link'
                            }, td, 'a')
                    }, tr)
                }, patientsTableBody, 'tr')
            });
        })
    }
}