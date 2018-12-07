const baseApiUrl = location.origin + '/api/'

const handleSaveAnamnese = () => {
    const anamneseData = {
        date: document.getElementById('anamnese-date').value,
        main_complaint: document.getElementById('anamnese-maincomplaint').value,
        hda: document.getElementById('anamnese-hda').value,
        pathology: document.getElementById('anamnese-pathology').value,
        comorbidities: document.getElementById('anamnese-comorbidities').value,
        medications: document.getElementById('anamnese-medications').value,
        alergies: document.getElementById('anamnese-alergies').value,
        habits: document.getElementById('anamnese-habits').value,
        family_history: document.getElementById('anamnese-family-history').value,
        physical_exam: document.getElementById('anamnese-physical-exam').value,
        diagnostical_hypothesis: document.getElementById('anamnese-diagnostical-hypothesis').value,
        conduct: document.getElementById('anamnese-conduct').value,
        adicional_info: document.getElementById('anamnese-adicional-info').value,
        insurance: document.getElementById('anamnese-insurance').value,
        medical_record: document.getElementById('anamnese-madical-record').value, 
        doctor: document.getElementById('anamnese-doctor').value
    }

    requestFromApi(baseApiUrl+'anamneses/', undefined, undefined, anamneseData, 'POST')
    
}