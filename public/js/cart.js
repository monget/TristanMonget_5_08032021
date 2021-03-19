let storageProducts = JSON.parse(localStorage.getItem('addToCart'));
let addProducts = document.getElementById("addproducts");

if (storageProducts != null) {
    productAddition();
    totalPrice(storageProducts.length);
}
else {
    emptyCart();
}

//localStorage.removeItem(storageProducts);

function productAddition() {
    let number = 0;
    storageProducts.forEach(function (storageProduct) {
        number ++;
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-lign"+number);
    
        let id = storageProduct.id;
        let name = storageProduct.name;
        let color = storageProduct.color;
        let price = storageProduct.price;

        creationProducts(name, "tdName");
        creationProducts(color, "tdcolor");
        creationProducts(separateNumber(price + " €"), "tdPrice");
        creationProducts("", "tdDelete");

        function creationProducts(storageName, tdName) {
            tdName = document.createElement("td");
            if (storageName === "") {
                tdName.setAttribute("title", "supprimer le produit");
                tdName.classList.add("table__delete");
            }
            tdName.textContent = storageName;
            tr.appendChild(tdName);
        }
        addProducts.appendChild(tr);
    })
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

function emptyCart() {
    let tr = document.createElement("tr");
    let tdCart = document.createElement("td");
    tdCart.setAttribute("colspan", "4");
    tdCart.textContent = "Votre panier est vide";
    tr.appendChild(tdCart);
    addProducts.appendChild(tr);
}

function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

document.getElementById("button-order").addEventListener("click",function() {
    document.getElementById("form").style.visibility = "visible";
})

document.getElementById("delete-all").addEventListener("click",function() {
    window.localStorage.clear();
    emptyCart();
})