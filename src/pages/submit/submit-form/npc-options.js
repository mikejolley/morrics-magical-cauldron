/**
 * External dependencies
 */
import { useState, useEffect } from 'react';
import {
	faGavel,
	faExpandArrowsAlt,
	faGripLines,
	faSkull,
	faRing,
	faMars,
	faVenus,
	faGenderless,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import IconButtonGroup from 'components/icon-button-group';
import ButtonGroup from 'components/button-group';
import { races } from 'shared/data';

export const NpcOptions = ( { onChange, status } ) => {
	const [ moral, setMoral ] = useState();
	const [ ethic, setEthic ] = useState();
	const [ gender, setGender ] = useState( 'any' );
	const [ race, setRace ] = useState( [] );

	useEffect( () => {
		onChange( { moral, ethic, gender, race } );
	}, [ moral, ethic, gender, race ] );

	return (
		<>
			<ButtonGroup
				label="Race(s)"
				options={ [
					...Object.values( races ).map( ( { id, singular } ) => ( {
						value: id,
						label: singular,
					} ) ),
				] }
				disabled={ status === 'resolving' }
				selected={ race }
				onChange={ ( value ) => {
					if ( race.includes( value ) ) {
						setRace( race.filter( ( item ) => item !== value ) );
					} else {
						setRace( [ ...race, value ] );
					}
				} }
			/>
			<div className="submit-content-form__selects">
				<IconButtonGroup
					label="Ethic Alignment"
					options={ [
						{
							value: 'lawful',
							label: 'Lawful',
							icon: faGavel,
						},
						{
							value: 'neutral',
							label: 'Neutral',
							icon: faGripLines,
						},
						{
							value: 'chaotic',
							label: 'Chaotic',
							icon: faExpandArrowsAlt,
						},
					] }
					disabled={ status === 'resolving' }
					selected={ ethic }
					onChange={ ( value ) => {
						setEthic( value === ethic ? undefined : value );
					} }
				/>
				<IconButtonGroup
					label="Moral Alignment"
					options={ [
						{
							value: 'good',
							label: 'Good',
							icon: faRing,
						},
						{
							value: 'neutral',
							label: 'Neutral',
							icon: faGripLines,
						},
						{
							value: 'evil',
							label: 'Evil',
							icon: faSkull,
						},
					] }
					disabled={ status === 'resolving' }
					selected={ moral }
					onChange={ ( value ) => {
						setMoral( value === moral ? undefined : value );
					} }
				/>
				<IconButtonGroup
					label="Gender"
					options={ [
						{
							value: 'male',
							label: 'Male',
							icon: faMars,
						},
						{
							value: 'any',
							label: 'Any',
							icon: faGenderless,
						},
						{
							value: 'female',
							label: 'Female',
							icon: faVenus,
						},
					] }
					disabled={ status === 'resolving' }
					selected={ gender }
					onChange={ ( value ) => {
						setGender( value );
					} }
				/>
			</div>
		</>
	);
};
export default NpcOptions;
