import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UsersResponse } from './users.response';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({ type: "jsonb", nullable: true })
    credit_card: any;

    @Column({ type: "jsonb", nullable: true })
    location: any;

    @Column({ type: "jsonb", nullable: true })
    shipping_region: any;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    response(showToken = true): UsersResponse {
        const { id, firstName, lastName, email, address,phone, shipping_region, credit_card, location } = this;
        const responseObject: UsersResponse = {
            id,
            firstName,
            lastName,
            email,
            phone,
            address,
            shipping_region,
            credit_card,
            location
        };

        return responseObject;
    }


}

