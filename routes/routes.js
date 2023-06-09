const express = require ('express');
const Model = require ('../models/admin/register.js');

const router = express.Router ();

const {
  register,
  login,
  isAuth,
  staff,
  allStaff,
  getStaff,
} = require ('../controllers/auth');

// register endpoint
router.post ('/register', register);

// login endpoint
router.post ('/login', login);

// login endpoint
router.get ('/private', isAuth);

// staff profile endpoint
router.post ('/staff-upload', staff);

// staff profile endpoint
router.get ('/all-staff', allStaff);

// get a staff
router.get ('/get-staff/:id', getStaff);

router.patch ('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = {new: true};

    const result = await Model.findByIdAndUpdate (id, updatedData, options);
    res.send (result);
  } catch (e) {
    res.status (400).json ({message: e.message});
  }
});

router.delete ('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await Model.findByIdAndDelete (id);
    res.send (`Document with ${deleteData.username} has been removed!`);
  } catch (e) {
    res.status (500).json ({message: e.message});
  }
});

module.exports = router;
