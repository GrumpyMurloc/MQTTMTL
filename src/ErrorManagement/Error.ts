class Error {
	date : Date
	error : string
	element: string
	context: string

	constructor(date:Date, error:string, element:string, context:string){
		this.date = date 
		this.error = error 
		this.element = element
		this.context = context
	}
}

export default Error