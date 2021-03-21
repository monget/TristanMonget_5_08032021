async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();

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

        function creationProducts(productName, elementName, elementValue) {
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
        creationProducts(productName, "title", "h2");
        creationProducts(productImage, "picture", "img");
        creationProducts("Description : ", "titleDescription", "h3");
        creationProducts(productDescription, "description", "p");
        creationProducts("Couleurs disponibles : ", "titleColor", "h3");
        creationProducts(productColors, "color", "p");
        creationProducts("Prix unitaire : " + separateNumber(productPrice) + "€", "price", "p");

        productsList.appendChild(a);
    })
}

getData("http://localhost:3000/api/teddies");


function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}