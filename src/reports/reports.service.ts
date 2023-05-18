import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from '../users/users.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  create(data: CreateReportDTO, user: User) {
    const report = this.reportRepo.create(data);
    report.user = user;

    return this.reportRepo.save(report);
  }

  async changeApprove(id: string, approved: boolean) {
    const report = await this.reportRepo.findOne({ where: { id: +id } });

    if (!report) {
      throw new NotFoundException('This repo not found');
    }

    report.approved = approved;

    return this.reportRepo.save(report);
  }
}
