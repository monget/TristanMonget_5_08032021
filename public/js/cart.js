let storage = localStorage.getItem('addToCart');
let storageProducts = JSON.parse(storage);

let addProducts = document.getElementById("addproducts");

console.log(storageProducts);

if (storageProducts != null) {
    additionPrice(storageProducts.length);
}
else {
    let tr = document.createElement("tr");
    let emptycart = document.createElement("td");
    emptycart.setAttribute("colspan", "4");
    emptycart.textContent = "Votre panier est vide";
    tr.appendChild(emptycart);
    addProducts.appendChild(tr);
}

function additionPrice(value) {
    let total = 0;
    if (value != 0) {
        for (i=0; i<value; i++) {
            total += storageProducts[i].price;
        }
        let totalPrice = document.createElement("span");
        totalPrice.textContent = separateNumber(total  + " €");
        document.getElementById("total-price").appendChild(totalPrice);
    }
}



let number = 0;


storageProducts.forEach(function (storageProduct) {
    let tr = document.createElement("tr");
    let id = storageProduct.id;
    let name = storageProduct.name;
    let color = storageProduct.color;
    let price = storageProduct.price;

    let tdName = document.createElement("td");
    tdName.textContent = name;

    let tdColor = document.createElement("td");
    tdColor.textContent = color;

    let tdPrice = document.createElement("td");
    tdPrice.textContent = separateNumber(price + " €");

    let tdDelete = document.createElement("td");
    number ++;
    tdDelete.setAttribute("id", "test"+number);
    tdDelete.classList.add("table__delete");

    tr.appendChild(tdName);
    tr.appendChild(tdColor);
    tr.appendChild(tdPrice);
    tr.appendChild(tdDelete);
    addProducts.appendChild(tr);
})

document.getElementById("button-order").addEventListener("click",function() {
    document.getElementById("form").style.visibility = "visible";
})

document.getElementById("delete-all").addEventListener("click",function() {
    window.localStorage.clear();
})

//localStorage.removeItem(storageProducts);

/*
function separateNumber(value) {
    while (/(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d{2})/, '$'+','+'$2');
    } return value;
}*/


function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}