import { Router } from 'express';
import {
    getClient,
    createClient,
    updateClient,
    deleteClient,
    checkDuplicateClientsController, checkAllDuplicateClientsController
} from '../controllers/clientController';

const router = Router();

router.get('/get/:id', getClient);
router.post('/create', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);
router.get("/check-duplicates", checkDuplicateClientsController);
router.get('/duplicates', checkAllDuplicateClientsController);

export default router;
