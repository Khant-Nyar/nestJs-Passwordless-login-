import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'admin',
      email: 'admin@admin.com',
    },
    {
      id: 2,
      name: 'khantnyar',
      email: 'info@khantnyar-dev.com',
    },
  ];
  findOneByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }
  // create(createUserDto: CreateUserDto) {
  //     return 'This action adds a new user';
  // }
  // findAll() {
  //     return `This action returns all users`;
  // }
  // findOne(id: number) {
  //     return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //     return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //     return `This action removes a #${id} user`;
  // }
}
