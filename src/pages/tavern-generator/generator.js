/**
 * Internal dependencies
 */
import Cards from './tavern-cards';
import OptionsForm from './options-form';
import { useTavernGenerator, useGeneratorData } from 'hooks';
import { fromEntriesPolyfill } from 'shared/utils';

const Generator = () => {
	const {
		data: taverns,
		dispatch,
		generateId,
		resolvingData,
		removeData,
		resolveData,
	} = useGeneratorData( 'tavern-generator' );
	const getCallbacks = useTavernGenerator();

	const generate = ( {
		id = generateId(),
		existingData,
		generateOptions,
		fields = null,
		callbackOptions,
	} ) => {
		const { resolveCallbacks } = getCallbacks(
			generateOptions || existingData
		);
		resolvingData( dispatch, id, existingData );
		resolveCallbacks( fields, callbackOptions ).then( ( data ) => {
			if ( ! data ) {
				removeData( dispatch, id );
			} else {
				resolveData( dispatch, id, data );
			}
		} );
	};

	return (
		<>
			<OptionsForm
				onChange={ ( formOptions ) =>
					generate( { generateOptions: formOptions } )
				}
			/>
			<Cards
				data={ taverns }
				onRemove={ ( id ) => removeData( dispatch, id ) }
				onReroll={ ( id, fieldNames, callbackOptions = {} ) => {
					const fields = Array.isArray( fieldNames )
						? fieldNames
						: [ fieldNames ];
					const existingData = fromEntriesPolyfill(
						Object.entries( taverns[ id ].data ).filter(
							( [ key ] ) => ! fields.includes( key )
						)
					);
					generate( { existingData, id, fields, callbackOptions } );
				} }
			/>
		</>
	);
};

export default Generator;
