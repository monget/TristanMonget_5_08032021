function date() {
    let dateOrder = new Date();

    let localDate = dateOrder.toLocaleString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    let localhour = dateOrder.toLocaleString('fr-FR', {
        hour: 'numeric',
        minute: 'numeric'
    });
}

date();