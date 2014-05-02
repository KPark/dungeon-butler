dungeon-butler
==============

Table top RPG management application, web based.

INSTALL INSTRUCTIONS
====================

1. Install node.js on your machine.
2. Install MongoDB on your machine.
3. Install git on your machine.
4. Ensure that you have a command prompt with the node, MongoDB, and git in your PATH variable.
5. Navigate to the dungeon-butler root area.
6. Create a folder called "data".  This is where the database will live.
7. Open a command prompt and navigate to the "data" folder.
8. With the MongoDB bin folder in your path, type in the command "mongod --dbpath .".  This will start the MongoDB database.
9. Execute the command "use dungeon-butler" to switch to the database.
10. Create a record in the new database so that the app can recognize the database.
11. Navigate back to the root area of the dungeon-butler workspace.
12. Execute the command "npm install bower" with the node.js binaries on your path.
13. Execute the command "npm install".  This will install of the dependencies for the project.
14. Start the server by executing "npm start".
15. The website should now be running, and can be accessed by navigating to "http://localhost:3000".
