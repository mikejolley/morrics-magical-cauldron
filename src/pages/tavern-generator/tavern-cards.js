/**
 * External dependencies
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Tavern from 'components/tavern';

export const Cards = ( { data, onRemove, onReroll } ) => {
	if ( Object.keys( data ).length === 0 ) {
		return (
			<div className="tavern-generator--blank blank-slate">
				<FontAwesomeIcon icon={ faMapSigns } />
				<p>
					Hmm...this place is pretty empty. Maybe you should generate
					a tavern?
				</p>
			</div>
		);
	}
	return (
		<div className="card-list">
			{ Object.entries( data )
				.slice( 0 )
				.reverse()
				.map( ( [ id, { data: tavernData = {}, status } ] ) => {
					return (
						<Tavern
							key={ `${ id }` }
							hasData={ Object.entries( tavernData ).length }
							name={ tavernData.name }
							description={ tavernData.description }
							drink={ tavernData.drink }
							patrons={ tavernData.patrons }
							trait={ tavernData.trait }
							reputation={ tavernData.reputation }
							socialClass={ tavernData.socialClass }
							lifestyle={ tavernData.lifestyle }
							rooms={ tavernData.rooms }
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

export default Cards;
