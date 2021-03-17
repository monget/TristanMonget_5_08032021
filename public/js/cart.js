let storage = localStorage.getItem('addToCart');
let storageProducts = JSON.parse(storage);

let addProducts = document.getElementById("addproducts");

let number = 0;
storageProducts.forEach(function (storageProduct) {
    let tr = document.createElement("tr");
    let id = storageProduct.id;
    let name = storageProduct.name;
    let color = storageProduct.color;
    let price = storageProduct.price;

    let tdName = document.createElement("td");
    tdName.textContent = name;

    let tdColor = document.createElement("td");
    tdColor.textContent = color;

    let tdPrice = document.createElement("td");
    tdPrice.textContent = separateNumber(price);

    let tdDelete = document.createElement("td");
    number ++;
    tdDelete.setAttribute("id", "test"+number);
    tdDelete.classList.add("table__delete");

    tr.appendChild(tdName);
    tr.appendChild(tdColor);
    tr.appendChild(tdPrice);
    tr.appendChild(tdDelete);
    addProducts.appendChild(tr);
})

document.getElementById("test0").addEventListener("click",function() {
    window.localStorage.clear();
})

let testId = document.getElementById("test"+number);
testId.addEventListener("click",function() {
    console.log("test");
    console.log(testId);
})


function separateNumber(value) {
    while (/(\d+)(\d{2})/.test(value.toString())) {
        value = value.toString().replace(/(\d+)(\d{2})/, '$1'+','+'$2');
    } return value;
}