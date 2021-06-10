const mongoose = require('mongoose');

var Form = mongoose.model('Form', {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String ,unique: true},
    mobile: { type: String },
    gender: { type: String },
    sslcSchoolName: { type: String },
    sslcYear: { type: String },
    sslcMark: { type: String },
    hscSchoolName: { type: String },
    hscYear: { type: String },
    hscMark: { type: String },
    collegeName: { type: String },
    collegeDegree: { type: String },
    collegeYear: { type: String },
    collegeMark: { type: String },
    companyName: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
    languages:{type: String},
    technicalSkills:{type: String}
   

    
    
    
    
    
},'resumeform');

module.exports = { Form };