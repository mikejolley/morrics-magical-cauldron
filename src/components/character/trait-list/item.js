import { autop } from '@wordpress/autop';
import InlineData from '@components/inline-data';

const TraitItem = ( { name, onReroll, loading, data = {} } ) => {
	return (
		<li className="trait">
			<strong>{ name }</strong>
			<span>
				<InlineData
					value={ autop( data?.content || 'None' ) }
					author={ data?.author?.node?.name || '' }
					onClick={ onReroll }
					loading={ loading }
				/>
			</span>
		</li>
	);
};

export default TraitItem;
