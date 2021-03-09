const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

let url="http://localhost:3000/api/teddies/" + id;
fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
    let product = data;
    let productsList = document.getElementById("product");
    let productColors = product.colors;
    let productId = product._id;
    let productName = product.name;
    let productPrice = product.price;
    let productImage = product.imageUrl;
    let productDescription = product.description;
    let div = document.createElement("div");
    div.classList.add("product__details");
    let title = document.createElement("h2");
    title.textContent = productName;
    title.classList.add("product__h2");
    let picture = document.createElement("img");
    picture.src = productImage;
    picture.classList.add("product__img");
    let titleDescription = document.createElement("h3");
    titleDescription.textContent = "Description : ";
    let description = document.createElement("p");
    description.textContent = productDescription;
    let titleColor = document.createElement("h3");
    titleColor.textContent = "Couleur : ";
    let color = document.createElement("p");
    color.textContent = productColors;
    let price = document.createElement("p");
    price.textContent = "Prix unitaire : " + separateNumber(productPrice) + "€";
    price.style.marginTop = "30px";
    productsList.appendChild(picture);
    div.appendChild(title);
    div.appendChild(titleDescription);
    div.appendChild(description);
    div.appendChild(titleColor);
    div.appendChild(color);
    div.appendChild(price);
    productsList.appendChild(div);
});

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}