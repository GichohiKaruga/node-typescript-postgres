import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../users/users.entity';
import {UsersData} from "../users/users.data";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    public async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    public async findByEmail(userEmail: string): Promise<User | null> {
        return await this.userRepository.findOne({ email: userEmail });
    }

    public async findById(id: number): Promise<User | null> {
        return await this.userRepository.findOneOrFail(id);
    }

    public async create(user: UsersData): Promise<User> {
        return await this.userRepository.save(user);
    }

    public async update(
        id: number,
        newValue: UsersData,
    ): Promise<User | null> {
        const user = await this.userRepository.findOneOrFail(id);
        if (!user.id) {
            console.error("user doesn't exist");
        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    public async register(usersData: UsersData): Promise<User> {
        const { email } = usersData;
        let user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            throw new HttpException(
                'User already exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        user = await this.userRepository.create(usersData);
        return await this.userRepository.save(user);
    }
}

