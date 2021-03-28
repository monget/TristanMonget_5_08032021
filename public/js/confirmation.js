const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const order = urlParams.get('order');

let storageProducts = JSON.parse(localStorage.getItem('order'));
let dateOrder = JSON.parse(localStorage.getItem('dateOrder'));
let addProducts = document.getElementById("addproducts");

function productAdditionInCart() {
    document.getElementById("caption").textContent = "Récapitulatif de votre commande N° : " + order + " validé le " + dateOrder.localDate;
    storageProducts.forEach(function (storageProduct) {
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-lign");

        let name = storageProduct.name;
        let color = storageProduct.color;
        let price = storageProduct.price;

        creationProducts(name, "tdName", tr);
        creationProducts(color, "tdcolor", tr);
        creationProducts(separateNumber(price + " €"), "tdPrice", tr);
        addProducts.appendChild(tr);
    })
}

function creationProducts(storageName, tdName, tr) {
    tdName = document.createElement("td");
    tdName.textContent = storageName;
    tr.appendChild(tdName);
}

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

function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

productAdditionInCart();
totalPrice(storageProducts.length);