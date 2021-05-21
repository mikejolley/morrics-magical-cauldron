import { useEffect } from 'react';
import Loading from '../loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

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

const Tavern = ( { hasData, name, status, reroll, onRemove } ) => {
	const isResolving = status === 'resolving';
	if ( isResolving && ! hasData ) {
		return <Loading className="card" />;
	}

	if ( ! hasData ) {
		return null;
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
						<button
							onClick={ () =>
								reroll( 'name', { source: 'generate' } )
							}
							className="reroll-button"
							data-tip="Reroll Name"
						>
							<FontAwesomeIcon icon={ faDiceD20 } />
						</button>
					</h4>
				</hgroup>
			</div>
		</div>
	);
};
export default Tavern;
