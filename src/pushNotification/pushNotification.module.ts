import {Module} from "@nestjs/common";
import {FireBase} from "./firebase";
import {PushNotificationService} from "./pushNotification.service";

@Module({
    providers: [FireBase, PushNotificationService],
    exports: [PushNotificationService]
})
export class PushNotificationModule {

}