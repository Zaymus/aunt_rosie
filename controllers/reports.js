
exports.getReports = (req, res, next) => {
  res.render("reports/reports", {
    pageTitle: "Reports",
    selected: "reports",
  });
}