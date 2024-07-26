import { Router } from 'express';
import {
    getBalanceSheets,
    createBalanceSheet,
    updateBalanceSheet,
    deleteBalanceSheet,
    getBalanceSheetByIdController
} from '../controllers/balanceSheetController';

const router = Router();

// Route pour récupérer la liste des bilans d'un client
router.get('/client/:clientId', getBalanceSheets);

// Route pour récupérer un bilan par ID avec les informations du client
router.get('/:id', getBalanceSheetByIdController);

// Route pour créer un nouveau bilan pour un client
router.post('/', createBalanceSheet);

// Route pour mettre à jour un bilan existant
router.put('/:id', updateBalanceSheet);

// Route pour supprimer un bilan
router.delete('/delete/:id', deleteBalanceSheet);

export default router;
