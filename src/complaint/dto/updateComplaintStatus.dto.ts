import {ComplainStatus} from "../complaint.entity";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateComplaintStatusDto{
    @ApiProperty({enum:ComplainStatus,example:"MODERATION"})
    status:ComplainStatus
}