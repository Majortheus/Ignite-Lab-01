import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateEnrollmentParams {
  courseId: string;
  studentId: string;
}

interface GetByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  getEnrollmentByStudentAndCourse({
    courseId,
    studentId,
  }: GetByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancel_at: null,
      },
    });
  }

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

  createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      },
    });
  }
}
