import {Body, Controller, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CreateComplaintDto} from './dto/create-complaint.dto';
import {ComplaintService} from './complaint.service';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger';
import {AuthGuard} from '../auth/guard/auth.guard';
import {UserDecorator} from '../user/decorators/user.decorator';
import {IPagination} from "../profile/interfaces/get-profile-query.interface";
import {RoleGuards} from "../auth/guard/role.guard";
import {Role} from "../user/decorators/role.decorator";
import {RoleEnums} from "../enums/role.enums";
import {ComplainStatus} from "./complaint.entity";
import {createEvalAwarePartialHost} from "ts-node/dist/repl";
import {UpdateComplaintStatusDto} from "./dto/updateComplaintStatus.dto";

@ApiTags('complaint')
@Controller('complaint')
export class ComplaintController {
    constructor(private complaintService: ComplaintService) {
    }

    @ApiOperation({summary: "login пользователя"})
    @ApiResponse({status: 201})
    @UseGuards(AuthGuard)
    @Post("report-to-profile")
    reportToProfile(@Body()dto: CreateComplaintDto, @UserDecorator('id')userId: number) {
        dto = {...dto, userId}
        return this.complaintService.createComplaint(dto)
    }

    @Get("get-profile-of-reports/:id")
    getUserOfReports(@Param('id')profileId: number) {
        return this.complaintService.getComplaint(profileId)
    }

    @ApiOperation({summary: "взять жалобы"})
    @ApiQuery({example: 10, name: "limit", type: "number"})
    @ApiQuery({example: 1, name: "offset", type: "number"})
    @Get("/")
    getComplaints(@Query()pagination: IPagination) {
        return this.complaintService.getComplaints(pagination)
    }

    @Role(RoleEnums.WORKER, RoleEnums.SUPER_ADMIN)
    @UseGuards(RoleGuards)
    @Put('/:id')
    changeStatus(@Param('id')id: number, @Body()status: UpdateComplaintStatusDto) {
        return this.complaintService.changeStatus(id, status.status)
    }


}