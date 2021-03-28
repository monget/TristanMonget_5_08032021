async function getData(url) {
    let response = await fetch(url);
    return await response.json();
}

localStorage.removeItem("order");
localStorage.removeItem("dateOrder");