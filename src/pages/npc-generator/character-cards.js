/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScroll } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Character from 'components/character';
import { alignments, ageDescriptors } from 'shared/data';
import { getRaceProp } from 'shared/utils';

export const CharacterCards = ( { characters, onRemove, onReroll } ) => {
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
		<div className="card-list">
			{ Object.entries( characters )
				.slice( 0 )
				.reverse()
				.map( ( [ id, { data: characterData = {}, status } ] ) => {
					return (
						<Character
							key={ `${ id }` }
							hasData={ Object.entries( characterData ).length }
							characterName={ characterData.name }
							characterAge={
								ageDescriptors[ characterData.age || 'adult' ]
							}
							characterRace={ getRaceProp(
								characterData.race || 'human',
								'singular'
							) }
							characterAlignment={
								alignments.find(
									( { id: alignmentId } ) =>
										alignmentId === characterData.alignment
								)?.description
							}
							characterGender={ characterData.gender || 'male' }
							characterAppearance={ characterData.appearance }
							characterOccupation={ characterData.occupation }
							characterWeight={ characterData.weight }
							characterHeight={ characterData.height }
							abilities={ characterData.abilities }
							plotHook={ characterData.plotHook }
							feature={ characterData.feature }
							personality={ characterData.personality }
							ideal={ characterData.ideal }
							bond={ characterData.bond }
							flaw={ characterData.flaw }
							voice={ characterData.voice }
							status={ status }
							reroll={ ( fields, options ) => {
								onReroll( id, fields, options );
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
