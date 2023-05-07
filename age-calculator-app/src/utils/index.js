export function getDuration(startDate, endDate) {
	const start = new Date(startDate);
	const end = new Date(endDate);

	let yearDiff = end.getUTCFullYear() - start.getFullYear();
	let monthDiff = end.getUTCMonth() - start.getMonth();
	let dayDiff = end.getUTCDate() - 1 - start.getDate();

	// Check if the difference is greater than end date
	if (dayDiff < 0) {
		dayDiff = 30 - start.getDate() + end.getDate();
		monthDiff -= 1;
	}

	// If the difference between two dates in terms of months and days is negative, adjust the difference to be positive.
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		// Decrement the year difference by one.
		yearDiff--;

		// If the difference between the months is negative, add 12 to wrap around to the previous year.
		if (monthDiff < 0) {
			monthDiff += 12;
		}

		// If the difference between the days is negative, add the number of days in the last month of the end date
		// to dayDiff and decrement the monthDiff by one.
		if (dayDiff < 0) {
			const daysInLastMonth = new Date(
				end.getFullYear(),
				end.getMonth(),
				0
			).getDate();
			dayDiff += daysInLastMonth;
			monthDiff--;
		}
	}

	return {
		years: yearDiff,
		months: monthDiff,
		days: dayDiff,
	};
}

export function getFormData(form) {
	if (!form || form.nodeName !== "FORM") return;

	const inputs = [...form.elements].filter(
		(element) => element.localName === "input"
	);
	let formData = {};
	inputs.map(({ id, value }) => (formData = { ...formData, [id]: value }));

	return formData;
}