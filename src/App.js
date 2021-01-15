/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import InlineData from './components/inline-data';
import NpcOptions from './components/npc-options';
import AbilityItem from './components/ability-item';
import { getAbiltyScore } from './utils';
import { npc, generateAll, generateFields } from './data/generators';
import './App.scss';

/**
 * TODO:
 * Submissions
 * Split NPC component out
 * Database integration
 * More data
 * Move CSS to components
 * Move data under each component, e.g. npc/data npc/generator
 * Make fields in the generate form un-rerollable. Use that to pull in all JSON from DB.
 * https://docs.netlify.com/visitor-access/identity/
 * https://community.netlify.com/t/support-guide-understanding-and-using-netlifys-api/160
 * https://open-api.netlify.com/#operation/listMembersForAccount
 * https://fill-fauna.now.sh/
 */

// APP will become NPC component.
function App() {
	const [ options, setOptions ] = useState( {
		race: '',
		gender: '',
		occupation: '',
		alignment: '',
	} );
	const npcData = npc( options );
	const [ data, setData ] = useState( () => generateAll( npcData ) );

	const reroll = ( fields ) => {
		setData( { ...data, ...generateFields( npcData, fields ) } );
	};

	return (
		<div className="app">
			<header className="site-header">D+R NPC Generator</header>
			<div className="site-content">
				<div className="generator-wrapper">
					<div className="section section-flex">
						<NpcOptions
							options={ options }
							setOptions={ setOptions }
							onDone={ () => setData( generateAll( npcData ) ) }
						/>
					</div>
					<div className="section character-appearance">
						<hgroup>
							<h3>
								<InlineData
									value={ data.name }
									reroll={ () => reroll( 'name' ) }
								/>
							</h3>
							<h4>
								<InlineData
									value={ data.alignment.description }
									reroll={ () => reroll( 'alignment' ) }
								/>{ ' ' }
								::{ ' ' }
								<InlineData
									value={ data.occupation }
									reroll={ () => reroll( 'occupation' ) }
								/>
							</h4>
						</hgroup>
						<p>
							<InlineData
								value={ data.name }
								reroll={ () => reroll( 'name' ) }
								capitalize={ true }
							/>
							{ ` is ` }
							<InlineData
								value={ data.age }
								reroll={ () => reroll( 'age' ) }
							/>
							{ ` ` }
							<InlineData
								value={ data.gender }
								reroll={ () => reroll( 'gender' ) }
							/>
							{ `, ` }
							<InlineData
								value={ data.race }
								reroll={ () =>
									reroll( [ 'race', 'height', 'appearance' ] )
								}
								capitalize={ true }
							/>
							{ ` who is ` }
							<InlineData
								value={ data.weight }
								reroll={ () => reroll( 'weight' ) }
							/>
							{ ` and stands ` }
							<InlineData
								value={ data.height }
								reroll={ () => reroll( 'height' ) }
								suffix=" tall."
							/>
						</p>
						<p>
							<InlineData
								value={ data.appearance }
								reroll={ () => reroll( 'appearance' ) }
							/>
						</p>
						<p>
							<InlineData
								value={ data.clothing.description }
								author={ data.clothing.author }
								reroll={ () => reroll( 'clothing' ) }
							/>
						</p>
						<p>
							<InlineData
								value={ data.distinguishingMark.description }
								author={ data.distinguishingMark.author }
								reroll={ () => reroll( 'distinguishingMark' ) }
							/>
						</p>
					</div>
					<div className="section">
						<ul className="attributes">
							<AbilityItem
								name="Dex"
								score={ getAbiltyScore(
									'dex',
									data.abilities,
									data.age
								) }
							/>
							<AbilityItem
								name="Con"
								score={ getAbiltyScore(
									'con',
									data.abilities,
									data.age
								) }
							/>
							<AbilityItem
								name="Int"
								score={ getAbiltyScore(
									'int',
									data.abilities,
									data.age
								) }
							/>
							<AbilityItem
								name="Wis"
								score={ getAbiltyScore(
									'wis',
									data.abilities,
									data.age
								) }
							/>
							<AbilityItem
								name="Cha"
								score={ getAbiltyScore(
									'cha',
									data.abilities,
									data.age
								) }
							/>
							<li>
								<button
									onClick={ () => reroll( 'abilities' ) }
									className="reroll-button"
								>
									<span aria-label="Reroll" role="img">
										🎲
									</span>
								</button>
							</li>
						</ul>
					</div>
					<div className="section">
						<ul className="character-traits">
							<li>
								<strong>Personality</strong>
								<span>
									<InlineData
										value={ data.personality.description }
										author={ data.personality.author }
										reroll={ () => reroll( 'personality' ) }
									/>
								</span>
							</li>
							<li>
								<strong>Ideal</strong>
								<span>
									<InlineData
										value={ data.ideal.description }
										author={ data.ideal.author }
										reroll={ () => reroll( 'ideal' ) }
									/>
								</span>
							</li>
							<li>
								<strong>Bond</strong>
								<span>
									<InlineData
										value={ data.bond.description }
										author={ data.bond.author }
										reroll={ () => reroll( 'bond' ) }
									/>
								</span>
							</li>
							<li>
								<strong>Flaw</strong>
								<span>
									<InlineData
										value={ data.flaw.description }
										author={ data.flaw.author }
										reroll={ () => reroll( 'flaw' ) }
									/>
								</span>
							</li>
							<li>
								<strong>Voice</strong>
								<span>
									<InlineData
										value={ data.voice.description }
										author={ data.voice.author }
										reroll={ () => reroll( 'voice' ) }
									/>
								</span>
							</li>
							<li>
								<strong>Plot Hook</strong>
								<span>
									<InlineData
										value={ data.plotHook.description }
										author={ data.plotHook.author }
										reroll={ () => reroll( 'plotHook' ) }
									/>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
