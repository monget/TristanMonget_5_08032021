let storageProducts = JSON.parse(localStorage.getItem('addToCart'));
let addProducts = document.getElementById("addproducts");

if (storageProducts != null) {
    productAdditionInCart();
    totalPrice(storageProducts.length);
}
else {
    emptyCart();
}

// Ajoute les produits présents dans le storage dans un tableau html
function productAdditionInCart() {
    let number = 0;
    storageProducts.forEach(function (storageProduct) {
        number ++;
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-lign" + number);

        let name = storageProduct.name;
        let image = storageProduct.image;
        let color = storageProduct.color;
        let price = storageProduct.price;

        creationProduct(name, "tdName", tr, number);
        creationProduct(image, "tdImage", tr, number);
        creationProduct(color, "tdcolor", tr, number);
        creationProduct(separateNumber(price + " €"), "tdPrice", tr, number);
        creationProduct("", "tdDelete", tr, number);
        addProducts.appendChild(tr);
    })
}

// Crée une balise (tdName) avec sa valeur src, textContent, classList ou setAttributes et l'insére dans la balise tr
function creationProduct(storageName, tdName, tr, number) {
    let image = tdName;
    tdName = document.createElement("td");
    if (storageName === "") {
        tdName.setAttribute("title", "supprimer le produit");
        tdName.setAttribute("onClick", "removeItem(" + number + ")");
        tdName.classList.add("table__delete");
    }
    if (image === "tdImage") {
        img = document.createElement("img");
        img.src = storageName;
        img.classList.add("table__image");
        tdName.appendChild(img);
    }
    else {
        tdName.textContent = storageName;
    }
    tr.appendChild(tdName);
}

// Sépare une valeur numérique (>= 100) avec une virgule avant les 2 derniers chiffres
function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

// Additionne les prix des produits dans le storage et l'ajoute dans le total du tableau
function totalPrice(value) {
    let total = 0;
    if (value != 0) {
        for (i=0; i<value; i++) {
            total += storageProducts[i].price;
        }
        let spanPrice = document.createElement("span");
        spanPrice.textContent = separateNumber(total + " €");
        document.getElementById("total-price").appendChild(spanPrice);
    }
}

// Crée et insére une ligne "Votre panier est vide" dans le tableau et cache le formulaire
function emptyCart() {
    let tr = document.createElement("tr");
    let tdCart = document.createElement("td");
    tdCart.setAttribute("colspan", "5");
    tdCart.textContent = "Votre panier est vide";
    tr.appendChild(tdCart);
    addProducts.appendChild(tr);
    document.getElementById("total-price").textContent = "";
    document.getElementById("form").style.visibility = "hidden";
}

document.getElementById("delete-all").addEventListener("click",function() {
    window.localStorage.clear();
    while (addProducts.firstChild) { // Supprime toutes les lignes de produit du tableau
        addProducts.removeChild(addProducts.firstChild);
    }
    emptyCart();
})

// Supprime le produit selectionné au onclick() du html et du storage et retourne un nouveau tableau
function removeItem(value) {
    let lignNumber = document.getElementById("tr-lign" + value);
    addProducts.removeChild(lignNumber);
    value --;
    storageProducts.splice(value, 1);
    localStorage.setItem('addToCart', JSON.stringify(storageProducts));
    while (addProducts.firstChild) {
        addProducts.removeChild(addProducts.firstChild);
    }
    document.getElementById("total-price").textContent = "";
    productAdditionInCart();
    totalPrice(storageProducts.length);
    if (storageProducts.length == 0) {
        window.localStorage.clear();
        emptyCart();
    }
}

document.getElementById("button-order").addEventListener("click",function() {
    if (localStorage.getItem('addToCart') != null){
        document.getElementById("form").style.visibility = "visible";
    }
})

// Contrôle les valeurs inputs du form
function control() {
    const lastName = form.elements.lastName.value;
    const firstName = form.elements.firstName.value;
    const address = form.elements.address.value;
    const city = form.elements.city.value;
    const email = form.elements.email.value;
    const regexWord = /^[A-Za-zÀ-ÖØ-öø-ÿ-]+$/;
    const regexAddress = /[A-Za-zÀ-ÖØ-öø-ÿ0-9_-]+/;
    const regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;

    if (!regexWord.test(lastName)) {
        alert("Merci de mettre un nom valide");
        return false;
    }
    else if (!regexWord.test(firstName)) {
        alert("Merci de mettre un prénom valide");
        return false;
    }
    else if (!regexAddress.test(address)) {
        alert("Merci de renseigner une adresse compléte")
        return false;
    }
    else if (!regexWord.test(city)) {
        alert("Merci de renseigner un nom de ville")
        return false;
    }
    else if (!regexEmail.test(email)) {
        alert("Merci de renseigner une adresse email valide");
        return false;
    }
    else {
        createData();
        return false;
    }
}

// Crée une date, un objet contact et un tableau products
function createData() {
    if (storageProducts != null) {
        let dateOrder = new Date();
        let localDate = dateOrder.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        date = {localDate};
        localStorage.setItem('dateOrder', JSON.stringify(date));
        let products = [];
        storageProducts.forEach(function (storageProduct) {
            let product = {
                '_id' : storageProduct.id,
                'name' : storageProduct.name,
                'color' : storageProduct.color,
                'price' : storageProduct.price
            }
            products.push(product);
            localStorage.setItem('order', JSON.stringify(products));
        })
        order = {
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products
        }
        postData();
    }
    else {
        alert("Votre panier est vide");
    }
}

// Envoi la commande à l'api et ouvre la page "confirmation.html" avec l'orderId retourné par l'api
async function postData() {
    response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body:  JSON.stringify(order)
    })
    .then(response => {
        localStorage.removeItem("addToCart");
        return response.json();
    })
    .then(data => {
        window.location = "confirmation.html?order=" + data.orderId;
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })
}
