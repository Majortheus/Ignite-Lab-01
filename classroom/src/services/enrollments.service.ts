import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  listAllEnrollment() {
    return this.prisma.enrollment.findMany({
      where: {
        cancel_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  listEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancel_at: null,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
