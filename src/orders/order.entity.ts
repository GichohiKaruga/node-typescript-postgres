import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    orderDate: string;

    @Column({ type: "jsonb", nullable: true })
    orderDetail: any;

    @Column()
    total: number;

}
