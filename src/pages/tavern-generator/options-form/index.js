/**
 * External dependencies
 */
import { useState } from 'react';

const OptionsForm = ( { onChange } ) => {
	const [ options, setOptions ] = useState( {} );
	return (
		<div className="tavern-generator__options content-box">
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
