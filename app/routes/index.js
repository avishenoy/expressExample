// routes/index.js

const notesRoutes = require('./note_routes');
const authRoutes = require('./auth_routes');

module.exports = function(app, db)
{
    notesRoutes(app, db);
    authRoutes(app, db);

};
