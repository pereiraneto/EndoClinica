
const addTag = (callback, parent, tag = "td") => {
    const newEl = document.createElement(tag);
    callback(newEl);
    parent.appendChild(newEl);
}