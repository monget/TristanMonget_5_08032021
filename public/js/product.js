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

    let colors = document.createElement("div"); // menu des couleurs
    colors.classList.add("product__colors");

    function creationProduct(productName, elementName, elementValue) {
        let classList = elementName;
        elementName = document.createElement(elementValue);
        if (classList === "picture") {
            elementName.src = productName;
            product.appendChild(elementName);
        }
        else {
            elementName.textContent = productName;
            div.appendChild(elementName);
        }
        if (classList === "picture" || classList === "name" || classList === "price") {
            elementName.classList.add("product__" + classList);
        }
        if (classList === "addCart") {
            setAttributes(elementName, {"id": "addCart"});
        }
    }

    function colorMenu() {
        let colorLabel = document.createElement("label");
        setAttributes(colorLabel, {"for": "color"});
        colorLabel.classList.add("product__colorLabel");
    
        let colorTitle = document.createElement("h3");
        colorTitle.textContent = "Couleur : ";
    
        let colorSelect = document.createElement("select");
        setAttributes(colorSelect, {"name": "color", "id": "color", "required": ""});
    
        let colorChoise = document.createElement("option");
        setAttributes(colorChoise, {"selected": "", "value": 0});
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
        colors.appendChild(colorLabel);
        colorLabel.appendChild(colorTitle);
        colors.appendChild(colorSelect);
    }

    creationProduct(productImage, "picture", "img");
    creationProduct(productName, "name", "h2");
    creationProduct("Description : ", "descriptionTitle", "h3");
    creationProduct(productDescription, "description", "p");
    div.appendChild(colors);
    colorMenu();
    creationProduct("Prix unitaire : " + separateNumber(productPrice) + " €", "price", "p");
    creationProduct("Ajouter au panier", "addCart", "button");
    product.appendChild(div);
    
    document.getElementById("color").addEventListener("change", function() {
        selectColor("color");
    })

    let addToCart = [];
    let controlCart = JSON.parse(localStorage.getItem('addToCart'));
    if (controlCart != null) {
        addToCart = addToCart.concat(controlCart);
    }

    document.getElementById("addCart").addEventListener("click",function() {
        if (color.value == 0) {
            alert("Merci de sélectionner une couleur !");
        }
        else if (color != "Choisissez une couleur") {
            let productDetails = {
                'id' : productId,
                'name' : productName,
                'color' : color,
                'price' : productPrice
            };
            addToCart.push(productDetails);
            localStorage.setItem('addToCart', JSON.stringify(addToCart));
            alert("Votre produit à bien été ajouté au panier");
        }
        else {
            alert("Merci de sélectionner une couleur !");
        }
    })
});

function selectColor(id) {
    select = document.getElementById(id);
    choice = select.selectedIndex;
    color = select.options[choice].text;
    return color;
}

function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

function setAttributes(elementName, options) {
    Object.keys(options).forEach(function(value) {
        elementName.setAttribute(value, options[value]);
    })
 }