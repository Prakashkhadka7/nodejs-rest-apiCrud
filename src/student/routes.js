const { Router } = require('express');
const router = Router();
const controller = require('./controller')

router.get('/', controller.getStudents);
router.get('/:id', controller.getStudentById);
router.put('/:id', controller.updateStudent);
router.post('/', controller.addStudent);
module.exports = router;