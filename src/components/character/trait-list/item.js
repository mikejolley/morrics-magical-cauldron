import { autop } from '@wordpress/autop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../loading';

const TraitItemContent = ( { author, content, loading } ) => {
	if ( loading ) {
		return <Loading message={ false } />;
	}
	return (
		<div>
			<div
				className="trait__content"
				dangerouslySetInnerHTML={ {
					__html: content,
				} }
			/>
			{ author && <cite>{ `Submitted by ${ author }` }</cite> }
		</div>
	);
};

const TraitItem = ( { name, onReroll, loading, data = {} } ) => {
	const author = data?.author?.node.name || '';
	const content = autop( data?.content || 'None' );

	return (
		<li className="trait">
			<strong>{ name }</strong>
			<TraitItemContent
				author={ author }
				content={ content }
				loading={ loading }
			/>
			<span className="trait__actions">
				<button
					onClick={ onReroll }
					className="reroll-button"
					data-tip="Reroll Content"
				>
					<FontAwesomeIcon icon={ faDiceD20 } />
				</button>
			</span>
		</li>
	);
};

export default TraitItem;
