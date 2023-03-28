import axios from 'axios';
import { createContext, useState } from 'react';
import { UsuariosExcel } from '../interfaces/users.excel.interface';
import { alertToastify } from '../helpers/index';

interface props {
	children: JSX.Element | JSX.Element[];
}

interface stateInitial {
	//usuarios: any;
	//setUsuariosExcel: UsuariosExcel[];
	usuariosExcel: UsuariosExcel[];
	setStateUsersExcel: (users: UsuariosExcel[]) => void;
	saveInBD: (listaUsuarios: UsuariosExcel[]) => void;
	updateInBD: (usuario: UsuariosExcel) => void;
}

const ExcelContext = createContext<stateInitial>(
	{} as stateInitial,
);

const ExcelProvider = ({ children }: props) => {
	const [usuariosExcel, setUsuariosExcel] = useState<
		UsuariosExcel[]
	>([]);

	const setStateUsersExcel = (users: UsuariosExcel[]) => {
		//console.log(users);
		const arrUsuarios: UsuariosExcel[] = [];

		users.forEach((user: any, index: number) => {
			let obj: any = {};
			for (const prop in user) {
				obj[
					prop
						.trim()
						.toLocaleLowerCase()
						.replace(/ /g, '_')
				] = user[prop];
			}
			obj.id = index + 1;
			arrUsuarios.push(obj);
		});
		console.log(arrUsuarios);

		setUsuariosExcel(arrUsuarios);
	};

	const saveInBD = async (
		listaUsuarios: UsuariosExcel[],
	) => {
		console.log(listaUsuarios);
		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/save-excel`,
				{ users: listaUsuarios },
			);
			console.log(data, typeof data.duplicates);
			if (typeof data.duplicates !== 'string') {
				if (listaUsuarios.length === 1) {
					alertToastify(
						'warn',
						'El registro ya existe',
					);
				} else {
					alertToastify(
						'warn',
						'Se guardo correctamente pero hubo duplicados',
					);
				}
			} else {
				alertToastify('success', data.msg);
			}
		} catch (error: any) {
			alertToastify('error', error.responde.data.msg);
		}
	};

	const updateInBD = async (usuario: UsuariosExcel) => {
		console.log(usuario);
		try {
			/* const res = axios.post(`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/edit-excel/`,) */
		} catch (error) {}
	};

	return (
		<ExcelContext.Provider
			value={{
				usuariosExcel,
				setStateUsersExcel,
				saveInBD,
				updateInBD,
			}}>
			{children}
		</ExcelContext.Provider>
	);
};

export { ExcelProvider };
export default ExcelContext;
