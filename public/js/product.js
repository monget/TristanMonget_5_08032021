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

    let picture = document.createElement("img");
    picture.src = productImage;
    picture.classList.add("product__img");

    let name = document.createElement("h2"); // nom du produit
    name.textContent = productName;
    name.classList.add("product__h2");

    let descriptionTitle = document.createElement("h3"); // titre de la description
    descriptionTitle.textContent = "Description : ";

    let description = document.createElement("p"); // description du produit
    description.textContent = productDescription;

    let colorDiv = document.createElement("div"); // menu des couleurs
    colorDiv.classList.add("product__colors");
    let colorLabel = document.createElement("label");
    colorLabel.setAttribute("for", "color");
    colorLabel.classList.add("product__label");
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
    let value = 1;
    productColors.forEach(function (productColor) {
        let color = document.createElement("option");
        color.setAttribute("value", value);
        value ++;
        color.textContent = productColor;
        colorSelect.appendChild(color);
    })

    let price = document.createElement("p"); // prix
    price.textContent = "Prix unitaire : " + separateNumber(productPrice) + " €";

    let addCart = document.createElement("button"); // bouton ajout produit
    addCart.setAttribute("id", "addCart");
    addCart.textContent = "Ajouter au panier";

    product.appendChild(picture);
    div.appendChild(name);
    div.appendChild(descriptionTitle);
    div.appendChild(description);
    div.appendChild(colorDiv);
    colorDiv.appendChild(colorLabel);
    colorLabel.appendChild(colorTitle);
    colorDiv.appendChild(colorSelect);
    div.appendChild(price);
    div.appendChild(addCart);
    product.appendChild(div);
    

    document.getElementById("color").addEventListener("change", function() {
        selectColor("color");
    })

    document.getElementById("addCart").addEventListener("click",function() {
        let addToCart = {
            'id' : productId,
            'name' : productName,
            'color' : color,
            'price' : productPrice
        };
        localStorage.setItem('addToCart', JSON.stringify(addToCart));
    })
});

function selectColor(id) {
    select = document.getElementById(id);
    choice = select.selectedIndex;
    color = select.options[choice].text;
    return color;
}

function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}