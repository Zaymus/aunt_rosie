const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const middleware = require("./middleware");
const { env } = require("./util/constants");

const app = express();
const apiRouter = express.Router();

const inventoryRouter = require("./routes/inventory");
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

personnel.hourlyRate.hasMany(personnel.staff, {foreignKey: 'rate_id'});
personnel.staff.belongsTo(personnel.hourlyRate, {foreignKey: 'rate_id'});

personnel.staff.hasMany(invoice.invoice, {foreignKey: 'staff_id'});
invoice.invoice.belongsTo(personnel.staff, {foreignKey: 'staff_id'});

invoice.invoice.hasMany(invoice.invoiceItem);
invoice.invoiceItem.belongsTo(invoice.invoice);

payments.transaction.hasMany(invoice.invoiceItem);
invoice.invoiceItem.belongsTo(payments.transaction);

inventory.inventory.hasMany(payments.transaction, {foreignKey: 'inventory_id'});
payments.transaction.belongsTo(inventory.inventory, {foreignKey: 'inventory_id'});

location.shelf.hasMany(inventory.batch, {foreignKey: 'batch_location'});
inventory.batch.belongsTo(location.shelf, {foreignKey: 'batch_location'});

inventory.batch.belongsToMany(inventory.product, {
	through: inventory.inventory,
	foreignKey: 'batch_id'
});
inventory.product.belongsToMany(inventory.batch, {
	through: inventory.inventory,
	foreignKey: 'product_id'
});

location.location.hasMany(location.building, {foreignKey: 'location_id'});
location.building.belongsTo(location.location, {foreignKey: 'location_id'});

location.building.hasMany(location.floor, {foreignKey: 'building_id'});
location.floor.belongsTo(location.building, {foreignKey: 'building_id'});

location.floor.hasMany(location.room, {foreignKey: 'floor_id'});
location.room.belongsTo(location.floor, {foreignKey: 'floor_id'});

location.room.hasMany(location.section, {foreignKey: 'room_id'});
location.section.belongsTo(location.room, {foreignKey: 'room_id'});

location.section.hasMany(location.shelf, {foreignKey: 'section_id'});
location.shelf.belongsTo(location.section, {foreignKey: 'section_id'});

invoice.invoice.hasMany(payments.payment);
payments.payment.belongsTo(invoice.invoice);

payments.payment.hasMany(payments.financialTransaction);
payments.financialTransaction.belongsTo(payments.payment);

payments.financialTransaction.hasOne(payments.transactionType);
payments.transactionType.belongsTo(payments.financialTransaction);

apiRouter.use("/inventory", inventoryRouter);
apiRouter.use("/staff", staffRouter);
apiRouter.use(shopRouter);
apiRouter.use("/server", serverRouter);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
// app.use(middleware);
app.use("/", apiRouter);
app.use((req, res, next) => {
	res.status(404).render("404", {
		pageTitle: "Page Not Found",
		path: "/404",
	});
});

sequelize
	// .sync({ force: true })
	.sync()
	.then((result) => {
		app.listen(env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});
