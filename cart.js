let productsInCart = JSON.parse(localStorage.getItem("Products")) || [];
let totalCost = JSON.parse(localStorage.getItem("Total Cost")) || [];

function cartCount() {
  let cartQty = document.querySelector(".cart-qty");
  if (productsInCart.length !== 0) {
    cartQty.textContent = Object.values(productsInCart)
      .map((item) => item.incart)
      .reduce((item, x) => item + x, 0);
  } else {
    cartQty.textContent = 0;
  }
}

setInterval(cartCount, 1000);

let addCartPlus = (id) => {
  let selectedItem = id;
  let lookUpItem = productsInCart.find((item) => item.sku === selectedItem.id);
  let LookUpProducts = products.find((item) => item.sku === selectedItem.id);

  if (lookUpItem === undefined) {
    productsInCart.push({
      sku: selectedItem.id,
      incart: 1,
      category: LookUpProducts.category,
      subcategory: LookUpProducts.subcategory,
      developer: LookUpProducts.developer,
      itemname: LookUpProducts.itemname,
      version: LookUpProducts.version,
      filesize: LookUpProducts.filesize,
      uploaddate: LookUpProducts.uploaddate,
      price: LookUpProducts.harga,
      imglink: LookUpProducts.imglink,
      postlink: LookUpProducts.postlink,
      tCost: LookUpProducts.harga,
    });
  } else {
    lookUpItem.incart += 1;
    lookUpItem.tCost = lookUpItem.incart * lookUpItem.price;
  }

  // miniCartList();
  localStorage.setItem("Products", JSON.stringify(productsInCart));
};

let TotalAmount = () => {
  let totalsCost = document.querySelector("#btnActions");
  if (productsInCart.length !== 0) {
    let amount = productsInCart
      .map((item) => {
        let { incart, sku } = item;
        let search = products.find((y) => y.sku === sku) || [];

        return incart * search.harga;
      })
      .reduce((item, y) => item + y, 0);
    totalsCost.innerHTML = `
    <div class="totals">
                            <span class="label">Total:</span>
                            <span class="price-total"><span class="price">${amount}</span></span>
                          </div>
                          <div class="actions">
                            <a class="btn btn-dark" href="#">View Cart</a>
                            <a class="btn btn-primary" href="#">Checkout</a>
                          </div>
    `;
  } else return;
};

setInterval(TotalAmount, 500);

let miniCartListDisplay = () => {
  let miniProductList = document.querySelector(".mini-products-list");
  if (productsInCart.length !== 0) {
    miniProductList.innerHTML = "";
    Object.values(productsInCart).map((item) => {
      let imageProductLink = item.imglink.replace("noData", "/assets/no-image.png");
      let id = "md" + item.sku;
      miniProductList.innerHTML += `
        <li class="item" id="${id}">
          <a href="#" title="${item.itemname}" class="product-image">
            <img src="${imageProductLink}" alt="${item.itemname}"/>
          </a>
          <div class="product-details">
            <p class="product-name">
              <a href="#">${item.itemname} </a>
            </p>
            <p class="qty-price">${item.incart}X <span class="price">${item.price}</span></p>
            <a onclick="deleteItem(${id})" style="cursor:pointer;"title="Remove This Item" class="btn-remove">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </li>
    `;
    });
  } else {
    miniProductList.innerHTML = `
    <li class="alert alert-danger">
	  <strong>Ouw la..la..!</strong> masih kosong dong 😫 <br/>👉 <a href="/p/shop.html" class="alert-link">Pilih item</a> dulu yuk 👌
	</li>
    `;
  }
  setInterval(TotalAmount, 500);
};

let deleteItem = (id) => {
  let selectedItem = id;
  productsInCart = productsInCart.filter((item) => "md" + item.sku !== selectedItem.id);
  miniCartListDisplay();
  TotalAmount();
  localStorage.setItem("Products", JSON.stringify(productsInCart));
};

setInterval(miniCartListDisplay, 500);
