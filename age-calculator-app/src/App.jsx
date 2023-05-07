import "./styles/App.css";
import { useDateReducer } from "./hooks/useDates";
import { getDuration, getFormData } from "./utils";
import { IconArrow } from "./assets/images/IconArrow";

function App() {
	const { days, months, years, updateDates } = useDateReducer();

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

	const maxYear = new Date().getFullYear();

	return (
		<dvi className='countdown-calculator'>
			<form
				onSubmit={handleSubmit}
				className='countdown-calculator__form'
			>
				<div className='form_inputs-wrapper'>
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
							min='100'
							max={maxYear}
						/>
					</div>
				</div>
				<div className='form_submission-wrapper'>
					<hr />
					<button aria-label="submit"><IconArrow className="icon"/></button>
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
			</ul>
		</dvi>
	);
}

export default App;
