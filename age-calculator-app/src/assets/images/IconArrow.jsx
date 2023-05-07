export const IconArrow = ({color , stroke, className}) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width='46'
		height='44'
		viewBox='0 0 46 44'
		className={className}
	>
		<g
			fill='none'
			stroke={color || '#FFF'}
			stroke-width={stroke || '2'}
		>
			<path d='M1 22.019C8.333 21.686 23 25.616 23 44M23 44V0M45 22.019C37.667 21.686 23 25.616 23 44' />
		</g>
	</svg>
);
