import { AppDataSource } from '../data-source';
import { BalanceSheet } from '../entity/BalanceSheet';
import { Client } from '../entity/Client';

const balanceSheetRepository = AppDataSource.getRepository(BalanceSheet);
const clientRepository = AppDataSource.getRepository(Client);

export const getBalanceSheetService = async (clientId: number) => {


};

export const createBalanceSheetService = async (clientId: number, year: number, result: number) => {


};

export const updateBalanceSheetService = async (id: number, year: number, result: number) => {


};

export const deleteBalanceSheetService = async (id: number) => {

    
};
