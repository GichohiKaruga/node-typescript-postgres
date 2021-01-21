import * as jwt from 'jsonwebtoken';
import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from '../users/interfaces/jwt-payload.interface';
import { RegistrationStatus } from '../users/interfaces/registrationStatus.interface.';
import { UsersData } from '../users/users.data';
import { User } from '../users/users.entity';
import { UsersResponse } from '../users/users.response';
import {UsersService} from "../services/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {}

    private readonly logger = new Logger(AuthService.name);

    async register(user: UsersData) {
        let status: RegistrationStatus = {
            success: true,
            message: 'user register',
        };
        try {
            await this.usersService.register(user);
        } catch (err) {
            //debug(err);
            status = { success: false, message: err };
        }
        return status;
    }
    createToken(user: User) {
        const expiresIn = 3600;
        const accessToken = jwt.sign(
            {
                sub: user.email,
                firstname: user.firstName,
                lastname: user.lastName,
            },
            'V3ryB1gS3cr3t',
            { expiresIn },
        );
        return {
            expiresIn,
            accessToken,
        };
    }

    async validateUserToken(payload: JwtPayload): Promise<User> {
        return await this.usersService.findById(payload.id);
    }
    async validateUser(email: string, password: string): Promise<UsersResponse> {
        const user = await this.usersService.findByEmail(email);
        if (user && await user.comparePassword(password)) {
            this.logger.log('password check success');
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}

