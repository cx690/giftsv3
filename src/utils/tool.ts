/**
 * 每三位默认加,格式化
 * @param {string|number} x
 * @return {string}
 */
export function addCommas(x: number | string) {
	if (isNaN(Number(x))) {
		return '-';
	}

	const arr: string[] = (x + '').split('.');
	return arr[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') + (arr.length > 1 ? '.' + arr[1] : '');
}

export function setValue(target:any,newValue:any){
	if(typeof target === 'object' && typeof newValue === 'object'){
		for(let key in newValue){
			target[key] = newValue[key];
		}
	}
}