import { useEffect } from 'react';
import InlineData from '../inline-data';
import AbilityList from './ability-list';
import ContentList from '../content-list';
import ContentItem from '../content-list/item';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const CharacterName = ( { characterName, loading } ) => {
	useEffect( () => {
		ReactTooltip.rebuild();
	}, [] );

	if ( loading ) {
		return <Loading message={ false } />;
	}

	return (
		<strong
			data-tip={
				characterName.author
					? `Submitted by ${ characterName.author }`
					: ''
			}
		>
			{ characterName.content }
		</strong>
	);
};

const Character = ( {
	hasData,
	characterName,
	characterAlignment,
	characterAge,
	characterRace,
	characterGender,
	characterAppearance,
	characterOccupation,
	characterWeight,
	characterHeight,
	abilities,
	plotHook,
	feature,
	personality,
	ideal,
	bond,
	flaw,
	voice,
	status,
	reroll,
	onRemove,
} ) => {
	const isResolving = status === 'resolving';
	if ( isResolving && ! hasData ) {
		return <Loading className="card" />;
	}
	if ( ! hasData ) {
		return null;
	}
	return (
		<div className="card card--character">
			{ onRemove && (
				<button className="card__delete" onClick={ onRemove }>
					Delete
				</button>
			) }
			<div className="section character-appearance">
				<hgroup>
					<h3>
						<CharacterName
							characterName={ characterName }
							loading={
								isResolving && characterName === undefined
							}
						/>
					</h3>
					<h4>
						{ `${ characterAlignment } :: ${ characterGender } ${ characterRace }` }
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
					<InlineData
						value={ characterAge }
						onClick={ () => reroll( 'age' ) }
					/>
					{ ` ` }
					<InlineData
						value={ characterOccupation }
						onClick={ () => reroll( 'occupation' ) }
					/>
					{ ` who is ` }
					<InlineData
						value={ characterWeight }
						onClick={ () => reroll( 'weight' ) }
					/>
					{ ` and stands ` }
					<InlineData
						value={ characterHeight }
						onClick={ () => reroll( 'height' ) }
						suffix=" tall."
					/>{ ' ' }
					<InlineData
						value={ characterAppearance }
						onClick={ () => reroll( 'appearance' ) }
					/>
				</p>
			</div>
			<div className="section">
				<AbilityList
					abilities={ abilities }
					onClick={ () => reroll( 'abilities' ) }
				/>
			</div>
			<div className="section">
				<ContentList>
					<ContentItem
						name="Plot Hook"
						data={ plotHook }
						onReroll={ () => reroll( 'plotHook' ) }
						loading={ isResolving && plotHook === undefined }
					/>
					<ContentItem
						name="Features"
						data={ feature }
						onReroll={ () => reroll( 'feature' ) }
						loading={ isResolving && feature === undefined }
					/>
					<ContentItem
						name="Personality"
						data={ personality }
						onReroll={ () => reroll( 'personality' ) }
						loading={ isResolving && personality === undefined }
					/>
					<ContentItem
						name="Ideal"
						data={ ideal }
						onReroll={ () => reroll( 'ideal' ) }
						loading={ isResolving && ideal === undefined }
					/>
					<ContentItem
						name="Bond"
						data={ bond }
						onReroll={ () => reroll( 'bond' ) }
						loading={ isResolving && bond === undefined }
					/>
					<ContentItem
						name="Flaw"
						data={ flaw }
						onReroll={ () => reroll( 'flaw' ) }
						loading={ isResolving && flaw === undefined }
					/>
					<ContentItem
						name="Voice"
						data={ voice }
						onReroll={ () => reroll( 'voice' ) }
						loading={ isResolving && voice === undefined }
					/>
				</ContentList>
			</div>
		</div>
	);
};
export default Character;
