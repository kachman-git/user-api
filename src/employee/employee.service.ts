import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.databaseService.user.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'INTERN' | 'ADMIN' | 'ENGINEER') {
    if (role) {
      const user = this.databaseService.user.findMany({ where: { role } });
      if ((await user).length == 0)
        return new NotFoundException('User not found');
    }

    return this.databaseService.user.findMany();
  }

  async findOne(id: number) {
    const user = this.databaseService.user.findUnique({ where: { id } });
    if (!user) {
      return new NotFoundException('No User Found');
    }
    return user;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const validUser = this.databaseService.user.findUnique({ where: { id } });
    if (!validUser) return new NotFoundException('No User Found');
    const user = this.databaseService.user.update({
      where: { id },
      data: updateEmployeeDto,
    });
    return user;
  }

  async remove(id: number) {
    const validUser = this.databaseService.user.findUnique({ where: { id } });
    if (!validUser) return new NotFoundException('No User Found');

    this.databaseService.user.delete({ where: { id } });
    return { message: 'User Deleted Successfully' };
  }
}
