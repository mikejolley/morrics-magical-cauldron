/**
 * External dependencies
 */
import { useState } from 'react';

/**
 * Internal dependencies
 */
import Select from 'components/select';
import { races, occupations, alignments, genders } from 'shared/data';

const OptionsForm = ( { onChange } ) => {
	const [ options, setOptions ] = useState( {} );
	return (
		<div className="npc-generator__options content-box">
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
					...Object.values( genders ).map( ( { id, name } ) => ( {
						value: id,
						label: name,
					} ) ),
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
			<button
				className="button"
				onClick={ () => {
					onChange( options );
				} }
			>
				Generate
			</button>
		</div>
	);
};

export default OptionsForm;
