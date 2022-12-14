const products = document.querySelectorAll('.product');
const productList = document.querySelector('.item-list');

var discountAmount = 0.0;
var prev = 0.0;
const totals = {
	subtotal: 0,
	discount: 0,
	tax: 0,
	grandtotal: 0,
};

const removeItem_onClick = (remove) => {
	const id = parseInt(remove.target.getAttribute('id'));
	const prod = document.querySelector(`.product[data-id='${id}']`);
	const qty = document.querySelector(`#qty-${id}`);

	prod.setAttribute('data-quantity', parseInt(prod.dataset.quantity) - 1);

	if (prod.dataset.quantity != 0) {
		document
			.getElementById(id)
			.setAttribute('data-quantity', prod.dataset.quantity);
		qty.innerHTML = `Qty: ${prod.dataset.quantity}`;
	} else {
		document.getElementById(id).remove();
	}

	updateTotals();
};

const updateCart = () => {
	const items = document.querySelectorAll('.item');
	const cartField = document.querySelector('input[name="cart"]');
	const cart = [];
	items.forEach((item) => {
		const prodData = document.querySelector(
			`[data-id="${item.getAttribute('id')}"]`
		);
		let id = item.id;
		let name = item.childNodes[1].innerHTML;
		let quantity = item.childNodes[2].innerHTML.split(' ')[1];
		let price = prodData.dataset.saleprice;
		let total = price * quantity;
		let cartItem = {
			id: id,
			name: name,
			quantity: quantity,
			price: price,
			total: total,
		};
		cart.push(cartItem);
	});
	cartField.setAttribute(
		'value',
		JSON.stringify({ cart: cart, totals: totals })
	);
};

const product_onClick = (product) => {
	const items = Array.prototype.slice.call(productList.childNodes);
	const prod = product.path[product.path.length - 7];
	const dupe = items.filter(
		(item) => item.getAttribute('id') == prod.dataset.id
	);
	prod.dataset.quantity = parseInt(prod.dataset.quantity) + 1;

	if (dupe.length) {
		const item = document.querySelector(`#qty-${prod.dataset.id}`);
		document
			.getElementById(dupe[0].getAttribute('id'))
			.setAttribute('data-quantity', prod.dataset.quantity);
		item.innerHTML = `Qty: ${prod.dataset.quantity}`;
		updateTotals();
	} else {
		fetch(`api/product/${prod.dataset.id}`, {
			method: 'get',
		})
			.then((result) => {
				return result.json();
			})
			.then((productData) => {
				return productData.product[0];
			})
			.then((data) => {
				const item = document.createElement('div');
				const image = document.createElement('img');
				const name = document.createElement('span');
				const quantity = document.createElement('span');
				const removeItem = document.createElement('img');

				removeItem.setAttribute('id', prod.dataset.id);
				removeItem.setAttribute(
					'src',
					'/images/icons/circle-xmark-regular.svg'
				);
				removeItem.classList.add('remove-item');

				removeItem.addEventListener('click', removeItem_onClick);

				item.classList.add('item');
				item.setAttribute('id', prod.dataset.id);

				image.setAttribute('alt', 'IMG');
				image.setAttribute('src', prod.dataset.imageurl);
				image.classList.add('prod-img');

				name.innerHTML = data.product_name;

				quantity.setAttribute('id', `qty-${prod.dataset.id}`);
				quantity.innerHTML = `Qty: ${prod.dataset.quantity}`;

				item.appendChild(image);
				item.appendChild(name);
				item.appendChild(quantity);
				item.appendChild(removeItem);

				productList.appendChild(item);
				updateTotals();
			})
			.catch((err) => {
				console.log(err);
				updateTotals();
			});
	}
};

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
	const subTotal = document.querySelector('.sub-total-amount');
	const tax = document.querySelector('.tax-amount');
	const grandTotal = document.querySelector('.grand-total-amount');

	const items = document.querySelectorAll('.item');
	var subtotal = parseFloat('0.00');

	items.forEach((item) => {
		let product = document.querySelector(`.product[data-id='${item.id}']`);
		let price = parseFloat(product.getAttribute('data-saleprice'));
		subtotal += price * product.getAttribute('data-quantity');
	});

	var taxAmount = parseFloat('0.00');

	taxAmount = subtotal * 0.13;

	var grandTotalAmount = parseFloat('0.00');
	grandTotalAmount = subtotal + taxAmount - discountAmount;
	if (grandTotalAmount < 0) {
		grandTotalAmount = 0;
	}

	subTotal.innerHTML = formatter.format(subtotal);
	tax.innerHTML = formatter.format(taxAmount);
	grandTotal.innerHTML = formatter.format(grandTotalAmount);

	totals.subtotal = parseFloat(subtotal.toFixed(2));
	totals.tax = parseFloat(taxAmount.toFixed(2));
	totals.grandtotal = parseFloat(grandTotalAmount.toFixed(2));
	updateCart();
};

const applyDiscount = () => {
	discountAmount = parseFloat(document.querySelector('.discount-amount').value);
	let grandTotal = document.querySelector('.grand-total-amount');
	let totalAmount = parseFloat(
		grandTotal.innerHTML.slice(1, grandTotal.innerHTML.length - 1)
	);

	if (discountAmount != prev) {
		let amount = totalAmount - discountAmount;
		totals.discount = discountAmount;

		if (amount < 0) {
			amount = 0;
		}
		prev = discountAmount;
		grandTotal.innerHTML = formatter.format(amount);
		updateCart();
	}
};

products.forEach((product) => {
	product.addEventListener('click', product_onClick);
});

updateTotals();
