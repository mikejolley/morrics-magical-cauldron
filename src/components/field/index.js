import TextareaAutosize from 'react-textarea-autosize';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faSkull } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.label Label for field.
 * @param {boolean} props.hideLabel Hide label.
 * @param {string} props.placeholder Placeholder for field.
 * @param {string} props.description Description of field.
 * @param {string} props.value Data to show.
 * @param {boolean} props.grow If true, the field will be a textarea that grows with input.
 * @param {Function} props.onChange Input onChange event.
 * @param {string} props.error Error message.
 * @param {Object} props.props Remaining props.
 */
const Field = ( {
	label,
	hideLabel,
	placeholder,
	description,
	value,
	grow,
	onChange,
	error,
	...props
} ) => {
	const inputProps = {
		...props,
		id: `field-${ label }`,
		placeholder,
		value,
	};
	return (
		<div className={ error ? 'field field--error' : 'field' }>
			<label htmlFor={ `field-${ label }` } aria-hidden={ hideLabel }>
				{ label }
			</label>
			<div className="field-input">
				{ grow === true ? (
					<TextareaAutosize
						{ ...inputProps }
						minRows={ 1 }
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
			{ error && (
				<p className="field__error">
					<FontAwesomeIcon icon={ faSkull } aria-hidden={ true } />
					{ error }
				</p>
			) }
		</div>
	);
};

export default Field;
