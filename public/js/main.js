const products = document.querySelectorAll(".product");
const productList = document.querySelector(".item-list");

const removeItem_onClick = (remove) => {
  const id = parseInt(remove.target.getAttribute("id"));
  const prod = document.querySelector(`.product[data-id='${id}']`)
  const qty = document.querySelector(`#qty-${id}`);
  
  prod.setAttribute("data-quantity", parseInt(prod.dataset.quantity) - 1);

  if(prod.dataset.quantity != 0)
  {
    document.getElementById(id).setAttribute("data-quantity", prod.dataset.quantity);
    qty.innerHTML = `Qty: ${prod.dataset.quantity}`;
  } else {
    document.getElementById(id).remove();
  }

  updateTotals();
}

const product_onClick = (product) => {
  const items = Array.prototype.slice.call(productList.childNodes);
  const prod = product.path[product.path.length - 7];
  const dupe = items.filter(item => item.getAttribute("id") == prod.dataset.id);
  prod.dataset.quantity = parseInt(prod.dataset.quantity) + 1;

  if(dupe.length) {
    const item = document.querySelector(`#qty-${prod.dataset.id}`);
    document.getElementById(dupe[0].getAttribute("id")).setAttribute("data-quantity", prod.dataset.quantity);
    item.innerHTML = `Qty: ${prod.dataset.quantity}`;
    updateTotals();
  } else {
    fetch(`api/product/${prod.dataset.id}`, {
      method: "get"
    })
    .then(result => {
      return result.json();
    })
    .then(productData => {
      return productData.product[0];
    })
    .then(data => {
      const item = document.createElement("div");
      const image = document.createElement("img");
      const name = document.createElement("span");
      const quantity = document.createElement("span");
      const removeItem = document.createElement("img");

      removeItem.setAttribute("id", prod.dataset.id);
      removeItem.setAttribute("src", "/images/icons/circle-xmark-regular.svg");
      removeItem.classList.add("remove-item");

      removeItem.addEventListener("click", removeItem_onClick);

      item.classList.add("item");
      item.setAttribute("id", prod.dataset.id);

      image.setAttribute("alt", "IMG");
      image.classList.add("prod-img");

      name.innerHTML = data.product_name;

      quantity.setAttribute("id", `qty-${prod.dataset.id}`);
      quantity.innerHTML = `Qty: ${prod.dataset.quantity}`;

      item.appendChild(image);
      item.appendChild(name);
      item.appendChild(quantity);
      item.appendChild(removeItem); 

      productList.appendChild(item);
      updateTotals();
    })
    .catch(err => {
      console.log(err);
      updateTotals();
    });
  }
}

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const updateTotals = () => {
  const subTotal =document.querySelector(".sub-total-amount");
  const discount = document.querySelector(".discount-amount");
  const tax = document.querySelector(".tax-amount");
  const grandTotal = document.querySelector(".grand-total-amount");

  const items = document.querySelectorAll(".item");
  var total = parseFloat("0.00");

  items.forEach(item => {
    let product = document.querySelector(`.product[data-id='${item.id}']`);
    let price = parseFloat(product.getAttribute("data-saleprice"));
    total += (price * product.getAttribute("data-quantity"));
  });

  var taxAmount = parseFloat("0.00");

  taxAmount = total * 0.13;

  var grandTotalAmount = parseFloat("0.00");

  grandTotalAmount = total + taxAmount;
  
  subTotal.innerHTML = formatter.format(total);
  tax.innerHTML = formatter.format(taxAmount);
  grandTotal.innerHTML = formatter.format(grandTotalAmount);
}

products.forEach(product => {
  product.addEventListener("click", product_onClick);
}); 

updateTotals();