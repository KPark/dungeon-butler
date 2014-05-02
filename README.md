dungeon-butler
==============

Table top RPG management application, web based.

INSTALL INSTRUCTIONS
====================

# Install node.js on your machine.
# Install MongoDB on your machine.
# Install git on your machine.
# Ensure that you have a command prompt with the node, MongoDB, and git in your PATH variable.
# Navigate to the dungeon-butler root area.
# Create a folder called "data".  This is where the database will live.
# Open a command prompt and navigate to the "data" folder.
# With the MongoDB bin folder in your path, type in the command "mongod --dbpath .".  This will start the MongoDB database.
# Execute the command "use dungeon-butler" to switch to the database.
# Create a record in the new database so that the app can recognize the database.
# Navigate back to the root area of the dungeon-butler workspace.
# Execute the command "npm install bower" with the node.js binaries on your path.
# Execute the command "npm install".  This will install of the dependencies for the project.
# Start the server by executing "npm start".
# The website should now be running, and can be accessed by navigating to "http://localhost:3000".