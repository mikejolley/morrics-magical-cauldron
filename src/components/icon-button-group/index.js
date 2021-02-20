/**
 * External dependencies
 */
import ButtonGroup from '../button-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Internal dependencies
 */
import './style.scss';

const IconButtonGroup = ( props ) => {
	return (
		<ButtonGroup
			{ ...props }
			className="icon-button-group"
			renderOption={ ( option, { disabled, onChange } ) => (
				<IconButton
					{ ...option }
					disabled={ disabled }
					onClick={ () => {
						onChange( option.value );
					} }
				/>
			) }
		/>
	);
};

const IconButton = ( { label, icon = '', onClick, disabled } ) => {
	return (
		<button
			type="button"
			onClick={ onClick }
			disabled={ disabled }
			aria-label={ label }
		>
			{ icon && (
				<FontAwesomeIcon
					icon={ icon }
					aria-hidden={ true }
					fixedWidth
				/>
			) }
			<span>{ label }</span>
		</button>
	);
};

export default IconButtonGroup;
