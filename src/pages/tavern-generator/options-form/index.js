/**
 * External dependencies
 */
import { useState } from 'react';

const OptionsForm = ( { onChange } ) => {
	const [ options ] = useState( {} );
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
