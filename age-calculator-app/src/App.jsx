import { useEffect, useReducer, useState } from "react";
import "./styles/App.css";

const initialState = {
	days: 0,
	months: 0,
	years: 0,
};

function getDuration(startDate, endDate) {
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

function getFormData(form) {
	if (!form || form.nodeName !== "FORM") return;

	const inputs = [...form.elements].filter(
		(element) => element.localName === "input"
	);
	let formData = {};
	inputs.map(({ id, value }) => (formData = { ...formData, [id]: value }));

	return formData;
}

function reducer(state, action) {
	switch (action.type) {
		case "UPDATE_DATES":
			return {
				days: action.payload.days,
				months: action.payload.months,
				years: action.payload.years,
			};
		default:
			return state;
	}
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	function handleSubmit(event) {
		event.preventDefault();
		const { currentTarget: form } = event;
		const today = new Date();

		const formData = getFormData(form);

		const inputDate = new Date(
			`${formData["year"]}, ${formData["month"]}, ${formData["day"]}`
		);

		const timeLeft = getDuration(inputDate, today);
		// console.log(new Date(difference))

		dispatch({
			type: "UPDATE_DATES",
			payload: {
				days: timeLeft.days,
				months: timeLeft.months,
				years: timeLeft.years,
			},
		});
	}

	const maxYear = new Date().getFullYear();

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='form_group'>
					<label htmlFor='day'>Day</label>
					<input
						type='number'
						id='day'
						min='1'
						max='30'
					/>
				</div>
				<div className='form_group'>
					<label htmlFor='month'>Month</label>
					<input
						type='number'
						id='month'
						min='1'
						max='12'
					/>
				</div>
				<div className='form_group'>
					<label htmlFor='year'>Year</label>
					<input
						type='number'
						id='year'
						min='0'
						max={maxYear}
					/>
				</div>
				<button>Submit</button>
			</form>
			<ul className='year-output'>
				<li>
					<span className='year-output__value'>{state.years}</span>
					<span className='year-output__label'>years</span>
				</li>
				<li>
					<span className='year-output__value'>{state.months}</span>
					<span className='year-output__label'>months</span>
				</li>
				<li>
					<span className='year-output__value'>{state.days}</span>
					<span className='year-output__label'>days</span>
				</li>
			</ul>
		</>
	);
}

export default App;
