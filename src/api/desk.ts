import fetch from './fetch';

//保存批次号
export function saveData(data: any) {
	return fetch('/api/gifts/save', data, {
		method: 'POST'
	});
}

//获取主要信息
export function getData(data: any) {
	return fetch('/api/gifts/all', data, {
		method: 'POST'
	});
}

//获取主要信息
export function getOne(data: any) {
	return fetch('/api/gifts/one', data, {
		method: 'POST'
	});
}

//更改状态
export function ModifyData(data: any) {
	return fetch('/api/gifts/modify', data, {
		method: 'POST'
	});
}

//更改状态
export function deleteOne(data: any) {
	return fetch('/api/gifts/delete', data, {
		method: 'POST'
	});
}