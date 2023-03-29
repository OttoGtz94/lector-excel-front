import axios from 'axios';
import { createContext, useState } from 'react';
import { UsuariosExcel } from '../interfaces/users.excel.interface';
import { alertToastify } from '../helpers/index';
import useAuth from '../hooks/useAuth';

interface props {
	children: JSX.Element | JSX.Element[];
}

interface stateInitial {
	//usuarios: any;
	//setUsuariosExcel: UsuariosExcel[];
	usuariosExcel: UsuariosExcel[];
	registersExcel: UsuariosExcel[];
	setStateUsersExcel: (users: UsuariosExcel[]) => void;
	saveInBD: (listaUsuarios: UsuariosExcel[]) => void;
	getRegistersDB: () => void;
	updateRegisterBD: (objUser: UsuariosExcel) => void;
	deleteRegister: (listRegistersId: string[]) => void;
	/* setRegistersExcel: (
		listRegisters: UsuariosExcel,
	) => void; */
}

const ExcelContext = createContext<stateInitial>(
	{} as stateInitial,
);

const ExcelProvider = ({ children }: props) => {
	const [usuariosExcel, setUsuariosExcel] = useState<
		UsuariosExcel[]
	>([]);
	const [registersExcel, setRegistersExcel] = useState<
		UsuariosExcel[]
	>([]);

	const { auth } = useAuth();

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
			obj.user_creator_id = auth.id;
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
			alertToastify('error', error.response.data.msg);
		}
	};

	const getRegistersDB = async () => {
		try {
			const { data } = await axios.post(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/get-registers/${auth.id}`,
			);
			if (data.status === 200) {
				alertToastify('success', data.msg);
				data.registers.forEach(
					(register: UsuariosExcel, index: number) =>
						(register.id = index + 1),
				);
				setRegistersExcel(data.registers);
			} else if (data.status === 400) {
				alertToastify('error', data.msg);
				setRegistersExcel([]);
			}
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};

	const updateRegisterBD = async (
		objUser: UsuariosExcel,
	) => {
		try {
			const { data } = await axios.put(
				`${
					import.meta.env.VITE_BACKEND_URL
				}/excel/edit-excel/${objUser._id}`,
				objUser,
			);
			alertToastify('success', data.msg);
			getRegistersDB();
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};

	const deleteRegister = (listRegistersId: string[]) => {
		try {
			listRegistersId.forEach(
				async (registerId: string) => {
					const res = await axios.delete(
						`${
							import.meta.env.VITE_BACKEND_URL
						}/excel/delete-excel/${registerId}`,
					);
					alertToastify('success', res.data.msg);
					getRegistersDB();
				},
			);
		} catch (error: any) {
			alertToastify('error', error.response.data.msg);
		}
	};

	return (
		<ExcelContext.Provider
			value={{
				usuariosExcel,
				registersExcel,
				setStateUsersExcel,
				//setRegistersExcel,
				saveInBD,
				getRegistersDB,
				updateRegisterBD,
				deleteRegister,
			}}>
			{children}
		</ExcelContext.Provider>
	);
};

export { ExcelProvider };
export default ExcelContext;
