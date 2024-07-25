import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';
import {BalanceSheet} from "../entity/BalanceSheet";

const clientRepository = AppDataSource.getRepository(Client);
const balanceSheetRepository = AppDataSource.getRepository(BalanceSheet);

export const checkDuplicateClients = async (firstName: string, lastName: string) => {

};

export const getClientService = async (id: number) => {


};

export const createClientService = async (firstName: string, lastName: string) => {


};

export const updateClientService = async (id: number, firstName: string, lastName: string) => {


};

export const deleteClientService = async (id: number) => {

    
};
