import { useEffect } from 'react';
import { getRaceProp } from '@shared/utils';
import InlineData from '../inline-data';
import AbilityList from './ability-list';
import TraitList from './trait-list';
import TraitListItem from './trait-list/item';
import './style.scss';
import { alignments, ageDescriptors } from '@shared/data';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const CharacterName = ( { data, status } ) => {
	useEffect( () => {
		ReactTooltip.rebuild();
	}, [] );

	if ( status === 'resolving' && data === undefined ) {
		return <Loading message={ false } />;
	}

	return (
		<strong
			data-tip={
				data?.author?.node.name
					? `Submitted by ${ data.author.node.name }`
					: ''
			}
		>
			{ data.content }
		</strong>
	);
};

const Character = ( { characterData, status, reroll, onRemove } ) => {
	if ( status === 'resolving' && ! characterData ) {
		return <Loading className="character-card" />;
	}
	if ( ! characterData ) {
		return null;
	}
	const {
		name,
		gender,
		age,
		weight,
		height,
		race,
		occupation,
		alignment,
		appearance,
		abilities,
	} = characterData;
	const alignmentData = alignments.find( ( { id } ) => id === alignment );
	return (
		<div className="character-card">
			{ onRemove && (
				<button className="character-card__delete" onClick={ onRemove }>
					Delete
				</button>
			) }
			<div className="section character-appearance">
				<hgroup>
					<h3>
						<CharacterName data={ name } status={ status } />
					</h3>
					<h4>
						{ `${
							alignmentData?.description
						} :: ${ gender } ${ getRaceProp( race, 'singular' ) }` }
						<button
							onClick={ () =>
								reroll( 'name', { source: 'generate' } )
							}
							className="reroll-button"
							data-tip="Reroll Name"
						>
							<FontAwesomeIcon icon={ faDiceD20 } />
						</button>
						<button
							onClick={ () => reroll( 'name' ) }
							className="reroll-button"
							data-tip="Reroll User Submitted Name"
						>
							<FontAwesomeIcon icon={ faUserCircle } />
						</button>
					</h4>
				</hgroup>
				<p>
					{ name?.content }
					{ ` is ` }
					<InlineData
						value={ ageDescriptors[ age ] || 'an adult' }
						onClick={ () => reroll( 'age' ) }
					/>
					{ ` ` }
					<InlineData
						value={ occupation }
						onClick={ () => reroll( 'occupation' ) }
					/>
					{ ` who is ` }
					<InlineData
						value={ weight }
						onClick={ () => reroll( 'weight' ) }
					/>
					{ ` and stands ` }
					<InlineData
						value={ height }
						onClick={ () => reroll( 'height' ) }
						suffix=" tall."
					/>
				</p>
				<p>
					<InlineData
						value={ appearance }
						onClick={ () => reroll( 'appearance' ) }
					/>
				</p>
			</div>
			<div className="section">
				<AbilityList
					abilities={ abilities }
					characterAge={ age || 'adult' }
					onClick={ () => reroll( 'abilities' ) }
				/>
			</div>
			<div className="section">
				<TraitList>
					<TraitListItem
						name="Plot Hook"
						data={ characterData.plotHook }
						onReroll={ () => reroll( 'plotHook' ) }
						loading={
							status === 'resolving' &&
							characterData.plotHook === undefined
						}
					/>
					<TraitListItem
						name="Features"
						data={ characterData.feature }
						onReroll={ () => reroll( 'feature' ) }
						loading={
							status === 'resolving' &&
							characterData.feature === undefined
						}
					/>
					<TraitListItem
						name="Personality"
						data={ characterData.personality }
						onReroll={ () => reroll( 'personality' ) }
						loading={
							status === 'resolving' &&
							characterData.personality === undefined
						}
					/>
					<TraitListItem
						name="Ideal"
						data={ characterData.ideal }
						onReroll={ () => reroll( 'ideal' ) }
						loading={
							status === 'resolving' &&
							characterData.ideal === undefined
						}
					/>
					<TraitListItem
						name="Bond"
						data={ characterData.bond }
						onReroll={ () => reroll( 'bond' ) }
						loading={
							status === 'resolving' &&
							characterData.bond === undefined
						}
					/>
					<TraitListItem
						name="Flaw"
						data={ characterData.flaw }
						onReroll={ () => reroll( 'flaw' ) }
						loading={
							status === 'resolving' &&
							characterData.flaw === undefined
						}
					/>
					<TraitListItem
						name="Voice"
						data={ characterData.voice }
						onReroll={ () => reroll( 'voice' ) }
						loading={
							status === 'resolving' &&
							characterData.voice === undefined
						}
					/>
				</TraitList>
			</div>
		</div>
	);
};
export default Character;
