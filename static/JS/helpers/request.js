const requestFromApi = (url, onsuccess = () => {}, onbadrequest = response => {console.log("bad request!", response)}, body = {}, method = 'GET') => {

    console.log("nhe > ", url);
    

    const request = new XMLHttpRequest();
    request.open(method, url);

    request.onload = () => {
        console.log('request > ', request)
        if (request.status == 200 || request.status == 201) {
            if (request.response) {
                onsuccess(JSON.parse(request.response));
            } else {
                onsuccess(null)
            }
        } else if (request.status == 204) {
            onsuccess({});
        } else if (request.status == 400) {
            onbadrequest(JSON.parse(request.response));
        }
    }

    request.onerror = () => {
        callback(null);
    }

    if (['PUT', 'POST', 'DELETE'].includes(method)) {
        const csrftoken = Cookies.get('csrftoken');
        request.setRequestHeader("X-CSRFToken", csrftoken);
        request.setRequestHeader("Content-type", "application/json")
    }
    request.send(JSON.stringify(body));
}
