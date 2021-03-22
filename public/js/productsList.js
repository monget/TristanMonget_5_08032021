function bindProductsToView(data) {
    let products = data;
    let productsList = document.getElementById("products");
    products.forEach(function (product) {
        let productColors = product.colors;
        let productId = product._id;
        let productName = product.name;
        let productPrice = product.price;
        let productImage = product.imageUrl;
        let productDescription = product.description;

        let a = document.createElement("a");
        a.href = "product.html?id=" + productId;
        a.classList.add("products__link");

        creationProducts(productName, "title", "h2", a);
        creationProducts(productImage, "picture", "img", a);
        creationProducts("Description : ", "titleDescription", "h3", a);
        creationProducts(productDescription, "description", "p", a);
        creationProducts("Couleurs disponibles : ", "titleColor", "h3", a);
        creationProducts(productColors, "color", "p", a);
        creationProducts("Prix unitaire : " + separateNumber(productPrice) + "€", "price", "p", a);

        productsList.appendChild(a);
    })
}

function creationProducts(productName, elementName, elementValue, a) {
    let classList = elementName; 
    elementName = document.createElement(elementValue);
    if (classList === "picture") {
        elementName.src = productName;
    }
    else {
        elementName.textContent = productName;
    }
    if (classList === "picture" || classList === "title" || classList === "price") {
        elementName.classList.add("products__" + classList);
    }
    a.appendChild(elementName);
}

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

getData("http://localhost:3000/api/teddies")
    .then(data => {
        bindProductsToView(data);
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })