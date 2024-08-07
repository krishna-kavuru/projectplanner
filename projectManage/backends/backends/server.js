const express=require("express")
const cors=require("cors")
const collection=require("./Mongodb")
const Task=require('./TaskSchema')
const Document = require('./documentschema');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app=express()
const Message=require("./discussionschema")
const User=require('./Userschema')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post("/api/projects", async (req, res) => {
  try {
    // Create a new project document using the Project model
    const newProject = new collection(req.body);
    // Save the new project document to MongoDB
    await newProject.save();
    
    // Retrieve the user based on idforlogin and passwordforlogin
    const user = await collection.findOne({ idforlogin: req.body.idforlogin, passwordforlogin: req.body.passwordforlogin });
    
    // Extract the projectName from the user
    const projectName = user.projectName;

    // Respond with the projectName
    res.status(200).json({ projectName });
  } catch (error) {
    console.error("Error creating project:", error);
    // Respond with an error message
    res.status(500).json({ error: "An error occurred while creating the project" });
  }
});

// Example endpoint for authentication
// Example endpoint for authentication
// Example endpoint for authentication
app.post("/api/auth", async (req, res) => {
  try {
    const { idforlogin, passwordforlogin } = req.body;

    // Check if idforlogin and passwordforlogin match a user in the database
    const user = await collection.findOne({ idforlogin, passwordforlogin });

    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Assuming the user is associated with a project, retrieve the project name
    const projectName = user.projectName;

    // Respond with the project name
    res.json({ projectName });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "An error occurred while authenticating user" });
  }
});




// app.post('/api/tasks', async (req, res) => {
//   const { projectName, taskName, teamMember, submissionDate } = req.body;
//   const task = new Task({ projectName, taskName, teamMember, submissionDate });
//   await task.save();
//   res.json(task);
// });

// app.get('/api/tasks', async (req, res) => {
//   const { projectName } = req.query;
//   const tasks = await Task.find({ projectName });
//   res.json(tasks);
// });



app.post('/api/users', async (req, res) => {
  const { projectName, name, role, email } = req.body;

  try {
    const newUser = new User({
      projectName,
      name,
      role,
      email,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    // Check if projectName query parameter is provided
    const projectName = req.query.projectName;
    let users;
    if (projectName) {
      // If projectName is provided, filter users by projectName
      users = await User.find({ projectName });
    } else {
      // If projectName is not provided, fetch all users
      users = await User.find();
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const projectName = req.query.projectName;
    const messages = await Message.find({ projectName });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { projectName, text } = req.body;
    const newMessage = new Message({ projectName, text });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { projectName, taskName, teamMember, submissionDate } = req.body;
    const task = new Task({ projectName, taskName, teamMember, submissionDate });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve tasks by project name
app.get('/api/tasks', async (req, res) => {
  try {
    const { projectName } = req.query;
    const tasks = await Task.find({ projectName });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update task status by task id
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, { status }, { new: true });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(8000,()=>{
    console.log("port connected")
})
