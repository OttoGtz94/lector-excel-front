import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import useUserExcel from '../../../hooks/useUserExcel';
import Button from '../../layouts/Button';
import TableRegisters from '../../layouts/TableRegisters';
import { UsuariosExcel } from '../../../interfaces/users.excel.interface';
import { alertToastify } from '../../../helpers/index';
import DialogEdit from '../../layouts/DialogEdit';

const RegistersExcel = () => {
	const {
		registersExcel,
		getRegistersDB,
		deleteRegister,
		updateRegisterBD,
	} = useUserExcel();
	const [registerSelect, setRegisterSelect] = useState<
		UsuariosExcel[]
	>([]);
	const [userEdit, setUserEdit] = useState<UsuariosExcel>(
		{},
	);
	const [openDialog, setOpenDialog] =
		useState<boolean>(false);

	const columns: GridColDef[] = [
		{
			field: 'id',
			headerName: 'ID',
			width: 130,
		},
		{
			field: 'user_id',
			headerName: 'User ID',
			width: 130,
		},
		{
			field: 'user_name',
			headerName: 'Nombre',
			width: 130,
		},
		{
			field: 'date',
			headerName: 'Fecha',
			width: 130,
		},
		{
			field: 'punch_in',
			headerName: 'Entrada',
			width: 130,
		},
		{
			field: 'punch_out',
			headerName: 'Salida',
			width: 130,
		},
	];

	const onClickDeleteRegister = () => {
		const arrIds: string | any[] = [];

		registersExcel.filter((register: UsuariosExcel) => {
			registerSelect.forEach((id: any) => {
				if (register.id === id) {
					arrIds.push(register._id);
				}
			});
		});
		deleteRegister(arrIds);
	};

	const onClickEditRegister = () => {
		if (registerSelect.length === 1) {
			let objUser: UsuariosExcel | any[] = {};

			registersExcel.filter(
				(register: UsuariosExcel) => {
					registerSelect.forEach((id: any) => {
						if (register.id === id) {
							objUser = register;
						}
					});
				},
			);
			setUserEdit(objUser);
			setOpenDialog(true);
			//updateRegisterBD(strId);
		} else {
			alertToastify(
				'error',
				'Solo puede se editar un registro a la vez',
			);
		}
	};

	const onClickUpdate = () => {
		updateRegisterBD(userEdit);
		setOpenDialog(false);
	};

	useEffect(() => {
		if (registersExcel.length === 0) {
			getRegistersDB();
		}
	}, [registersExcel.length]);

	return (
		<div>
			{registersExcel.length > 0 ? (
				<>
					<TableRegisters
						columns={columns}
						rows={registersExcel}
						onRowSelectionModelChange={(e: any) =>
							setRegisterSelect(e)
						}
					/>
					<Button
						text='Eliminar'
						style={{
							margin: '3px 0px 0px 0px',
							bgColor: '#cc060c',
							width: '200px',
						}}
						type='button'
						onClick={onClickDeleteRegister}
					/>
					<Button
						text='Editar'
						style={{
							margin: '3px 0px 0px 10px',
							bgColor: '#ffcc00',
							width: '200px',
						}}
						type='button'
						onClick={onClickEditRegister}
					/>
				</>
			) : (
				<p>No hay registros</p>
			)}
			<DialogEdit
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				setUserEdit={setUserEdit}
				objUser={userEdit}
				onClickUpdate={onClickUpdate}
			/>
		</div>
	);
};

export default RegistersExcel;
