import InlineData from '@components/inline-data';

const TraitItem = ( { name, onReroll, data = {} } ) => {
	return (
		<li className="trait">
			<strong>{ name }</strong>
			<span>
				<InlineData
					value={ data.description || 'None' }
					author={ data.author || '' }
					onClick={ onReroll }
				/>
			</span>
		</li>
	);
};

export default TraitItem;
