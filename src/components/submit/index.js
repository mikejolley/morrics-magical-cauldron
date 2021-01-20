/**
 * External dependencies
 */
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import Select from '@components/select';
import Field from '@components/field';
import './style.scss';

// List of content types users can submit to the site.
const contentTypes = {
	clothing: {
		name: 'Character: Clothing',
		example: 'They are wearing a long, purple robe.',
	},
	distinguishingMarks: {
		name: 'Character: Distinguishing Marks',
		example: 'They have a wooden leg.',
	},
	personality: {
		name: 'Character: Personality traits',
		example: 'Cheerful, but annoyingly so.',
	},
	ideal: {
		name: 'Character: Ideal',
		example: 'Believes everyone deserves a second chance.',
	},
	bond: {
		name: 'Character: Bond',
		example: 'Their lifelong friend, Dave.',
	},
	flaw: {
		name: 'Character: Flaw',
		example: 'Cannot be trusted.',
	},
	voice: {
		name: 'Character: Voice/accent',
		example: 'Speaks with a Northern accent.',
	},
	plotHook: {
		name: 'Character: Plot hook',
		example: 'They need someone to fetch an important item.',
	},
};

const Submit = () => {
	const [ contentType, setContentType ] = useState( 'clothing' );
	const [ moral, setMoral ] = useState( 'any' );
	const [ ethic, setEthic ] = useState( 'any' );
	const currentContentType = contentTypes[ contentType ];
	return (
		<div className="section submit-content">
			<hgroup>
				<h2>Submit Content</h2>
			</hgroup>
			<p>
				Submit content to the random content generators below. Please
				keep it clean and be mindful of others :)
			</p>
			<div className="submit-content-form">
				<Select
					label="Type of content"
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
				<blockquote>
					<FontAwesomeIcon
						icon={ faQuoteLeft }
						aria-hidden={ true }
					/>
					<p>{ currentContentType.example }</p>
				</blockquote>
				<div className="submit-content-form__group">
					<Field
						label="Content"
						placeholder="Enter some text"
						description="Please use third-person language and they/them/their pronouns."
						grow={ true }
					/>
					<div className="submit-content-form__alignment">
						<Select
							label="Moral Alignment"
							hiddenLabel={ false }
							value={ moral }
							onChange={ ( value ) => {
								setMoral( value );
							} }
							options={ [
								{
									value: 'any',
									label: 'Any',
								},
								{
									value: 'good',
									label: 'Good',
								},
								{
									value: 'neutral',
									label: 'Neutral',
								},
								{
									value: 'evil',
									label: 'Evil',
								},
							] }
						/>
						<Select
							label="Ethic Alignment"
							hiddenLabel={ false }
							value={ ethic }
							onChange={ ( value ) => {
								setEthic( value );
							} }
							options={ [
								{
									value: 'any',
									label: 'Any',
								},
								{
									value: 'lawful',
									label: 'Lawful',
								},
								{
									value: 'neutral',
									label: 'Neutral',
								},
								{
									value: 'chaotic',
									label: 'Chaotic',
								},
							] }
						/>
					</div>
				</div>
				<button className="button button--center button--large">
					Submit
				</button>
			</div>
		</div>
	);
};

export default Submit;
