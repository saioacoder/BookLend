import './InputUrl.scss';

const InputUrl = ({
	id,
	label,
	value,
	placeholder,
	hasError,
	errorMessage,
	onChange,
	className,
	type='text'
}) => {
	className = className ? ` ${className}` : '';
	return (
		<div className={hasError ? `inputUrl inputUrl_error${className}` : `inputUrl${className}`}>
			<div className="inputUrl_field">
				<label>{label}</label>
				<span className="inputUrl_start">https://www.booklet.com/</span>
				<input
					type={type}
					id={id}
					name={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
			{(hasError && errorMessage) && <p className="inputUrl_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default InputUrl;