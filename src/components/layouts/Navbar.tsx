import { faFileExcel } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='navbar'>
			<h2>
				<span className='icon'>
					<FontAwesomeIcon icon={faFileExcel} />{' '}
				</span>
				Lector Excel
			</h2>
			<ul>
				<Link to='/' className='link'>
					Home
				</Link>
				<Link to='/account' className='link'>
					Iniciar Sesión
				</Link>
				<Link to='/account/register' className='link'>
					Registrar
				</Link>
			</ul>
		</div>
	);
};

export default Navbar;
