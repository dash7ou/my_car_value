import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
} from '@nestjs/common';
import { CreateReportDTO } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDTO } from './dtos/report.dto';
import { ApproveReportDTO } from './dtos/aprove-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';

@Controller('reports')
export class ReportsController {
  constructor(private reportServ: ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDTO)
  createReport(@Body() body: CreateReportDTO, @CurrentUser() user: User) {
    return this.reportServ.create(body, user);
  }

  @Patch('/approved/:id')
  @UseGuards(AdminGuard)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDTO) {
    return this.reportServ.changeApprove(id, body.approved);
  }
}
