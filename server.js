const express = require('express');
const path = require('path');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Set view engine and layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'managersecret',
  resave: false,
  saveUninitialized: true
}));

// Import Routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const employeesRoutes = require('./routes/employees');
const projectsRoutes = require('./routes/projects');
const clientsRoutes = require('./routes/clients');
const quotationsRoutes = require('./routes/quotations');
const invoicesRoutes = require('./routes/invoices');
const purchaseOrdersRoutes = require('./routes/purchaseOrders');
const expensesRoutes = require('./routes/expenses');
const attendanceRoutes = require('./routes/attendance');
const assetsRoutes = require('./routes/assets');
const todoRoutes = require('./routes/todo');
const reportsRoutes = require('./routes/reports');
const meetingsRoutes = require('./routes/meetings');
const settingsRoutes = require('./routes/settings');
const teamAssignmentRoutes = require('./routes/teamassignment');  // New Team Assignment route

// Mount Routes
app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/employees', employeesRoutes);
app.use('/projects', projectsRoutes);
app.use('/clients', clientsRoutes);
app.use('/quotations', quotationsRoutes);
app.use('/invoices', invoicesRoutes);
app.use('/purchaseOrders', purchaseOrdersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/attendance', attendanceRoutes);
app.use('/assets', assetsRoutes);
app.use('/todo', todoRoutes);
app.use('/reports', reportsRoutes);
app.use('/meetings', meetingsRoutes);
app.use('/settings', settingsRoutes);
app.use('/teamassignment', teamAssignmentRoutes); // Mount Team Assignment module

// Default redirect to dashboard
app.get('/', (req, res) => res.redirect('/dashboard'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
