
const multer = require('multer');
const userController= require("../controller/user_controller")


module.exports = function (app) {
  
  // temporary upload directory
  const uploadDonation = multer({ dest: 'donations/' }); 
  const uploadVolunteer = multer({ dest: 'volunteers/' }); 

  app.post('/api/createUser', userController.createUser);
  app.post('/api/analyzeDonations', uploadDonation.single('file'), userController.analysisDonation);
  app.post('/api/analyzeVolenteers', uploadVolunteer.array('files', 10),  userController.analysisVolenteers);


}