import { useReducer } from "react";

const initialState = {
	days: "--",
	months: "--",
	years: "--",
};

const DATE_ACTION_TYPES = {
    UPDATE_DATES: "UPDATE_DATES"
}

function reducer(state, action) {
	switch (action.type) {
		case DATE_ACTION_TYPES.UPDATE_DATES:
			return {
				days: action.payload.days,
				months: action.payload.months,
				years: action.payload.years,
			};
		default:
			return state;
	}
}

export function useDateReducer() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { days, months, years } = state;

	const updateDates = (dates) =>
		dispatch({
			type: "UPDATE_DATES",
			payload: dates,
		});

	return { days, months, years, updateDates };
}
