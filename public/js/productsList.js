let url="http://localhost:3000/api/teddies";
fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
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

        function creationProducts(product, elementName, elementValue) {
            if (elementName === "picture") {
                elementName = document.createElement(elementValue);
                elementName.src = product;
            }
            else if (elementName === "price") {
                elementName = document.createElement(elementValue);
                elementName.textContent = product;
                elementName.classList.add("products__price");
            }
            else {
                elementName = document.createElement(elementValue);
                elementName.textContent = product;
            }
            if (elementValue === "img" || elementValue === "h2" || elementValue === "span") {
                elementName.classList.add("products__" + elementValue);
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
});

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

function test(product, elementName, elementValue) {
    elementName = document.createElement(elementValue);
    elementName.textContent = product;
    return elementName;
}