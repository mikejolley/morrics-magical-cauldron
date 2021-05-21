/**
 * Internal dependencies
 */
import Generator from './generator';
import './style.scss';

const NpcGenerator = () => {
	return (
		<div className="npc-generator">
			<hgroup>
				<h2>NPC Generator</h2>
			</hgroup>
			<Generator />
		</div>
	);
};

export default NpcGenerator;
