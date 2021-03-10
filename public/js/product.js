const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

let url="http://localhost:3000/api/teddies/" + id;
fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
    let productId = data._id;
    let productName = data.name;
    let productPrice = data.price;
    let productColors = data.colors;
    let productImage = data.imageUrl;
    let productDescription = data.description;
    let product = document.getElementById("product"); 
    let div = document.createElement("div");
    div.classList.add("product__details");
    let form = document.createElement("form");
    form.classList.add("form");
    form.setAttribute('method',"post");
    form.setAttribute('action',"submit.php");

    let picture = document.createElement("img"); // image
    picture.src = productImage;
    picture.classList.add("product__img");

    let name = document.createElement("h2"); // nom du produit
    name.textContent = productName;
    name.classList.add("product__h2");

    let descriptionTitle = document.createElement("h3"); // titre de la description
    descriptionTitle.textContent = "Description : ";

    let description = document.createElement("p"); // description du produit
    description.textContent = productDescription;

    let colorDiv = document.createElement("div");
    let colorLabel = document.createElement("label"); // menu des couleurs
    colorLabel.setAttribute("for", "color");
    colorLabel.classList.add("form__label");
    let colorTitle = document.createElement("h3");
    colorTitle.textContent = "Couleur : ";
    let colorSelect = document.createElement("select");
    colorSelect.setAttribute("name", "color");
    colorSelect.setAttribute("id", "color");
    let colorChoise = document.createElement("option");
    colorChoise.setAttribute("selected", "selected");
    colorChoise.setAttribute("value", " ");
    colorChoise.textContent = "Choisissez une couleur";
    colorSelect.appendChild(colorChoise);
    productColors.forEach(function (productColor) {
        let color = document.createElement("option");
        color.setAttribute("value", productColor);
        color.textContent = productColor;
        colorSelect.appendChild(color);
    })

    let price = document.createElement("p"); // prix
    price.textContent = "Prix unitaire : " + separateNumber(productPrice) + " €";

    product.appendChild(picture);
    div.appendChild(name);
    div.appendChild(descriptionTitle);
    div.appendChild(description);
    div.appendChild(form);
    form.appendChild(colorDiv);
    colorDiv.appendChild(colorLabel);
    colorLabel.appendChild(colorTitle);
    colorDiv.appendChild(colorSelect);
    form.appendChild(price);
    product.appendChild(div);
});

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}