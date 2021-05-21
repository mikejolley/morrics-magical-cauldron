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
		<div className="character-cards">
			{ Object.entries( characters )
				.slice( 0 )
				.reverse()
				.map( ( [ id, characterData ] ) => {
					return (
						<Character
							key={ `${ id }` }
							characterName={ characterData?.data?.name }
							characterAge={
								ageDescriptors[
									characterData?.data?.age || 'adult'
								]
							}
							characterRace={ getRaceProp(
								characterData?.data?.race || 'human',
								'singular'
							) }
							characterAlignment={
								alignments.find(
									( { id: alignmentId } ) =>
										alignmentId ===
										characterData?.data?.alignment
								)?.description
							}
							characterGender={
								characterData?.data?.gender || 'male'
							}
							characterAppearance={
								characterData?.data?.appearance
							}
							characterOccupation={
								characterData?.data?.occupation
							}
							characterWeight={ characterData?.data?.weight }
							characterHeight={ characterData?.data?.height }
							abilities={ characterData?.data?.abilities }
							plotHook={ characterData?.data?.plotHook }
							feature={ characterData?.data?.feature }
							personality={ characterData?.data?.personality }
							ideal={ characterData?.data?.ideal }
							bond={ characterData?.data?.bond }
							flaw={ characterData?.data?.flaw }
							voice={ characterData?.data?.voice }
							status={ characterData?.status }
							hasData={ Boolean( characterData?.data ) }
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
