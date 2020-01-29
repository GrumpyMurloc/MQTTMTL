import Error from "./Error"
import Quarantine from "./Quarantine"
import DAOError from "../DAO/DAOError"
import MailSender from "../ErrorManagement/MailSender"

class ErrorTreatment{
	public static handleFileError(error: Error){
		Quarantine.quarantineFile(error.element)
		const dao = new DAOError()
		dao.insertError(error.context, error.error, error.element)
	}

	public static handleAgregatorError(error: Error) {
		const dao = new DAOError()
		console.log(error.error)
    MailSender.sendMail(["c.sebastien707@gmail.com"], error.element, error.error)
		dao.insertError(error.context, error.error, error.element)		
	}
}

export default ErrorTreatment