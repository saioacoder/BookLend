import './InputSearch.scss';

const InputSearch = ({
	id,
	label,
	value,
	placeholder,
	hasError,
	errorMessage,
	onChange,
	className,
}) => {
	className = className ? ` ${className}` : '';
	return (
		<div className={hasError ? `inputSearch input input_error${className}` : `inputSearch input${className}`}>
			<div className="input_field">
				<label>{label}</label>
				<input
					type="text"
					id={id}
					name={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
			{(hasError && errorMessage) && <p className="input_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default InputSearch;