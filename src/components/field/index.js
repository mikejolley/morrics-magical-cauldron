import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.label Label for field.
 * @param {string} props.placeholder Placeholder for field.
 * @param {string} props.description Description of field.
 * @param {string} props.value Data to show.
 * @param {boolean} props.grow If true, the field will be a textarea that grows with input.
 * @param {Function} props.onChange Input onChange event.
 * @param {Object} props.props Remaining props.
 */
const Field = ( {
	label,
	placeholder,
	description,
	value,
	grow,
	onChange,
	...props
} ) => {
	const inputProps = {
		...props,
		id: `field-${ label }`,
		placeholder,
		value,
	};
	return (
		<div className="field">
			<label htmlFor={ `field-${ label }` }>{ label }</label>
			<div className="field-input">
				{ grow === true ? (
					<TextareaAutosize
						{ ...inputProps }
						onChange={ ( event ) => onChange( event.target.value ) }
					/>
				) : (
					<input
						type="text"
						{ ...inputProps }
						onChange={ ( event ) => onChange( event.target.value ) }
					/>
				) }
			</div>
			{ description && (
				<p className="field__description">
					<FontAwesomeIcon
						icon={ faInfoCircle }
						aria-hidden={ true }
					/>
					{ description }
				</p>
			) }
		</div>
	);
};

export default Field;
