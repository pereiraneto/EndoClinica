const requestFromApi = (callback, url, body = {}, method = 'GET') => {
    const request = new XMLHttpRequest();
    request.open(method, url);

    request.onload = () => {
        console.log('request > ', request)
        if (request.status == 200 || request.status == 201) {
            if (request.response) {
                const response = request.response;
                callback(JSON.parse(response));
            } else {
                callback(null)
            }
        } else if (request.status == 204) {
            callback({});
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
