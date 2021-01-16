/**
 * Renders a form field.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string|Object} props.value Data to show.
 * @param {string} props.author Author, if user contributed.
 * @param {Function} props.reroll Ran on reroll.
 * @param {Function} props.capitalize Use capital letters.
 * @param {string} props.prefix Prepended to the value.
 * @param {string} props.suffix Appended to the value.
 */
const InlineField = ( {
	value = '-',
	author = '',
	reroll,
	capitalize = false,
	prefix = '',
	suffix = '',
} ) => {
	const dataClassName = capitalize ? 'inline-data-value--capitalize' : '';
	return (
		<button className={ `inline-data` } onClick={ reroll }>
			<span className={ `inline-data-value ${ dataClassName }` }>
				{ prefix } { value } { suffix }
			</span>
			{ author && <cite>{ `Submitted by ${ author }` }</cite> }
		</button>
	);
};

export default InlineField;
