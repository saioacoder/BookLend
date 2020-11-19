import './Input.scss';

const Input = ({
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
		<div className={hasError ? `input input_error${className}` : `input${className}`}>
			<div className="input_field">
				<label>{label}</label>
				<input
					type={type}
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

export default Input;