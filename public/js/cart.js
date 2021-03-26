let storageProducts = JSON.parse(localStorage.getItem('addToCart'));
let addProducts = document.getElementById("addproducts");

if (storageProducts != null) {
    productAdditionInCart();
    totalPrice(storageProducts.length);
}
else {
    emptyCart();
}

function productAdditionInCart() {
    let number = 0;
    storageProducts.forEach(function (storageProduct) {
        number ++;
        let tr = document.createElement("tr");
        tr.setAttribute("id", "tr-lign" + number);

        let name = storageProduct.name;
        let color = storageProduct.color;
        let price = storageProduct.price;

        creationProducts(name, "tdName", tr, number);
        creationProducts(color, "tdcolor", tr, number);
        creationProducts(separateNumber(price + " €"), "tdPrice", tr, number);
        creationProducts("", "tdDelete", tr, number);
        addProducts.appendChild(tr);
    })
}

function creationProducts(storageName, tdName, tr, number) {
    tdName = document.createElement("td");
    if (storageName === "") {
        tdName.setAttribute("title", "supprimer le produit");
        tdName.setAttribute("onClick", "removeItem(" + number + ")");
        tdName.classList.add("table__delete");
    }
    tdName.textContent = storageName;
    tr.appendChild(tdName);
}

function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
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
    document.getElementById("total-price").textContent = "";
}

document.getElementById("delete-all").addEventListener("click",function() {
    window.localStorage.clear();
    while (addProducts.firstChild) {
        addProducts.removeChild(addProducts.firstChild);
    }
    emptyCart();
})

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
    document.getElementById("form").style.visibility = "visible";
})

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
        alert("Merci de mettre un adresse email valide");
        return false;
    }
    else {
        let contact = {
            firstName,
            lastName,
            address,
            city,
            email 
        }
        //postData(contact);
        return true;
    } 
}

async function postData(contact) {
    let response = await fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {"Content-Type": "application/json;charset=UTF-8"},
        body:  JSON.stringify(contact)
    })
    .then(function(response) {
        return response.json();
    })
}