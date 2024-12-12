import express from 'express';
import authMiddleware from '../middleware/authMiddlware.js';
import { 
  getLeads, 
  getLead, 
  updateLead, 
  assignLead, 
  createLead,
  getAssignedLeads
} from '../controllers/leadController.js';

const router = express.Router();

// Fetch all leads
router.get('/', authMiddleware, getLeads);

// Fetch a single lead by ID
router.get('/:id', authMiddleware, getLead);

// Add a new lead (if needed for manual entry or admin creation)
router.post('/add', authMiddleware, createLead);

// Update an existing lead
router.put('/:id', authMiddleware, updateLead);

// Assign a lead to an employee
router.put('/assign/:id/', authMiddleware, assignLead);

//get assigned lead
router.get('/tasks/', authMiddleware, getAssignedLeads);

export default router;
