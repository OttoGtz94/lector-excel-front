import React, { useState } from 'react';
import { ButtonInterface } from '../../interfaces/button.interface';

const Button = ({
	text = 'Nombre boton',
	onClick,
	style,
	type = 'button',
	className,
}: ButtonInterface) => {
	const [hover, setHover] = useState<boolean>(false);

	const styleButton = {
		cursor: 'pointer',
		border: '1px solid transparent',
		padding: '5px',
		transition: '0.6 ease',
		opacity: hover ? '0.7' : '1',
		backgroundColor: style?.bgColor
			? style.bgColor
			: '#217346',
		color: style?.color ? style.color : '#f8f8f8',
		borderRadius: '2px',
	};

	return (
		<button
			className={className}
			type={type}
			style={Object.assign(styleButton, style)}
			onClick={onClick}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}>
			{text.toUpperCase()}
		</button>
	);
};

export default Button;
