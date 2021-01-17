/**
 * External dependenices
 */
import { useId } from 'react-id-generator';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.label Label element text.
 * @param {string} props.value Current value.
 * @param {Array} props.options Select options.
 * @param {Function} props.onChange Select onChange event.
 */
const Select = ( { label, value, options, onChange } ) => {
	const [ htmlId ] = useId();

	return (
		<div className="select-field">
			<label htmlFor={ htmlId }>{ label }</label>
			<div className="field-input">
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
		</div>
	);
};

export default Select;
