import axios from "axios";

export class SendMessageService {
  static async sendCode(phone:string,code:number){
    return axios.post(`${process.env.SMSPHONEURL}?login=${process.env.SMSPHONELOGIN}&psw=${process.env.SMSPHONEPSW}&phones=${phone}&mes=CODE:${code}&fmt=3`)
  }
}
////"phone":"87057505871",