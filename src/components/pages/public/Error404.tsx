import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Error404 = () => {
	return (
		<div className='page404'>
			<div className='left'>
				<h4>404</h4>
				<p>Pagina no encontrada</p>
			</div>
			<div className='right'>
				<p className='icon'>
					<FontAwesomeIcon
						icon={faTriangleExclamation}
					/>
				</p>
			</div>
		</div>
	);
};

export default Error404;
