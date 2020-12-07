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
	type='text',
	url=''
}) => {
	className = className ? ` ${className}` : '';
	return (
		<div className={hasError ? `inputUrl formField formField_error${className}` : `inputUrl formField${className}`}>
			<div className="formField_field">
				<label>{label}</label>
				<span className="inputUrl_start">{url}</span>
				<input
					type={type}
					id={id}
					name={id}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>
			</div>
			{(hasError && errorMessage) && <p className="formField_errorMessage">{errorMessage}</p>}
		</div>
	);
};

export default InputUrl;