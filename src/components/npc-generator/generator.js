/**
 * External dependencies
 */
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import GeneratorOptions from './generator-options';
import Character from '@components/character';
import { useGenerator } from './use-generator';
import { generateFields } from '@shared/utils';

const Generator = ( { data: sourceData } ) => {
	const [ characters, setCharacters ] = useState( {} );
	const callbacks = useGenerator( sourceData );

	/**
	 * Used by the options form.
	 *
	 * @param {Array} options Array of options.
	 */
	const generate = ( options ) => {
		setCharacters( {
			...characters,
			[ uuidv4() ]: generateFields( callbacks( options ) ),
		} );
	};

	const rerollCharacterData = useCallback(
		( id, fields ) => {
			const currentData = characters[ id ];
			// Uses currentData instead of options so race etc is preserved.
			setCharacters( {
				...characters,
				[ id ]: {
					...currentData,
					...generateFields(
						callbacks(
							( ( { race, alignment, gender } ) => ( {
								race,
								alignment,
								gender,
							} ) )( currentData )
						),
						fields
					),
				},
			} );
		},
		[ setCharacters, characters ]
	);

	return (
		<div className="npc-generator">
			<GeneratorOptions onChange={ generate } />
			{ Object.keys( characters ).length ? (
				<div className="character-cards">
					{ Object.entries( characters )
						.slice( 0 )
						.reverse()
						.map( ( [ id, characterData ] ) => {
							return (
								<Character
									key={ `${ id }` }
									characterData={ characterData }
									onClickData={ ( fields ) => {
										rerollCharacterData( id, fields );
									} }
								/>
							);
						} ) }
				</div>
			) : (
				<div className="npc-generator--blank blank-slate">
					<FontAwesomeIcon icon={ faScroll } />
					<p>
						It seems no one is around...use the form above to
						generate some NPCs.
					</p>
				</div>
			) }
		</div>
	);
};

export default Generator;
