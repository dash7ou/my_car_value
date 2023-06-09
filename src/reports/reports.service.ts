import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Report } from './report.entity';
import { Repository } from 'typeorm';
import { CreateReportDTO } from './dtos/create-report.dto';
import { User } from '../users/users.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  createEstimate(estimateDto: GetEstimateDTO) {
    return this.reportRepo
      .createQueryBuilder()
      .select('*')
      .where(`make = :make`, { make: estimateDto.make })
      .andWhere(`model = :model`, { model: estimateDto.model })
      .orderBy(`ABS(mileage - :mileage)`, 'DESC')
      .setParameters({ mileage: estimateDto.mileage })
      .limit(3)
      .getRawMany();
  }

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
