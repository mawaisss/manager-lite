const express = require('express');
const router = express.Router();
const db = require('../db/database');

// In-memory arrays for demo purposes (in production, persist assignments in your database)
let dayAssignments = [];
let nightAssignments = [];

// Helper function to format a Date as YYYY-MM-DD
function formatDate(date) {
  const d = new Date(date);
  const month = '' + (d.getMonth() + 1);
  const day = '' + d.getDate();
  const year = d.getFullYear();
  return [year, month.padStart(2, '0'), day.padStart(2, '0')].join('-');
}

// GET: Render the Team Assignment page
router.get('/', (req, res) => {
  // Use query parameter "date" if provided, otherwise default to today.
  let assignmentDate = req.query.date || formatDate(new Date());
  
  // Filter assignments for the selected date
  const dayAssignmentsForDate = dayAssignments.filter(a => a.assignmentDate === assignmentDate);
  const nightAssignmentsForDate = nightAssignments.filter(a => a.assignmentDate === assignmentDate);
  
  // Query active projects to populate the drop-down list
  db.all("SELECT id, name FROM projects WHERE status = 'Active'", [], (err, projects) => {
    if (err) return res.send("Error retrieving active projects: " + err.message);
    // Query employees for drop-by/pick-by (roles: Driver or Supervisor)
    db.all("SELECT id, name FROM employees WHERE role IN ('Driver', 'Supervisor')", [], (err, dropEmployees) => {
      if (err) return res.send("Error retrieving drop/pick employees: " + err.message);
      // Query potential team members (excluding Drivers and Supervisors)
      db.all("SELECT id, name, role FROM employees WHERE role NOT IN ('Driver', 'Supervisor')", [], (err, teamMembers) => {
        if (err) return res.send("Error retrieving team members: " + err.message);
        // Remove team members already assigned on this date
        const assignedMembers = new Set();
        dayAssignmentsForDate.concat(nightAssignmentsForDate).forEach(assignment => {
          assignment.team.split(',').forEach(name => assignedMembers.add(name.trim()));
        });
        const availableTeamMembers = teamMembers.filter(emp => !assignedMembers.has(emp.name));
        // Group available team members by role
        const groupedTeamMembers = {};
        availableTeamMembers.forEach(emp => {
          if (!groupedTeamMembers[emp.role]) {
            groupedTeamMembers[emp.role] = [];
          }
          groupedTeamMembers[emp.role].push(emp);
        });
        
        res.render('teamassignment', { 
          assignmentDate,
          dayAssignments: dayAssignmentsForDate,
          nightAssignments: nightAssignmentsForDate,
          projects,
          dropEmployees,
          groupedTeamMembers
        });
      });
    });
  });
});

// POST: Process new team assignment submission
router.post('/', (req, res) => {
  // Expecting fields: project_id, task, drop_by, drop_time, pick_by, pick_time, team_members, shift, assignment_date
  const { project_id, task, drop_by, drop_time, pick_by, pick_time, shift, assignment_date } = req.body;
  let team_members = req.body.team_members;
  if (!Array.isArray(team_members)) {
    team_members = team_members ? [team_members] : [];
  }
  
  // Look up project name from the database using project_id
  db.get("SELECT name FROM projects WHERE id = ?", [project_id], (err, projectRow) => {
    if (err) return res.send("Error retrieving project: " + err.message);
    if (!projectRow) return res.send("Project not found");
    const projectName = projectRow.name;
    // Optionally add logic to retrieve client information; here we leave it empty.
    const client = "";
    
    // Create a new assignment object, including the assignment_date from the form.
    let newAssignment = {
      id: shift === "Day" ? (dayAssignments.length + 1) : (nightAssignments.length + 1),
      assignmentDate: assignment_date, // Using the date from the form
      project: "P-" + ("0000" + project_id).slice(-4) + " " + projectName,
      client: client,
      team: team_members.join(', '),
      numberOfPeople: team_members.length,
      task: task,
      dropBy: drop_by,
      dropTime: drop_time,
      pickBy: pick_by,
      pickTime: pick_time
    };
    
    if (shift === "Day") {
      dayAssignments.push(newAssignment);
    } else {
      nightAssignments.push(newAssignment);
    }
    // Redirect back to the team assignment page with the selected assignment_date in the query.
    res.redirect('/teamassignment?date=' + assignment_date);
  });
});

module.exports = router;
