import Lead from "../models/Lead.js";
import Employee from "../models/Employee.js";

// Fetch all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find().populate("assignedTo", "name email");
    // console.log(leads,"leads fetched")
    res.status(200).json({ success: true, leads });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch leads." });
    console.log(error,"error")
  }
};

// Add a new lead
export const createLead = async (req, res) => {
  const { leadId, name, email, phone, company, source } = req.body;
  try {
    const lead = new Lead({ leadId, name, email, phone, company, source });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lead." });
  }
};

// Fetch a single lead by ID
export const getLead = async (req, res) => {
    const { id } = req.params; // Extract lead ID from the request URL
    try {
      const lead = await Lead.findById(id).populate("assignedTo", "name email");
      // console.log(lead)
      if (!lead) {
        return res.status(200).json({ success: true, lead });
      }
      res.status(200).json({ success: true, lead });
    } catch (error) {
      res.status(500).json({success:false, error: "Failed to fetch the lead." });
    }
  };
  

// Update lead details
export const updateLead = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const lead = await Lead.findByIdAndUpdate(id, updates, { new: true });
    if (!lead) return res.status(404).json({ error: "Lead not found." });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lead." });
  }
};

// Assign a lead to an employee
export const assignLead = async (req, res) => {
  // console.log(assignLead)
  const { id } = req.params;
  const { employeeId } = req.body; // employeeId to whom the lead is assigned
  // console.log(employeeId)
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ error: "Employee not found." });

    const lead = await Lead.findByIdAndUpdate(
      id,
      { assignedTo: employee._id, status: "Assigned" },
      { new: true }
    );
    if (!lead) return res.status(404).json({ error: "Lead not found." });

    res.status(200).json({ success: true, lead });
  } catch (error) {
    res.status(500).json({ error: "Failed to assign lead." });
  }
};

// Get assigned lead
export const getAssignedLeads = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const assignedLeads = await Lead.find({ assignedTo: employeeId });
    console.log(assignLead)
    res.status(200).json(assignedLeads);
  } catch (error) {
    res.status(500).json({ message: "Error fetching leads", error });
  }
};

