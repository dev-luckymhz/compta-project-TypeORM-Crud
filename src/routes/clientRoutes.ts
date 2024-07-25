import { Router } from 'express';
import { getClient, createClient, updateClient, deleteClient } from '../controllers/clientController';

const router = Router();

router.get('/:id', getClient);
router.post('/', createClient);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
