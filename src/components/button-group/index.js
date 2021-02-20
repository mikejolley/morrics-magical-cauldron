/**
 * External dependencies
 */
import { useId } from 'react-id-generator';

/**
 * Internal dependencies
 */
import './style.scss';

const defaultRenderOption = ( option, { disabled, onChange } ) => (
	<IconButton
		{ ...option }
		disabled={ disabled }
		onClick={ () => {
			onChange( option.value );
		} }
	/>
);

const ButtonGroup = ( {
	label,
	selected,
	options,
	onChange,
	onClear,
	disabled,
	className = '',
	renderOption = defaultRenderOption,
} ) => {
	const [ htmlId ] = useId();

	return (
		<div className={ `field button-group ${ className }` }>
			<label htmlFor={ htmlId }>{ label }</label>
			{ onClear && (
				<button
					type="button"
					onClick={ onClear }
					disabled={ disabled }
					className="link-button button-group__clear"
				>
					Clear
				</button>
			) }
			<ul id={ htmlId }>
				{ options.map( ( option ) => (
					<li
						key={ option.value }
						className={
							( Array.isArray( selected ) &&
								selected.includes( option.value ) ) ||
							selected === option.value
								? 'selected'
								: ''
						}
					>
						{ renderOption( option, { disabled, onChange } ) }
					</li>
				) ) }
			</ul>
		</div>
	);
};

const IconButton = ( { label, onClick, disabled } ) => {
	return (
		<button
			type="button"
			onClick={ onClick }
			disabled={ disabled }
			aria-label={ label }
		>
			<span>{ label }</span>
		</button>
	);
};

export default ButtonGroup;
