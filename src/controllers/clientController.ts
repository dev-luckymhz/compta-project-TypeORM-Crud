import { Request, Response } from 'express';
import {
    getClientService,
    createClientService,
    updateClientService,
    deleteClientService,
    checkDuplicateClients, checkAllDuplicateClients
} from '../services/clientService';



export const getClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const client = await getClientService(parseInt(id, 10));
        if (client) {
            res.status(200).json(client);
        } else {
            res.status(404).json({ message: "Client not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error fetching client", error });
    }
};


export const checkAllDuplicateClientsController = async (req: Request, res: Response) => {
    try {
        const duplicates = await checkAllDuplicateClients();
        res.status(200).send(duplicates);
    } catch (error) {
        res.status(500).send({ message: "Error checking for duplicate clients", error });
    }
};

export const checkDuplicateClientsController = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.query;

    try {
        if (!firstName || !lastName) {
            return res.status(400).send({ message: "First name and last name are required." });
        }

        const duplicates = await checkDuplicateClients(firstName as string, lastName as string);
        res.status(200).send(duplicates);
    } catch (error) {
        res.status(500).send({ message: "Error checking for duplicate clients", error });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    try {
        const newClient = await createClientService(firstName, lastName);
        res.status(201).send(newClient);
    } catch (error) {
        res.status(500).send({ message: "Error creating client", error });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    try {
        const updatedClient = await updateClientService(parseInt(id, 10), firstName, lastName);
        if (updatedClient) {
            res.status(200).send(updatedClient);
        } else {
            res.status(404).send({ message: "Client not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error updating client", error });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteClientService(parseInt(id,10));
        if (result.affected) {
            res.status(200).send({ message: "Client deleted" }); // No content
        } else {
            res.status(404).send({ message: "Client not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error deleting client", error });
    }
};
