/**
 * External dependencies
 */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faSkullCrossbones,
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
import Select from '@components/select';
import IconButtonGroup from '@components/icon-button-group';
import ButtonGroup from '@components/button-group';
import Field from '@components/field';
import { useSubmitContent, useSafeDispatch } from '@hooks';
import Success from '@components/success';
import { races } from '@shared/data';
import { contentTypes } from './constants';

export const SubmitContentForm = () => {
	const [ contentType, setContentType ] = useState( 'feature' );
	const currentContentType = contentTypes[ contentType ];
	const [ moral, setMoral ] = useState();
	const [ ethic, setEthic ] = useState();
	const [ gender, setGender ] = useState( 'any' );
	const [ race, setRace ] = useState( [] );
	const [ content, setContent ] = useState( '' );
	const [ success, setSuccess ] = useState();
	const { submitContent, error, setError, status } = useSubmitContent();

	// If the content or type changes, clear status.
	useEffect( () => {
		if ( content ) {
			setSuccess( '' );
			setError( '' );
		}
	}, [ content ] );

	useEffect( () => {
		setSuccess( '' );
		setError( '' );
	}, [ contentType ] );

	const onSuccess = useSafeDispatch( ( data ) => {
		setContent( '' );
		if ( data?.submitCharacterData?.status === 'publish' ) {
			setSuccess( 'Thanks! Your content was successfully submitted!' );
		}
		if ( data?.submitCharacterData?.status === 'pending' ) {
			setSuccess(
				'Thanks! Your content is in the moderation queue and will be approved by an admin.'
			);
		}
	} );

	const onSubmit = ( e ) => {
		e.preventDefault();
		submitContent( {
			content,
			moral,
			ethic,
			race,
			gender,
			type: contentType,
		} ).then( onSuccess );
	};

	return (
		<form onSubmit={ onSubmit } className="submit-content-form">
			{ error && (
				<div className="error-notice">
					<FontAwesomeIcon
						icon={ faSkullCrossbones }
						aria-hidden={ true }
					/>
					<p>{ error }</p>
				</div>
			) }
			{ success && ! error && status === 'resolved' && (
				<Success hero={ false }>{ success }</Success>
			) }
			<section className="submit-content-form_group">
				<Select
					label="Content Type"
					hiddenLabel={ false }
					value={ contentType }
					onChange={ ( value ) => {
						setContentType( value );
					} }
					options={ Object.entries( contentTypes ).map(
						( [ id, { name } ] ) => ( {
							value: id,
							label: name,
						} )
					) }
				/>
				<p className="content-description">
					{ currentContentType.description } Example:{ ' ' }
					<em>{ currentContentType.example }</em>
				</p>
				<Field
					label="Content"
					placeholder="Enter some text..."
					grow={ true }
					onChange={ ( value ) => {
						setContent( value );
					} }
					disabled={ status === 'resolving' }
					value={ content }
				/>
				<ButtonGroup
					label="Race(s)"
					options={ [
						...Object.values( races ).map(
							( { id, singular } ) => ( {
								value: id,
								label: singular,
							} )
						),
					] }
					disabled={ status === 'resolving' }
					selected={ race }
					onClear={ race.length ? () => setRace( [] ) : undefined }
					onChange={ ( value ) => {
						if ( race.includes( value ) ) {
							setRace(
								race.filter( ( item ) => item !== value )
							);
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
						onClear={
							ethic ? () => setEthic( undefined ) : undefined
						}
						onChange={ ( value ) => {
							setEthic( value );
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
						onClear={
							moral ? () => setMoral( undefined ) : undefined
						}
						onChange={ ( value ) => {
							setMoral( value );
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
				<button
					className="button button--center button--large"
					onClick={ onSubmit }
					disabled={ status === 'resolving' }
				>
					Submit Content
				</button>
			</section>
		</form>
	);
};

export default SubmitContentForm;
