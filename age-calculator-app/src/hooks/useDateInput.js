import { useReducer } from "react";

const initialInputValue = {
	day: "",
	month: "",
	year: "",
};

const DATE_ACTION_TYPES = {
	UPDATE_DAY: "UPDATE_DAY",
	UPDATE_MONTH: "UPDATE_MONTH",
	UPDATE_YEAR: "UPDATE_YEAR",
};

function handleError({id, msg}){
	console.log({id, msg})
}

function reducer(state, action) {
	switch (action.type) {
		case DATE_ACTION_TYPES.UPDATE_DAY:
			return {
				day: action.payload,
			};
		case DATE_ACTION_TYPES.UPDATE_MONTH:
			return {
				month: action.payload,
			};
		case DATE_ACTION_TYPES.UPDATE_YEAR:
			return {
				year: action.payload,
			};

		default:
			return state;
	}
}

export function useDateInput() {
	const [state, dispatch] = useReducer(reducer, initialInputValue);
	const { day, month, year } = state;

	console.log({ day, month, year })

	function updateInputValue({ id, value }) {
		const INPUT_TYPE = {
			day: () => {
				if (value.length > 2) return;
				if (value > 31) {
					handleError({id, msg:'Mus be a valid day'})
					dispatch({
						type: "UPDATE_DAY",
						payload: 31,
					});
				};
				if (value === 0) return;

				dispatch({
					type: "UPDATE_DAY",
					payload: value,
				});
			},
			month: () => {
				if (value > 12) return;

				dispatch({
					type: "UPDATE_MONTH",
					payload: value,
				});
			},
			year: () => {
				if (value.length > 4) return;
				dispatch({
					type: "UPDATE_YEAR",
					payload: value,
				});
			},
		};
		value !== " " ? INPUT_TYPE[id]() : "DD";
	}

	return { day, month, year, initialInputValue, updateInputValue };
}
