// Permet de récupérer l'id dans l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

// Récupére un Object avec l'id correspondant chacune des variables est crée avec creationProduct() puis inséré en html dans une div
function bindProductToView(data) {
    let productId = data._id;
    let productName = data.name;
    let productPrice = data.price;
    let productColors = data.colors;
    let productImage = data.imageUrl;
    let productDescription = data.description;

    let product = document.getElementById("product"); 
    let div = document.createElement("div");
    div.classList.add("product__details");

    let colors = document.createElement("div");
    colors.classList.add("product__colors");

    creationProduct(productImage, "picture", "img");
    creationProduct(productName, "name", "h2", div);
    creationProduct("Description : ", "descriptionTitle", "h3", div);
    creationProduct(productDescription, "description", "p", div);
    div.appendChild(colors);
    creationColorMenu(productColors, colors);
    creationProduct("Prix unitaire : " + separateNumber(productPrice) + " €", "price", "p", div);
    creationProduct("Ajouter au panier", "addCart", "button", div);
    product.appendChild(div);
    
    document.getElementById("color").addEventListener("change", function() { // Retourne la couleur selectionnée après un changement d'état
        select = document.getElementById("color");
        choice = select.selectedIndex;
        color = select.options[choice].text;
    })
    addToCart(productId, productImage, productName, productPrice);
}

// Crée une balise (elementValue) avec sa valeur src, textContent, classList ou setAttributes et l'insére dans la balise div
function creationProduct(productName, elementName, elementValue, div) {
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

// Crée un menu déroulant avec les couleurs disponibles
function creationColorMenu(productColors, colors) {
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
        setAttributes(color, {"value": value});
        value ++;
        color.textContent = productColor;
        colorSelect.appendChild(color);
    })
    colors.appendChild(colorLabel);
    colorLabel.appendChild(colorTitle);
    colors.appendChild(colorSelect);
}

// Sépare une valeur numérique (>= 100) avec une virgule avant les 2 derniers chiffres
function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

// Ajoute un attribut et sa valeur sur son elementName
function setAttributes(elementName, options) {
    Object.keys(options).forEach(function(value) {
        elementName.setAttribute(value, options[value]);
    })
}

// Crée ou ajoute un produit dans le panier au click (localStorage)
function addToCart(productId, productImage, productName, productPrice) {
    let addToCart = [];
    let controlCart = JSON.parse(localStorage.getItem('addToCart'));
    if (controlCart != null) {
        addToCart = addToCart.concat(controlCart); // Permet de fusionner les tableaux si addToCart existe déjà
    }
    document.getElementById("addCart").addEventListener("click",function() {
        if (color.value == 0) {
            alert("Merci de sélectionner une couleur !");
        }
        else if (color != "Choisissez une couleur") {
            let productDetails = {
                'id' : productId,
                'image': productImage,
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
}

// Appelle la fonction GetData et récupére une promesse en json 
getData("http://localhost:3000/api/teddies/" + id)
    .then(data => {
        if (data != undefined) {
            bindProductToView(data);
        }
        else {
            alert("Merci de ne pas jouer avec l'url !");
        }
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })