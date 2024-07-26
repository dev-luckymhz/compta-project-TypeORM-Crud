import {AppDataSource} from '../data-source';
import {Client} from '../entity/Client';
import {BalanceSheet} from "../entity/BalanceSheet";

const clientRepository = AppDataSource.getRepository(Client);
const balanceSheetRepository = AppDataSource.getRepository(BalanceSheet);


export const checkAllDuplicateClients = async () => {
    try {
        // Retrieve all clients with their balance sheets
        const clients = await clientRepository.find({ relations: ['balanceSheets'] });

        const duplicates: {
            client: Client;
            duplicateWith: { client: Client; matchingBalanceSheets: BalanceSheet[] }[];
            duplicateCount: number;
        }[] = [];

        let totalDuplicates = 0;

        // Check for duplicates
        for (const client of clients) {
            const duplicateWith = clients.filter(otherClient => {
                if (client.id === otherClient.id) return false;

                const isDuplicate = client.firstName === otherClient.firstName &&
                    client.lastName === otherClient.lastName &&
                    client.balanceSheets.every(balanceSheet => {
                        return otherClient.balanceSheets.some(
                            otherBS => otherBS.year === balanceSheet.year && otherBS.result === balanceSheet.result
                        );
                    });

                return isDuplicate;
            });

            if (duplicateWith.length > 0) {
                const duplicateCount = duplicateWith.length;
                totalDuplicates += duplicateCount;

                duplicates.push({
                    client,
                    duplicateWith: duplicateWith.map(dupClient => ({
                        client: dupClient,
                        matchingBalanceSheets: dupClient.balanceSheets.filter(balanceSheet =>
                            client.balanceSheets.some(
                                clientBS => clientBS.year === balanceSheet.year && clientBS.result === balanceSheet.result
                            )
                        )
                    })),
                    duplicateCount
                });
            }
        }

        return { totalDuplicates, duplicates };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error checking for duplicate clients: ${error.message}`);
        }
        throw new Error('Unknown error occurred while checking for duplicates');
    }
};

export const checkDuplicateClients = async (firstName: string, lastName: string) => {
    try {
        // Rechercher tous les clients ayant le même prénom et le même nom
        const clients = await clientRepository.find({
            where: { firstName, lastName },
            relations: ['balanceSheets']
        });

        if (clients.length === 0) {
            return [];
        }

        // Trouver les clients en doublon
        const duplicates = clients.map(client => {
            const clientBalanceSheets = client.balanceSheets;

            const duplicateCount = clients.reduce((count, otherClient) => {
                if (client.id === otherClient.id) return count;

                const otherClientBalanceSheets = otherClient.balanceSheets;

                const isDuplicate = clientBalanceSheets.every(balanceSheet => {
                    const otherClientBalanceSheet = otherClientBalanceSheets.find(
                        bs => bs.year === balanceSheet.year
                    );
                    return otherClientBalanceSheet && otherClientBalanceSheet.result === balanceSheet.result;
                });

                return isDuplicate ? count + 1 : count;
            }, 0);

            return {
                clientId: client.id,
                duplicateCount
            };
        });

        // Filtrer les résultats pour ne garder que les clients avec des doublons
        return duplicates.filter(duplicate => duplicate.duplicateCount > 0);
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
            return null; // Retourner null si le client n'existe pas
        }
        return client;
    } catch (error) {
        throw new Error(`Error fetching Client: ${error.message}`);
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
