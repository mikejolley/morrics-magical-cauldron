/**
 * External dependenices
 */
import { useId } from 'react-id-generator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.label Label element text.
 * @param {string} props.value Current value.
 * @param {Array} props.options Select options.
 * @param {string} props.description Description of field.
 * @param {Array} props.hiddenLabel Should label be hidden.
 * @param {Function} props.onChange Select onChange event.
 */
const Select = ( {
	label,
	value,
	options,
	description,
	onChange,
	hiddenLabel = true,
} ) => {
	const [ htmlId ] = useId();

	return (
		<div className="field select-field">
			<label className={ hiddenLabel ? 'hidden' : '' } htmlFor={ htmlId }>
				{ label }
			</label>
			<div className="field__input">
				<select
					id={ htmlId }
					options={ options }
					onChange={ ( event ) => onChange( event.target.value ) }
					onBlur={ ( event ) => onChange( event.target.value ) }
					value={ value }
				>
					{ options.map(
						( { value: optionValue, label: optionLabel } ) => {
							if ( typeof optionValue === 'object' ) {
								return (
									<optgroup
										label={ optionLabel }
										key={ `select-${ label }-${ optionLabel }` }
									>
										{ optionValue.map(
											( {
												value: subOptionValue,
												label: subOptionLabel,
											} ) => {
												return (
													<option
														key={ `select-${ label }--${ subOptionValue }` }
														value={ subOptionValue }
													>
														{ subOptionLabel }
													</option>
												);
											}
										) }
									</optgroup>
								);
							}
							return (
								<option
									key={ `select-${ label }-${ optionValue }` }
									value={ optionValue }
								>
									{ optionLabel }
								</option>
							);
						}
					) }
				</select>
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

export default Select;
