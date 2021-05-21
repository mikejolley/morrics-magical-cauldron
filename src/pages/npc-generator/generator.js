/**
 * Internal dependencies
 */
import CharacterCards from './character-cards';
import OptionsForm from './options-form';
import { useNpcGenerator, useGeneratorData } from 'hooks';
import { fromEntriesPolyfill } from 'shared/utils';

const Generator = () => {
	const {
		data: characters,
		dispatch,
		generateId,
		resolvingData,
		removeData,
		resolveData,
	} = useGeneratorData( 'npc-generator' );
	const getCallbacks = useNpcGenerator();

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
			<CharacterCards
				characters={ characters }
				onRemove={ ( id ) => removeData( dispatch, id ) }
				onReroll={ ( id, fieldNames, callbackOptions = {} ) => {
					const fields = Array.isArray( fieldNames )
						? fieldNames
						: [ fieldNames ];
					const existingData = fromEntriesPolyfill(
						Object.entries( characters[ id ].data ).filter(
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
