const dotenv = require("dotenv").config();
const multer = require("multer");

const env = process.env;
const imageFolder = "/images/products/";

const isAdmin = (emp_type) => {
	if (emp_type.includes("-A")) {
		return true;
	}
	return false;
}

const cookieTimeout15M = 900000;

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, __dirname + "/../public/images/products");
	},
	filename: (req, file, cb) => {
		console.log(req, file);
		cb(null, file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

const imageUpload = multer({ storage: fileStorage, fileFilter: fileFilter }).single("image");

SERVER_STATUS = {
	UP: "up",
};

module.exports = {
	env,
	SERVER_STATUS,
	isAdmin,
	cookieTimeout15M,
	imageUpload,
	imageFolder,
};
