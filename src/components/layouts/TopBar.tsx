import {
	faCircleUser,
	faFileExcel,
} from '@fortawesome/free-regular-svg-icons';
import {
	faArrowRightFromBracket,
	faGear,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useAuth from '../../hooks/useAuth';

const TopBar = () => {
	const { auth } = useAuth();
	return (
		<div className='topBar'>
			<h2>
				<span className='icon'>
					<FontAwesomeIcon icon={faFileExcel} />{' '}
				</span>
				Lector Excel
			</h2>
			<h5 className='user-info'>
				<FontAwesomeIcon icon={faCircleUser} />{' '}
				{auth.name} (<span>{auth.userName}</span>){' '}
			</h5>
			<div className='botonera'>
				<p>
					<FontAwesomeIcon icon={faGear} />
				</p>
				<p>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
					/>
				</p>
			</div>
		</div>
	);
};

export default TopBar;
