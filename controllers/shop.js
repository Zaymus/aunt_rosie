exports.getIndex = (req, res, next) => {
	res.render("index", {
		pageTitle: "Dashboard",
		selected: "none"
	});
};
