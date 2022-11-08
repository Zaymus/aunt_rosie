const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const middleware = require("./middleware");
const env = require("./util/constants");

const app = express();
const apiRouter = express.Router();

const inventoryRouter = require("./routes/inventory");
const productRouter = require("./routes/product");
const staffRouter = require("./routes/staff");
const shopRouter = require("./routes/shop");
const serverRouter = require("./routes/server");

const {
	inventory,
	invoice,
	location,
	payments,
	personnel,
} = require("./models");

apiRouter.use(inventoryRouter);
apiRouter.use(productRouter);
apiRouter.use(staffRouter);
apiRouter.use(shopRouter);
apiRouter.use("/server", serverRouter);

app.set("view engine", "ejs");
app.set("views", "views");

personnel.hourlyRate.hasMany(personnel.staff);
personnel.staff.belongsTo(personnel.hourlyRate);

personnel.staff.hasMany(invoice.invoice);
invoice.invoice.belongsTo(personnel.staff);

invoice.invoice.hasMany(invoice.invoiceItem);
invoice.invoiceItem.belongsTo(invoice.invoice);

payments.transaction.hasMany(invoice.invoiceItem);
invoice.invoiceItem.belongsTo(payments.transaction);

payments.transaction.hasOne(inventory.inventory);
inventory.inventory.belongsTo(payments.transaction);

location.shelf.hasMany(inventory.batch);
inventory.batch.belongsTo(location.shelf);

inventory.batch.belongsToMany(inventory.product, {
	through: inventory.inventory,
});
inventory.product.belongsToMany(inventory.batch, {
	through: inventory.inventory,
});

location.location.hasMany(location.building);
location.building.belongsTo(location.location);

location.building.hasMany(location.floor);
location.floor.belongsTo(location.building);

location.floor.hasMany(location.room);
location.room.belongsTo(location.floor);

location.room.hasMany(location.section);
location.section.belongsTo(location.room);

location.section.hasMany(location.shelf);
location.shelf.belongsTo(location.section);

invoice.invoice.hasMany(payments.payment);
payments.payment.belongsTo(invoice.invoice);

payments.payment.hasMany(payments.financialTransaction);
payments.financialTransaction.belongsTo(payments.payment);

payments.financialTransaction.hasOne(payments.transactionType);
payments.transactionType.belongsTo(payments.financialTransaction);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
// app.use(middleware);
app.use("/", apiRouter);

sequelize
	.sync()
	.then((result) => {
		app.listen(env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});
