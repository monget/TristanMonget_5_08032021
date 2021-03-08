let url="http://localhost:3000/api/teddies";
fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
    let products = data;
    let productsList = document.getElementById("products_list");
    products.forEach(function (product) {
        let productColors = product.colors;
        let productId = product._id;
        let productName = product.name;
        let productPrice = product.price;
        let productImage = product.imageUrl;
        let productDescription = product.description;
        let a = document.createElement("a");
        a.href = "product.html";
        let title = document.createElement("h2");
        title.textContent = productName;
        let picture = document.createElement("img");
        picture.src = productImage;
        let titleDescription = document.createElement("h3");
        titleDescription.textContent = "Description : ";
        let description = document.createElement("p");
        description.textContent = productDescription;
        let titleColor = document.createElement("h3");
        titleColor.textContent = "Couleurs disponibles : ";
        let color = document.createElement("p");
        color.textContent = productColors;
        let price = document.createElement("p");
        price.textContent = "Prix unitaire : " + separateNumber(productPrice) + "€";
        price.style.marginTop = "30px";
        a.appendChild(picture);
        a.appendChild(title);
        a.appendChild(titleDescription);
        a.appendChild(description);
        a.appendChild(titleColor);
        a.appendChild(color);
        a.appendChild(price);
        productsList.appendChild(a);
    })
});

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}