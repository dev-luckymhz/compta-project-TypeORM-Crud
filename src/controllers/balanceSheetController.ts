import { Request, Response } from 'express';
import { BalanceSheet } from '../entity/BalanceSheet';
import { getBalanceSheetService, createBalanceSheetService, updateBalanceSheetService, deleteBalanceSheetService } from '../services/balanceSheetService';

export const getBalanceSheets = async (req: Request, res: Response) => {
    const { clientId } = req.params;
    try {
        const balanceSheets = await getBalanceSheetService(parseInt(clientId, 10));
        res.status(200).json(balanceSheets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching balance sheets", error });
    }
};

export const createBalanceSheet = async (req: Request, res: Response) => {
    const { clientId } = req.body;
    const { year, result } = req.body;
    try {
        const newBalanceSheet = await createBalanceSheetService(clientId, year, result);
        res.status(201).json(newBalanceSheet);
    } catch (error) {
        res.status(500).json({ message: "Error creating balance sheet", error });
    }
};

export const updateBalanceSheet = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { year, result } = req.body;
    try {
        const updatedBalanceSheet = await updateBalanceSheetService(parseInt(id, 10), year, result);
        if (updatedBalanceSheet) {
            res.status(200).json(updatedBalanceSheet);
        } else {
            res.status(404).json({ message: "Balance sheet not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating balance sheet", error });
    }
};

export const deleteBalanceSheet = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const result = await deleteBalanceSheetService(parseInt(id, 10));
        if (result.affected) {
            res.status(204).send(); // No content
        } else {
            res.status(404).json({ message: "Balance sheet not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting balance sheet", error });
    }
};
