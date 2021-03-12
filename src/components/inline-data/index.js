import './style.scss';
import Loading from '../loading';
import { useId } from 'react-id-generator';

/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string|Object} props.value Data to show.
 * @param {string} props.author Author, if user contributed.
 * @param {Function} props.onClick Ran on click.
 * @param {string} props.prefix Prepended to the value.
 * @param {string} props.suffix Appended to the value.
 * @param {boolean} props.loading True when loading content.
 */
const InlineField = ( {
	value = '-',
	author = '',
	onClick,
	prefix = '',
	suffix = '',
	loading = false,
} ) => {
	const [ htmlId ] = useId();

	if ( loading ) {
		return <Loading className={ `inline-data` } message={ false } />;
	}
	return (
		<label
			htmlFor={ htmlId }
			data-tip={ author ? `Submitted by ${ author }` : '' }
			className={ `inline-data` }
		>
			<button
				id={ htmlId }
				className={ `inline-data__button` }
				onClick={ onClick }
			/>
			<span
				className={ `inline-data__value` }
				dangerouslySetInnerHTML={ {
					__html: `${ prefix } ${ value } ${ suffix }`.trim(),
				} }
			/>
		</label>
	);
};

export default InlineField;
