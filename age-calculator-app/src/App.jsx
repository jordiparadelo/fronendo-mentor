import "./styles/App.css";
import { useDateReducer } from "./hooks/useDates";
import { useDateInput } from "./hooks/useDateInput";
import { getDuration, getFormData } from "./utils";
import { IconArrow } from "./assets/images/IconArrow";
import { useEffect, useReducer, useState } from "react";

const initialErrorState = {
	day: {
		invalid: false,
		type: "",
		message: "Invalid date",
	},

	month: {
		invalid: false,
		type: "",
		message: "Invalid date",
	},

	year: {
		invalid: false,
		type: "",
		message: "Invalid date",
	},
};

function App() {
	const { days, months, years, updateDates } = useDateReducer();
	const [percentage, setPercentage] = useState(null);
	const { day, month, year, updateInputValue } = useDateInput();
	const { error, setError } = useReducer((state, nextState) => {
		return { ...state, ...nextState };
	}, initialErrorState);

	useEffect(() => {
		let totalDays = days + months * 30;

		const newPercentage = Math.round((100 * totalDays) / 365);

		console.log({ newPercentage, totalDays });

		setPercentage(newPercentage);
	}, [days]);

	function validateInput(input) {
		const { value, id } = input;

		const INPUT_TYPE_VALIDATION = {
			day: () => {
				setError({ message: "Invalid date" });
			},
		};
	}

	function handleSubmit(event) {
		event.preventDefault();
		const { currentTarget: form } = event;
		const today = new Date();

		const formData = getFormData(form);

		const inputDate = new Date(
			`${formData["year"]}, ${formData["month"]}, ${formData["day"]}`
		);

		const timeLeft = getDuration(inputDate, today);

		updateDates({
			days: timeLeft.days,
			months: timeLeft.months,
			years: timeLeft.years,
		});
	}

	function handleInputError({ id, type }) {
		const ERROR_TYPE = {
			minNum: "Value must be a under 0",
			maxNum: "Value must be a under 0",
		};

		ERROR_TYPE[type];
	}

	function handleOnBlur(event) {
		const { value, id, type } = event.target;
		validateInput(value);

		// value === "" && updateInputValue({id, value: initialInputValue[id]})
	}
	function handleOnChange(event) {
		const { value, id } = event.target;

		const isValidInput = value.match(/^-?\d+$/) || value.match(/^$/);

		isValidInput && updateInputValue({ id, value });
	}

	return (
		<div className='countdown-calculator'>
			<form
				onSubmit={handleSubmit}
				className='countdown-calculator__form'
			>
				<div className='form__inputs-wrapper'>
					<div className='form__group'>
						<label htmlFor='day'>Day</label>
						<input
							type='text'
							placeholder='DD'
							id='day'
							onChange={handleOnChange}
							onBlur={handleOnBlur}
							value={day}
							required
						/>
						{/* {console.log({state})} */}
						{/* {error.day.valid && (
							<span className='form__error-message'>
								{error["day"].invalid.message}
							</span>
						)} */}
					</div>
					<div className='form__group'>
						<label htmlFor='month'>Month</label>
						<input
							type='text'
							value={month}
							placeholder='MM'
							id='month'
							onChange={handleOnChange}
							required
						/>
						{/* {error['month'] && <span className='form__error-message'>{errorMessage}</span>} */}
					</div>
					<div className='form__group'>
						<label htmlFor='year'>Year</label>
						<input
							type='text'
							value={year}
							placeholder='YYYY'
							id='year'
							onChange={handleOnChange}
							required
						/>
						{/* {error['year'] && <span className='form__error-message'>{errorMessage}</span>} */}
					</div>
				</div>
				<div className='form__submission-wrapper'>
					<hr />
					<button aria-label='submit'>
						<IconArrow className='icon' />
					</button>
				</div>
			</form>
			<ul className='year-output'>
				<li>
					<span className='year-output__value'>{years}</span>
					<span className='year-output__label'>years</span>
				</li>
				<li>
					<span className='year-output__value'>{months}</span>
					<span className='year-output__label'>months</span>
				</li>
				<li>
					<span className='year-output__value'>{days}</span>
					<span className='year-output__label'>days</span>
				</li>
				{percentage ? (
					<li>
						<span className='year-output__next-year'>
						<span style={{fontSize: '14px', width: '100%'}}>Remaining for your next birthday:</span>
							<span>{percentage}%</span>
							<div className='loader'>
								<span
									className='loader__bar'
									style={{ "--percentage": `${percentage}%` }}
								></span>
							</div>
							{years + 1}
						</span>
					</li>
				) : null}
			</ul>
		</div>
	);
}

export default App;
