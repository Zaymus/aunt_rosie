const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sequelize = require("./util/database");
const { env } = require("./util/constants");

const app = express();
const router = express.Router();

const inventoryRouter = require("./routes/inventory");
const staffRouter = require("./routes/staff");
const shopRouter = require("./routes/shop");
const serverRouter = require("./routes/server");
const apiRouter = require("./routes/api");

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

payments.transactionType.hasMany(invoice.invoice, {foreignKey: 'type_id'});
invoice.invoice.belongsTo(payments.transactionType, {foreignKey: 'type_id'});

invoice.invoice.hasMany(invoice.invoiceItem);
invoice.invoiceItem.belongsTo(invoice.invoice);

personnel.staff.hasMany(invoice.invoice, {foreignKey: 'staff_id'});
invoice.invoice.belongsTo(personnel.staff, {foreignKey: 'staff_id'});

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

router.use("/inventory", inventoryRouter);
router.use("/staff", staffRouter);
router.use(shopRouter);
router.use("/server", serverRouter);
router.use("/api", apiRouter);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);
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
