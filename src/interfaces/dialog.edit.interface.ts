import { UsuariosExcel } from './users.excel.interface';

export interface DialogEditInterface {
	openDialog: boolean;
	objUser: UsuariosExcel;
	setOpenDialog: (bandera: boolean) => void;
	setUserEdit: (user: UsuariosExcel) => void;
	onClickUpdate: () => void;
}
