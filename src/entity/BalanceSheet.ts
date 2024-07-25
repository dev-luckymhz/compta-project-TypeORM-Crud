import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Client } from './Client';

@Entity()
export class BalanceSheet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column('decimal', { precision: 10, scale: 2 })
    result: number;

    @ManyToOne(() => Client, client => client.balanceSheets, {
        onDelete: 'CASCADE',
    })
    client: Client;
}
