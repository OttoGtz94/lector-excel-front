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
			!obj.save
				? (obj.save = false)
				: obj.save === true
				? (obj.save = true)
				: (obj.save = false);
			arrUsuarios.push(obj);
		});

		setUsuariosExcel(arrUsuarios);
	};

	const saveInBD = async (
		listaUsuarios: UsuariosExcel[],
	) => {
		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/save-excel`,
				{ users: listaUsuarios },
			);
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
				const newUsuariosExcel: UsuariosExcel[] = [];
				//setUsuariosExcel(newUsuariosExcel);
				usuariosExcel.filter(
					(usuario: UsuariosExcel) => {
						listaUsuarios.forEach(
							(usuarioGuardado: UsuariosExcel) => {
								if (
									usuario.id === usuarioGuardado.id
								) {
									usuario.save = true;
									!newUsuariosExcel.includes(
										usuario,
									) &&
										newUsuariosExcel.push(
											usuario,
										);
								} else {
									!newUsuariosExcel.includes(
										usuario,
									) &&
										newUsuariosExcel.push(
											usuario,
										);
								}
							},
						);
					},
				);
				setUsuariosExcel(newUsuariosExcel);
				alertToastify('success', data.msg);
			}
		} catch (error: any) {
			alertToastify('error', error.responde.data.msg);
		}
	};

	const updateInBD = async (usuario: UsuariosExcel) => {
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
