// Permet de récupérer l'id dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const order = urlParams.get('order');

let storageProducts = JSON.parse(localStorage.getItem('order'));
let dateOrder = JSON.parse(localStorage.getItem('dateOrder'));
let addProducts = document.getElementById("addproducts");

// Ajoute les produits présents dans le storage dans un tableau html
function productAdditionInCart() {
    document.getElementById("caption").textContent = "Récapitulatif de votre commande N°: " + order + " validé le " + dateOrder.localDate;
    storageProducts.forEach(function (storageProduct) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-lign");

        let name = storageProduct.name;
        let color = storageProduct.color;
        let price = storageProduct.price;

        creationProduct(name, "tdName", tr);
        creationProduct(color, "tdcolor", tr);
        creationProduct(separateNumber(price + " €"), "tdPrice", tr);
        addProducts.appendChild(tr);
    })
}

// Crée une balise (tdName) avec sa valeur textContent et l'insére dans la balise tr
function creationProduct(storageName, tdName, tr) {
    tdName = document.createElement("td");
    tdName.textContent = storageName;
    tr.appendChild(tdName);
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

// Sépare une valeur numérique (>= 100) avec une virgule avant les 2 derniers chiffres
function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

productAdditionInCart();
totalPrice(storageProducts.length);