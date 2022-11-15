exports.getCurrentDate = () => {
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();

	//prints out in YYYY-MM-DD format
	return `${year}-${month}-${date}`;
};

exports.addDays = (days) => {
	let date_ob = new Date();
	date_ob.setDate(date_ob.getDate() + days);

	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();

	//prints out in YYYY-MM-DD format
	return `${year}-${month}-${date}`;
};
