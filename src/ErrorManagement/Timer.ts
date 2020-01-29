import { DH_UNABLE_TO_CHECK_GENERATOR } from "constants";
import BBPromise from "bluebird"

class Timer<T> {

  action:String
  promise:BBPromise<T>
  timeout:any

  constructor(stateMachine:BBPromise<T>, action:String){
      this.action = action;
  }

  public startTimer(){
    this.timeout = setTimeout(this.assert_action_finished.bind(this), 5* 1000);
  }

  public assert_action_finished(){
    this.promise.cancel();
  }

  public stopTimer(){
    clearTimeout(this.timeout);
  }

}

export default Timer
