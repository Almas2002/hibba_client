import {Injectable} from "@nestjs/common";
import {app,credential,initializeApp,messaging} from "firebase-admin"
import conf from "./conf";
import {Notification} from "../notification/notification.entity";
@Injectable()
export class FireBase{

    ref(){
      return initializeApp({
          credential:credential.cert({clientEmail:conf.client_email,privateKey:conf.private_key,projectId:conf.project_id}),
      })
    }
    async sendNotification(token:string,notification:Notification){
         return await messaging(this.ref()).send({token:token,...notification})
    }
}