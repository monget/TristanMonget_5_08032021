// Récupére un array parcouru avec la méthode forEach et chacune des variables est crée avec creationProducts() puis inséré en html dans une balise a
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

// Crée une balise (elementValue) avec sa valeur src, textContent ou classList et l'insére dans la balise a associé
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

// Sépare une valeur numérique (>= 100) avec une virgule avant les 2 derniers chiffres
function separateNumber(value) {
    if (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}

// Appelle la fonction GetData et récupére une promesse en json 
getData("http://localhost:3000/api/teddies")
    .then(data => {
        if (data != undefined) {
            bindProductsToView(data);
        }
        else {
            alert("Erreur avec l'url");
        }
    })
    .catch(error => {
        console.error(error);
        alert(error);
    })