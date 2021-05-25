/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import Select from 'components/select';

const OptionsForm = ( { onChange } ) => {
	const [ options, setOptions ] = useState( {} );
	return (
		<div className="tavern-generator__options content-box">
			<Select
				label="Social Class"
				value={ options.socialClass }
				onChange={ ( value ) =>
					setOptions( { ...options, socialClass: value } )
				}
				options={ [
					{
						value: '',
						label: 'Any Social Class',
					},
					{
						value: 'lower',
						label: 'Lower Class',
					},
					{
						value: 'middle',
						label: 'Middle Class',
					},
					{
						value: 'upper',
						label: 'Upper Class',
					},
				] }
			/>
			<button
				className="button"
				onClick={ () => {
					onChange( options );
				} }
			>
				Generate
			</button>
		</div>
	);
};

export default OptionsForm;
