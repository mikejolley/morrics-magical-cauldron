/**
 * External dependencies
 */
import { useState, useEffect } from 'react';
import { faCampground, faHome } from '@fortawesome/free-solid-svg-icons';
import { faFortAwesome } from '@fortawesome/free-brands-svg-icons';

/**
 * Internal dependencies
 */
import IconButtonGroup from 'components/icon-button-group';

export const TavernOptions = ( { onChange, status } ) => {
	const [ socialClass, setSocialClass ] = useState();

	useEffect( () => {
		onChange( { socialClass } );
	}, [ socialClass ] );

	return (
		<>
			<div className="submit-content-form__selects">
				<IconButtonGroup
					label="Social Class"
					options={ [
						{
							value: 'lower',
							label: 'Lower Class',
							icon: faCampground,
						},
						{
							value: 'middle',
							label: 'Middle Class',
							icon: faHome,
						},
						{
							value: 'upper',
							label: 'Upper Class',
							icon: faFortAwesome,
						},
					] }
					disabled={ status === 'resolving' }
					selected={ socialClass }
					onChange={ ( value ) => {
						setSocialClass(
							value === socialClass ? undefined : value
						);
					} }
				/>
			</div>
		</>
	);
};
export default TavernOptions;
