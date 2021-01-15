/**
 * Internal dependencies
 */
import Select from '../select';
import { races, occupations, alignments } from '../../data/constants';

const NpcOptions = ( { options, setOptions, onDone } ) => {
	return (
		<>
			<Select
				label="Race"
				value={ options.race }
				onChange={ ( value ) =>
					setOptions( { ...options, race: value } )
				}
				options={ [
					{
						value: '',
						label: 'Any Race',
					},
					...Object.values( races ).map( ( { id, singular } ) => ( {
						value: id,
						label: singular,
					} ) ),
				] }
			/>
			<Select
				label="Gender"
				value={ options.gender }
				onChange={ ( value ) =>
					setOptions( { ...options, gender: value } )
				}
				options={ [
					{ value: '', label: 'Any Gender' },
					{ value: 'male', label: 'Male' },
					{ value: 'female', label: 'Female' },
					{ value: 'nonbinary', label: 'Nonbinary' },
				] }
			/>
			<Select
				label="Occupation"
				value={ options.occupation }
				onChange={ ( value ) =>
					setOptions( { ...options, occupation: value } )
				}
				options={ [
					{
						value: '',
						label: 'Any Occupation',
					},
					...Object.values( occupations ).map(
						( { group, occupations: occupationList } ) => ( {
							label: group,
							value: occupationList.map( ( value ) => ( {
								value,
								label: value,
							} ) ),
						} )
					),
				] }
			/>
			<Select
				label="Alignment"
				value={ options.alignment }
				onChange={ ( value ) =>
					setOptions( { ...options, alignment: value } )
				}
				options={ [
					{ value: '', label: 'Any Alignment' },
					...Object.values( alignments ).map(
						( { id, description } ) => ( {
							value: id,
							label: description,
						} )
					),
				] }
			/>
			<button className="button" onClick={ onDone }>
				Generate NPC
			</button>
		</>
	);
};

export default NpcOptions;
