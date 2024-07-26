import { AppDataSource } from '../data-source';
import { Client } from '../entity/Client';
import {BalanceSheet} from "../entity/BalanceSheet";

const clientRepository = AppDataSource.getRepository(Client);
const balanceSheetRepository = AppDataSource.getRepository(BalanceSheet);

export const checkDuplicateClients = async (firstName: string, lastName: string) => {
    try {
        const clients = await clientRepository.find({
            where: { firstName, lastName },
            relations: ['balanceSheets']
        });

        if (clients.length === 0) {
            return false;
        }

        const isDuplicate = clients.some((client) => {
            const clientBalanceSheets = client.balanceSheets;

            return clients.some(otherClient => {
                if (client.id === otherClient.id) return false;

                const otherClientBalanceSheets = otherClient.balanceSheets;

                return clientBalanceSheets.every(balanceSheet => {
                    const otherClientBalanceSheet = otherClientBalanceSheets.find(
                        bs => bs.year === balanceSheet.year
                    );
                    return otherClientBalanceSheet && otherClientBalanceSheet.result === balanceSheet.result;
                });
            });
        });

        return isDuplicate;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error checking for duplicate clients: ${error.message}`);
        }
        throw new Error('Unknown error occurred while checking for duplicates');
    }
};


export const getClientService = async (id: number) => {
    try {
        // Trouver un client par son ID, incluant ses bilans s'il y en a
        const client = await clientRepository.findOne({
            where: { id },
            relations: ['balanceSheets'], // Inclut les bilans du client
        });
        if (!client) {
            throw new Error('Client not found');
        }
        return client;
    } catch (error) {
        console.log(error)
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

export const createClientService = async (firstName: string, lastName: string) => {
    try {
        const newClient = new Client();
        newClient.firstName = firstName;
        newClient.lastName = lastName;

        return await clientRepository.save(newClient);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error creating client: ${error.message}`);
        }
        throw new Error('Unknown error occurred while creating client');
    }
};

export const updateClientService = async (id: number, firstName: string, lastName: string) => {
    try {
        // Trouver le client à mettre à jour
        const client = await clientRepository.findOneBy({ id });
        if (!client) {
            throw new Error('Client not found');
        }

        // Mettre à jour les informations du client
        client.firstName = firstName;
        client.lastName = lastName;

        return await clientRepository.save(client);
    } catch (error) {
        throw new Error(`Error updating client: ${error.message}`);
    }
};

export const deleteClientService = async (id: number) => {
    try {
        // Supprimer le client par son ID
        const result = await clientRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Client not found');
        }
        return result;
    } catch (error) {
        throw new Error(`Error deleting client: ${error.message}`);
    }
};
