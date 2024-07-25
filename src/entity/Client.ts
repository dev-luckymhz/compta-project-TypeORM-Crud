import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BalanceSheet } from './BalanceSheet';

@Entity()
export class Client {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    firstName: string;

    @Column({ type: 'varchar', length: 255 })
    lastName: string;

    @OneToMany(() => BalanceSheet, balanceSheet => balanceSheet.client, {
        cascade: true,
    })
    balanceSheets: BalanceSheet[];
}
