/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Character from '@components/character';

export const CharacterCards = ( { characters, onRemove, reroll } ) => {
	if ( Object.keys( characters ).length === 0 ) {
		return (
			<div className="npc-generator--blank blank-slate">
				<FontAwesomeIcon icon={ faScroll } />
				<p>
					It seems no one is around...use the form above to generate
					some NPCs.
				</p>
			</div>
		);
	}
	return (
		<div className="character-cards">
			{ Object.entries( characters )
				.slice( 0 )
				.reverse()
				.map( ( [ id, characterData ] ) => {
					return (
						<Character
							key={ `${ id }` }
							status={ characterData?.status }
							characterData={ characterData?.data }
							reroll={ ( fields, options ) => {
								reroll( id, fields, options );
							} }
							onRemove={ () => {
								onRemove( id );
							} }
						/>
					);
				} ) }
		</div>
	);
};

export default CharacterCards;
