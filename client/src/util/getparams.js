export function getEspecificParam(param) {
	let search = window.location.search
	let params = new URLSearchParams(search)
	let foo = params.get(param)
	return foo
}