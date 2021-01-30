import TraitItem from './item';
import './style.scss';

const TraitList = ( { traits } ) => {
	return (
		<ul className="trait-list">
			{ traits.map( ( trait ) => (
				<TraitItem
					key={ trait.name }
					name={ trait.name }
					data={ trait.data }
					onReroll={ trait.onReroll }
					loading={ trait.loading }
				/>
			) ) }
		</ul>
	);
};

export default TraitList;
