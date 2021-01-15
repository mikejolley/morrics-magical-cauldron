import TextareaAutosize from 'react-textarea-autosize';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.label Label for field.
 * @param {string} props.value Data to show.
 * @param {boolean} props.grow If true, the field will be a textarea that grows with input.
 * @param {Function} props.reroll Ran on reroll.
 * @param {Object} props.props Remaining props.
 */
const Field = ( { label, value, grow, reroll, ...props } ) => {
	const inputProps = {
		...props,
		id: `field-${ label }`,
		placeholder: label,
		readOnly: true,
		value,
	};
	return (
		<div className="field">
			<label htmlFor={ `field-${ label }` }>{ label }</label>
			<div className="field-input">
				{ grow === true ? (
					<TextareaAutosize { ...inputProps } />
				) : (
					<input type="text" { ...inputProps } />
				) }

				<button className="reroll-button" onClick={ reroll }>
					<span aria-label="Reroll" role="img">
						🎲
					</span>
				</button>
			</div>
		</div>
	);
};

export default Field;
