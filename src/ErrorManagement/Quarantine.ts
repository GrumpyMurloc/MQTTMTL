class Quarantine{
  private static files:string[] = []

  public static quarantineFile(file:string): void {
  	console.log(file)
  	if(!this.isInQuarantine(file)){
  		this.files.push(file)
  	}
  }

  public static isInQuarantine(file:string): boolean {
  	return (this.files.indexOf(file) != -1)
  }
}

export default Quarantine