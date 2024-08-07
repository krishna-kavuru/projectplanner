const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://easwarasdf:easwarasdf@cluster0.wuhuakr.mongodb.net/project-management-tool")
.then(()=>{
    console.log("connect")
})
.catch((e)=>{
    console.log(e,"failed");
})


const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true
  },
  teamLeader: {
    type: String,
    required: true
  },
  projectDescription: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  projectDomain: {
    type: String,
    required: true
  },
  idforlogin: {
    type: String,
    required: true
  },
  passwordforlogin: {
    type: String,
    required: true
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
