const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Form } = require('../models/form');

// => localhost:3000/employees/
router.get('/', (req, res) => {
    Form.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving User :' + JSON.stringify(err, undefined, 2)); }
    });
});



/*router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Form.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});*/

router.get('/:email', (req, res) => {

    Form.findOne({ email: req.params.email },
        (err, user) => {
            if (!user)
                return res.status(404).json({ status: false, message: 'User record not found.' });
            else
                return  res.send(user);
        }
    );
});
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Form.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/', (req, res) => {
    var resume = new Form({
       
    firstname:  req.body.firstname ,
    lastname:  req.body.lastname,
    email:  req.body.email,
    mobile:  req.body.mobile,
    gender:  req.body.gender,
    sslcSchoolName:  req.body.sslcSchoolName,
    sslcYear:  req.body.sslcYear,
    sslcMark:  req.body.sslcMark,
    hscSchoolName: req.body.hscSchoolName,
    hscYear: req.body.hscYear,
    hscMark: req.body.hscMark,
    collegeName: req.body.collegeName,
    collegeDegree: req.body.collegeDegree,
    collegeYear: req.body.collegeYear,
    collegeMark: req.body.collegeMark,
    companyName: req.body.companyName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    languages:req.body.languages,
    technicalSkills: req.body.technicalSkills
    

    });
    resume.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { 
            if (err.code == 11000)
            res.status(422).send(['Duplicate email adrress found.']);
        else
            console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var resume = {
        firstname:  req.body.firstname ,
    lastname:  req.body.lastname,
    email:  req.body.email,
    mobile:  req.body.mobile,
    gender:  req.body.gender,
    sslcSchoolName:  req.body.sslcSchoolName,
    sslcYear:  req.body.sslcYear,
    sslcMark:  req.body.sslcMark,
    hscSchoolName: req.body.hscSchoolName,
    hscYear: req.body.hscYear,
    hscMark: req.body.hscMark,
    collegeName: req.body.collegeName,
    collegeDegree: req.body.collegeDegree,
    collegeYear: req.body.collegeYear,
    collegeMark: req.body.collegeMark,
    companyName: req.body.companyName,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    languages:req.body.languages,
    technicalSkills: req.body.technicalSkills

    };
    Form.findByIdAndUpdate(req.params.id, { $set: resume }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); }
    });
});
router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Form.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/audio', (req, res) => {
 
    
    
    let b64= req.body.b64;
    console.log(b64);
    fs.writeFile(path.join(__dirname,"../public/assets/image","USER" + i +".mp3"), b64, {encoding: 'base64'},() =>{
        i=i+1;
        console.log('File created');
        console.log(path.join(__dirname,"../public/assets/image","USER" + i +".mp3"));
    });

    res.send({text: 'file successfully uploaded'});
})


module.exports = router;