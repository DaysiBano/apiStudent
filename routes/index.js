var express = require('express');
var router = express.Router();
var Tutors = require('../models/tutors')
var Students = require('../models/students')

var Tutors = require('../helper/tutorHelper')
var tutordb = Tutors()

var Students = require('../helper/studentHelper')
var studentdb = Students()

var Users = require('../helper/userHelper')
var userdb = Users()

var Notes = require('../helper/noteHelper')
var notedb = Notes()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'APP gestion de Tutorias EPN FIM' });
});

router.get('/createStudent', function (req, res){
	tutordb.findAllTutors(function (err, tutors) {
		studentdb.findAllStudents(function (err, students) {
			if (err) res.send('Error: ' + err)
			else res.render('createStudent', { title: 'Crear Estudiante',
		  								students : students,
		  								tutors : tutors })
		})
	})
})

router.get('/createTutor', function (req, res){
	if (req.session.rol == 'user' && req.session.name != undefined) res.render('createTutor', { title: 'Registro de Tutor' })
	else res.render('login')
})

router.get('/createUser', function (req, res){
	if (req.session.rol == 'admin' && req.session.name != undefined) res.render('createUser', { title: 'Registro de Usuario' })
	else res.render('login')
})

router.get('/createNote/:id', function (req, res){
	studentdb.findIdStudent(req.params.id, function (err, student){
		res.render('createNote', { title: 'Nota',
								student : student })
	})
})

router.get('/listTutors', function (req, res){

	tutordb.findAllTutors(function (err, tutors) {
		if(err) res.send('Error: ' + err)
		else res.render('listTutors', { title: 'Lista de Tutores',
	  								tutors: tutors})
	})
})

router.get('/listUsers', function (req, res){
	userdb.findAllUsers(function (err, users) {
		if(err) res.send('Error: ' + err)
		else res.render('listUsers', { title: 'Lista de Usuario',
	  								users : users})
	})
})

router.get('/listNotes', function (req, res){
	notedb.findAllNotes(function (err, notes) {
		if(err) res.send('Error: ' + err)
		else res.render('listNotes', { title: 'Lista de Notas',
	  								notes : notes})
	})
})

router.get('/listStudents', function (req, res){

	if (req.session.rol == 'tutor' && req.session.name != undefined){
		studentdb.findStudentByTutor(req.session.name, function (err, students) {
			res.render('listStudents', { title: 'Lista de Students',
		  								students : students })
		})
	}else if(req.session.rol == 'user' && req.session.name != undefined){
		studentdb.findAllStudents(function (err, students) {
						res.render('listStudents', { title: 'Lista de Students',
					  								students : students })
					})
	}else {
		res.render('login')
	}

})

module.exports = router;
