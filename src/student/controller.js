const pool = require('../../db');
const queries = require('./queries');
const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);

    })
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })

}

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;
    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        // if (error) {
        //     console.log(error);
        // }
        // console.log("This is results", results);
        if (results.rows.length) {
            res.send("Email Already Exists.");
        }

        // add students to the database
        pool.query(queries.addStudent, [name, email, age, dob], (err, results) => {
            res.status(201).send("Student Created Successfully.");
        });
    });

}

const deleteStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.deleteStudent, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student doesn't exist on the database");
        }
        res.status(200).res('Student successfully Deleted.');
    })
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, age, dob } = req.body;
    pool.query(queries.getStudentById, [id], (error, results) => {
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send("Student doesn't exist in the database");
        }
        pool.query(queries.updateStudent, [name, email, age, dob, id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Students updated Successfully.");
        });
    });
}


module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    deleteStudent,
    updateStudent
}