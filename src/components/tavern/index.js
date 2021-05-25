import { useEffect } from 'react';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import InlineData from '../inline-data';
import ContentList from '../content-list';
import ContentItem from '../content-list/item';
import a from 'indefinite';

const TavernName = ( { name, loading } ) => {
	useEffect( () => {
		ReactTooltip.rebuild();
	}, [] );

	if ( loading || ! name ) {
		return <Loading message={ false } />;
	}

	return (
		<strong data-tip={ name.author ? `Submitted by ${ name.author }` : '' }>
			{ name.content }
		</strong>
	);
};

const Tavern = ( {
	hasData,
	name,
	description,
	drink,
	patrons,
	trait,
	reputation,
	socialClass,
	lifestyle,
	rooms,
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

	let socialClassAlt;

	switch ( socialClass ) {
		case 'lower':
			socialClassAlt = 'low';
			break;
		case 'middle':
			socialClassAlt = 'mid';
			break;
		case 'upper':
			socialClassAlt = 'high';
			break;
	}

	return (
		<div className="card card--tavern">
			{ onRemove && (
				<button className="card__delete" onClick={ onRemove }>
					Delete
				</button>
			) }
			<div className="section tavern-appearance">
				<hgroup>
					<h3>
						<TavernName
							name={ name }
							loading={ isResolving && name === undefined }
						/>
					</h3>
					<h4>
						{ `${ socialClass } Class :: ${ lifestyle } Rooms` }
						<button
							onClick={ () => reroll( 'name' ) }
							className="reroll-button"
							data-tip="Reroll Name"
						>
							<FontAwesomeIcon icon={ faDiceD20 } />
						</button>
					</h4>
				</hgroup>
				<div className="section">
					<p>
						{ `A ${ socialClassAlt } class tavern with ` }
						<InlineData
							prefix={
								reputation
									? a( reputation, { articleOnly: true } )
									: ''
							}
							value={ reputation }
							onClick={ () => reroll( 'reputation' ) }
							suffix="reputation"
						/>
						{ `, known for it's ` }
						<InlineData
							value={ trait }
							onClick={ () => reroll( 'trait' ) }
							suffix={ '. ' }
						/>
						<InlineData
							value={ rooms }
							prefix="There "
							suffix=" available."
							onClick={ () => reroll( 'rooms' ) }
						/>
					</p>
				</div>
				<div className="section">
					<ContentList>
						<ContentItem
							name="Appearance"
							data={ description }
							onReroll={ () => reroll( 'description' ) }
							loading={ isResolving && description === undefined }
						/>
						<ContentItem
							name="Signature Drink"
							data={ drink }
							onReroll={ () => reroll( 'drink' ) }
							loading={ isResolving && drink === undefined }
						/>
						<ContentItem
							name="Patrons"
							data={ patrons }
							onReroll={ () => reroll( 'patrons' ) }
							loading={ isResolving && patrons === undefined }
						/>
					</ContentList>
				</div>
			</div>
		</div>
	);
};
export default Tavern;
