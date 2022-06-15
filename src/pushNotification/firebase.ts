import {Injectable} from "@nestjs/common";
import * as admin from "firebase-admin"
import * as serviceAccount from "./conf.json"
import {Notification} from "../notification/notification.entity";
import {ServiceAccount} from "firebase-admin/lib/app";
@Injectable()
export class FireBase{
     constructor() {
         admin.initializeApp({
             credential: admin.credential.cert(serviceAccount as ServiceAccount),
         })
     }
    async sendNotification(token:string,notification:Notification){
          const payload = {
              notification:{
                  title:"Привет",
                  body:"Салам",
              }
          }

         return await admin.messaging().sendToDevice(token,payload)
    }
}