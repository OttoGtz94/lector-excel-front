export interface ButtonInterface {
	text: string;
	onClick?: () => void;
	style?: StyleButtonInterface;
	type?: any;
	className?: string;
}

interface StyleButtonInterface {
	width?: string;
	bgColor?: string;
	color?: string;
	margin?: string;
}
