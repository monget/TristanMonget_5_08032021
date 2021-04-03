async function getData(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return await response.json();
    }
    else {
        alert("Erreur de connexion avec le serveur")
    }
}

localStorage.removeItem("order");
localStorage.removeItem("dateOrder");