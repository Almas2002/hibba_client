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
         notification.text="helloo"
        notification.id = 1000
          const payload = {
              notification:{
                  title:"Хареш Азим",
                  body: "Ислам тож ХАреш",
              },
              // "data" : {
              //     "volume" : "3.21.15",
              //     "contents" : "http://www.news-magazine.com/world-week/21659772"
              // },
              "data":{
                  "ttl":"86400s",
                  "data":JSON.stringify(notification)
              },
          }
          const data = {
              "message":{
                  "topic":"subscriber-updates",
                  "notification":{
                      "body" : "This week's edition is now available.",
                      "title" : "NewsMagazine.com",
                  },
                  "data" : {
                      "volume" : "3.21.15",
                      "contents" : "http://www.news-magazine.com/world-week/21659772"
                  },
                  "android":{
                      "priority":"normal"
                  },
                  "apns":{
                      "headers":{
                          "apns-priority":"5"
                      }
                  },
                  "webpush": {
                      "headers": {
                          "Urgency": "high"
                      }
                  }
              }
          }

         return await admin.messaging().sendToDevice(token,payload)
    }
}