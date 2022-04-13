import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { ComplaintService } from './complaint.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guard/auth.guard';
import { UserDecorator } from '../user/decorators/user.decorator';
@ApiTags('complaint')
@Controller('complaint')
export class ComplaintController {
  constructor(private complaintService:ComplaintService) {}
  @ApiOperation({summary:"login пользователя"})
  @ApiResponse({status:201})
  @UseGuards(AuthGuard)
  @Post("report-to-profile")
  reportToProfile(@Body()dto:CreateComplaintDto,@UserDecorator('id')userId:number){
    dto = {...dto,userId}
    return this.complaintService.createComplaint(dto)
  }

  @Get("get-user-of-reports/:id")
  getUserOfReports(@Param('id')profileId:number){
    return this.complaintService.getComplaint(profileId)
  }
}