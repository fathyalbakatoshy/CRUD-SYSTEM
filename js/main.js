"use strict";

let productName = document.querySelector("#productName");
let productPrice = document.querySelector("#productPrice");
let productCategory = document.querySelector("#productCategory");
let productDesc = document.querySelector("#productDesc");
let addBtnProduct = document.querySelector("#addBtnProduct");
let upDataBtnProduct = document.querySelector("#upDataBtnProduct");
let searchProd = document.querySelector("#searchProd");

let productList = [];

if (localStorage.getItem("product") != null) {
  productList = JSON.parse(localStorage.getItem("product"));
  displayProducts(productList);
}

function getProduct() {
  let product = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };
  if(validateProductName() && validateProductPrice() && validateProductCategory() && validateProductDesc()) {
    productList.push(product);
    displayProducts(productList);
    localStorage.setItem("product", JSON.stringify(productList));
    clearInput();
    removeValidClass()
  }
}

function clearInput() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDesc.value = "";
}

addBtnProduct.addEventListener("click", function () {
  getProduct();
});

function displayProducts(list) {
  let data = ``;
  for (let i = 0; i < list.length; i++) {
    data += `
    <tr>
      <td>${i + 1}</td>
      <td>${list[i].newName ? list[i].newName : list[i].name}</td>
      <td>${list[i].price}</td>
      <td>${list[i].category}</td>
      <td>${list[i].desc}</td>
      <td><button class="btn btn-outline-warning" onclick="upDataProduct(${i})">UPData</button></td>
      <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.querySelector("#displayProduct").innerHTML = data;
  document.querySelector("#show").innerHTML = productList.length;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  displayProducts(productList);
  localStorage.setItem("product", JSON.stringify(productList));
}

let newIndex;

function upDataProduct(index) {
  newIndex = index;
  productName.value = productList[index].name;
  productPrice.value = productList[index].price;
  productCategory.value = productList[index].category;
  productDesc.value = productList[index].desc;

  addBtnProduct.classList.replace("d-inline", "d-none");
  upDataBtnProduct.classList.replace("d-none", "d-inline");
}

function setUpdata() {
  let newData = {
    name: productName.value,
    price: productPrice.value,
    category: productCategory.value,
    desc: productDesc.value,
  };

  productList.splice(newIndex, 1, newData);
  localStorage.setItem("product", JSON.stringify(productList));
  displayProducts(productList);
  clearInput();
}

upDataBtnProduct.addEventListener("click", () => {
  setUpdata();
  addBtnProduct.classList.replace("d-none", "d-inline");
  upDataBtnProduct.classList.replace("d-inline", "d-none");
});

let x = document.querySelector("#x");
x.addEventListener("click", function () {
  Swal.fire({
    title: "Delete All Data?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all!",
  }).then((result) => {
    if (result.isConfirmed) {
      productList = [];
      localStorage.setItem("product", JSON.stringify(productList));
      displayProducts(productList);
      Swal.fire("Deleted!", "Your Product has been deleted.", "success");
    }
  });
});

searchProd.addEventListener("input", function () {
  let searchList = [];
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(this.value.toLowerCase())) {
      productList[i].newName = productList[i].name.replace(
        this.value,
        `<spam class="text-danger">${this.value}</spam>`
      );
      searchList.push(productList[i]);
      console.log(searchList);
      displayProducts(searchList);
    }
  }
});


function validateProductName() {
  let regex = /^[A-Z][a-z]{2,}$/;
  if (regex.test(productName.value)) {
    productName.classList.remove("is-invalid");
    productName.classList.add("is-valid");
    return true;
  } else {
    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    return false;
  }
}

function validateProductPrice() {
  let regex = /([1-9][0-9]{3}|10000)$/;
  if (regex.test(productPrice.value)) {
    productPrice.classList.remove("is-invalid");
    productPrice.classList.add("is-valid");
    return true;
  } else {
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    return false;
  }
}

function validateProductCategory() {
  let regex = /^(tv|phone|laptop)$/gi;
  if (regex.test(productCategory.value)) {
    productCategory.classList.remove("is-invalid");
    productCategory.classList.add("is-valid");
    return true;
  } else {
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
    return false;
  }
}

function validateProductDesc() {
  let regex = /^(\w|\s){1,200}$/gi;
  if (regex.test(productDesc.value)) {
    productDesc.classList.remove("is-invalid");
    productDesc.classList.add("is-valid");
    return true;
  } else {
    productDesc.classList.add("is-invalid");
    productDesc.classList.remove("is-valid");
    return false;
  }
}


function removeValidClass() {
  productName.classList.remove("is-valid");
  productPrice.classList.remove("is-valid");
  productCategory.classList.remove("is-valid");
  productDesc.classList.remove("is-valid");
}