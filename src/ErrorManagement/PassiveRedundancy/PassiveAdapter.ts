abstract class PassiveAdapter<component extends any, inputType, outputType> {
  protected current: component
  protected instances: component[]

  public constructor(current: component, numberOfCopy: number){
    this.current = current
    this.instances = []
    for (var i = 0; i < numberOfCopy; ++i) {
      this.instances.push(current.clone() as component)
    }
  }

  protected changeCurrentComponent() {
    this.clearCurrent()
    if(this.instances.length > 0 ){
      this.current = this.instances.pop()
    }
  }

  protected clearCurrent() {
    this.current = null
  }

  public abstract async process(input: inputType) : Promise<outputType>
}

export default PassiveAdapter
