import { Request, Response } from 'express';
import { BalanceSheet } from '../entity/BalanceSheet';
import {
    getBalanceSheetService,
    createBalanceSheetService,
    updateBalanceSheetService,
    deleteBalanceSheetService,
    getBalanceSheetWithClient
} from '../services/balanceSheetService';

export const getBalanceSheets = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    try {
        const balanceSheets = await getBalanceSheetService(parseInt(clientId, 10));
        res.status(200).send(balanceSheets);
    } catch (error) {
        res.status(500).send({ message: "Error fetching balance sheets", error });
    }
};

export const getBalanceSheetByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const balanceSheet = await getBalanceSheetWithClient(parseInt(id, 10));
        if (balanceSheet) {
            res.status(200).json(balanceSheet);
        } else {
            res.status(404).json({ message: "Balance sheet not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance sheet", error });
    }
};

export const createBalanceSheet = async (req: Request, res: Response) => {
    const { clientId } = req.body;
    const { year, result } = req.body;
    try {
        const newBalanceSheet = await createBalanceSheetService(clientId, year, result);
        res.status(201).send(newBalanceSheet);
    } catch (error) {
        res.status(500).send({ message: "Error creating balance sheet", error });
    }
};

export const updateBalanceSheet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { year, result } = req.body;
    try {
        const updatedBalanceSheet = await updateBalanceSheetService(parseInt(id, 10), year, result);
        res.status(200).json(updatedBalanceSheet); // Envoyer la réponse avec le bilan mis à jour
    } catch (error) {
        if (error.message.includes('Balance sheet not found')) {
            res.status(404).json({ message: "Balance sheet not found" });
        } else if (error.message.includes('Another balance sheet for this year already exists')) {
            res.status(409).json({ message: "Another balance sheet for this year already exists for this client" });
        } else {
            res.status(500).json({ message: "Error updating balance sheet", error });
        }
    }
};

export const deleteBalanceSheet = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteBalanceSheetService(parseInt(id, 10));
        if (result.affected) {
            res.status(200).send({ message: "Balance sheet deleted" }); // No content
        } else {
            res.status(404).send({ message: "Balance sheet not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Error deleting balance sheet", error });
    }
};
