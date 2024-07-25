import { AppDataSource } from '../data-source';
import { BalanceSheet } from '../entity/BalanceSheet';
import { Client } from '../entity/Client';

const balanceSheetRepository = AppDataSource.getRepository(BalanceSheet);
const clientRepository = AppDataSource.getRepository(Client);

export const getBalanceSheetService = async (clientId: number) => {
    try {
        // Trouver le client avec ses bilans
        const client = await clientRepository.findOne({
            where: { id: clientId },
            relations: ['balanceSheets'],
        });

        if (!client) {
            throw new Error("Client not found");
        }

        return client.balanceSheets;
    } catch (error) {
        throw new Error(`Error fetching balance sheets: ${error.message}`);
    }
};

export const createBalanceSheetService = async (clientId: number, year: number, result: number) => {
    try {
        // Vérifier si le client existe
        const client = await clientRepository.findOneBy({ id: clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        // Créer un nouveau bilan
        const newBalanceSheet = new BalanceSheet();
        newBalanceSheet.year = year;
        newBalanceSheet.result = result;
        newBalanceSheet.client = client;

        return await balanceSheetRepository.save(newBalanceSheet);
    } catch (error) {
        throw new Error(`Error creating balance sheet: ${error.message}`);
    }
};

export const updateBalanceSheetService = async (id: number, year: number, result: number) => {
    try {
        // Trouver le bilan à mettre à jour
        const balanceSheet = await balanceSheetRepository.findOneBy({ id });
        if (!balanceSheet) {
            throw new Error("Balance sheet not found");
        }

        // Mettre à jour les informations du bilan
        balanceSheet.year = year;
        balanceSheet.result = result;

        return await balanceSheetRepository.save(balanceSheet);
    } catch (error) {
        throw new Error(`Error updating balance sheet: ${error.message}`);
    }
};

export const deleteBalanceSheetService = async (id: number) => {
    try {
        // Supprimer le bilan
        const result = await balanceSheetRepository.delete(id);
        return result;
    } catch (error) {
        throw new Error(`Error deleting balance sheet: ${error.message}`);
    }
};
