import { Router } from 'express';
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from '../controllers/employesss.controller.js';

const router = Router();

router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployee);

router.delete('/employees/:id', deleteEmployee);

router.post('/employees', createEmployee);

router.patch('/employees/:id', updateEmployee);

export default router;
