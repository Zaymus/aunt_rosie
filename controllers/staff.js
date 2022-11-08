const { staff, hourlyRate } = require("../models/personnel");

exports.getStaff = (req, res, next) => {
	staff
		.findAll()
		.then((staff) => {
			res.json({ staff });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.postNewStaff = (req, res, next) => {
	const name = req.body.name;
	const homeAddress = req.body.home_address;
	const phoneNumber = req.body.phone_number;
	const emailAddress = req.body.email_address;
	const postalCode = req.body.postal_code;
	const empType = req.body.emp_type;
	const rate = req.body.hourly_rate;

	hourlyRate
		.findAll({ where: { rate: rate } })
		.then((rates) => {
			console.log(rates);
			if (rates.length == 0) {
				hourlyRate
					.create({ rate: rate })
					.then((result) => {
						const id = result.dataValues.id;
						staff
							.create({
								name: name,
								emp_type: empType,
								home_address: homeAddress,
								phone_number: phoneNumber,
								email_address: emailAddress,
								postal_code: postalCode,
								hourlyRateId: id,
							})
							.then((result) => {
								res.json({ result });
							})
							.catch((err) => {
								result.destroy();
								res.status(400).json({ err });
							});
					})
					.catch((err) => {
						res.status(400).json({ err });
					});
			} else {
				const id = rates[0].dataValues.id;
				staff
					.create({
						name: name,
						emp_type: empType,
						home_address: homeAddress,
						phone_number: phoneNumber,
						email_address: emailAddress,
						postal_code: postalCode,
						hourlyRateId: id,
					})
					.then((result) => {
						res.json({ result });
					})
					.catch((err) => {
						result.destroy();
						res.status(400).json({ err });
					});
			}
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.getStaffbyId = (req, res, next) => {
	const id = req.params.staffId;
	staff
		.findByPk(id)
		.then((staff) => {
			res.json({ staff });
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.putDeleteStaff = (req, res, next) => {
	const id = req.params.staffId;
	staff
		.findByPk(id)
		.then((staff) => {
			staff.destroy();
			res.json({});
		})
		.catch((err) => {
			res.status(400).json({ err });
		});
};

exports.patchEditStaff = (req, res, next) => {
	const id = req.params.staffId;
	const name = req.body.name;
	const homeAddress = req.body.home_address;
	const phoneNumber = req.body.phone_number;
	const emailAddress = req.body.email_address;
	const postalCode = req.body.postal_code;
	const empType = req.body.emp_type;
	const rate = req.body.hourly_rate;

	hourlyRate.findAll({ where: { rate: rate } }).then((rates) => {
		if (rates.length == 0) {
			hourlyRate
				.create({
					rate: rate,
				})
				.then((result) => {
					var rateId = result.id;
					staff
						.findByPk(id)
						.then((employee) => {
							employee.set({
								name: name,
								home_address: homeAddress,
								phone_number: phoneNumber,
								email_address: emailAddress,
								postal_code: postalCode,
								emp_type: empType,
								hourlyRateId: rateId,
							});

							employee
								.save()
								.then((result) => {
									res.json({});
								})
								.catch((err) => {
									res.status(400).json({ err });
								});
						})
						.catch((err) => {
							res.status(400).json({ err });
						});
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		} else {
			staff
				.findByPk(id)
				.then((employee) => {
					employee.set({
						name: name,
						home_address: homeAddress,
						phone_number: phoneNumber,
						email_address: emailAddress,
						postal_code: postalCode,
						emp_type: empType,
						hourlyRateId: rates[0].dataValues.id,
					});

					employee
						.save()
						.then((result) => {
							res.json({});
						})
						.catch((err) => {
							res.status(400).json({ err });
						});
				})
				.catch((err) => {
					res.status(400).json({ err });
				});
		}
	});
};
