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
const employeeRouter = require("./routes/employee");
const shopRouter = require("./routes/shop");
const serverRouter = require("./routes/server");

apiRouter.use(inventoryRouter);
apiRouter.use(productRouter);
apiRouter.use(employeeRouter);
apiRouter.use(shopRouter);
apiRouter.use("/server", serverRouter);

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(middleware);
app.use("/", apiRouter);

sequelize
	.sync()
	.then((result) => {
		app.listen(env.PORT);
	})
	.catch((err) => {
		console.log(err);
	});
