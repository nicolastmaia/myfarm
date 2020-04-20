import { Toast } from 'native-base';

export function showDefaultToast(err) {
	Toast.show({
		text: err.name,
		textStyle: { color: '#fff' },
		buttonText: 'Ok',
		position: 'bottom',
		buttonStyle: { backgroundColor: '#303030' },
	});
}

export function showCustomToast(texto) {
	Toast.show({
		text: texto,
		position: 'bottom',
		buttonText: 'Ok',
	});
}
