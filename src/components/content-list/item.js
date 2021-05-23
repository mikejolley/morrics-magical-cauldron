import { autop } from '@wordpress/autop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import Loading from '../loading';

const ContentBody = ( { author, content, loading } ) => {
	if ( loading ) {
		return <Loading message={ false } />;
	}
	return (
		<div>
			<div
				dangerouslySetInnerHTML={ {
					__html: content,
				} }
			/>
			{ author && <cite>{ `Submitted by ${ author }` }</cite> }
		</div>
	);
};

const ContentItem = ( { name, onReroll, loading, data = {} } ) => {
	const author =
		data?.author && data.author !== 'mikejolley' ? data.author : '';
	const content = autop( data?.content || 'None' );

	return (
		<li className="content">
			<strong>{ name }</strong>
			<ContentBody
				author={ author }
				content={ content }
				loading={ loading }
			/>
			<span className="content__actions">
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

export default ContentItem;
