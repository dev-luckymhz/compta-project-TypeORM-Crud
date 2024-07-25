import { Request, Response } from 'express';
import { getClientService, createClientService, updateClientService, deleteClientService } from '../services/clientService';

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
        res.status(500).json({ message: "Error fetching client", error });
    }
};

export const createClient = async (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    try {
        const newClient = await createClientService(firstName, lastName);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ message: "Error creating client", error });
    }
};

export const updateClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName } = req.body;
    try {
        const updatedClient = await updateClientService(parseInt(id, 10), firstName, lastName);
        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ message: "Client not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating client", error });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteClientService(parseInt(id, 10));
        if (result.affected) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: "Client not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting client", error });
    }
};
