const Joi = require('joi'); //return class: capital 1st letter
const express = require('express');
const app = express();

// middleware- enable parsing object
app.use(express.json());

const coursesArr = [
    { id: 1, name: 'Course1' },
    { id: 2, name: 'Course2' },
    { id: 3, name: 'Course3' },
];

//Input validation
function validateCourse(reqBodyObj) {
    const schema = {
        newCourseName: Joi.string().min(3).required()
    }
    return Joi.validate(reqBodyObj, schema);
}

/*--------------------------------------- post (增 )--------------------------------------------------*/
app.post('/api/courses', (req, res) => {
    // 验证
    const { error } = validateCourse(req.body); //ES6 syntax
    if (error) {
        //console.log(error);
        return res.status(400).send(error.details[0].message);
    }

    // 添加
    const newCourse = {
        id: coursesArr.length + 1,
        name: req.body.newCourseName
    };
    coursesArr.push(newCourse);
    res.send(newCourse);
});

/*--------------------------------------- delete (删)--------------------------------------------------*/
// delete from the API endpoint
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    let courseToDelete = (coursesArr.find(i => i.id === parseInt(req.params.id)));
    if (!courseToDelete)
        return res.status(404).send('The course ID wasn\'t found');

    // Delete 
    const index = coursesArr.indexOf(course);
    coursesArr.splice(index, 1);

    res.send(courseToDelete);
    res.send(coursesArr);
});

/*--------------------------------------- put (改)--------------------------------------------------*/
app.put('/api/courses/:id', (req, res) => {
    // check 
    const courseToUpdate = (coursesArr.find(c => c.id === parseInt(req.params.id)));
    if (!courseToUpdate) return res.status(404).send('The course wasn\'t found');

    // Validation input part
    const { error } = validateCourse(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    // update 
    courseToUpdate.name = req.body.newCourseName;

    res.send(courseToUpdate);
    res.send(coursesArr);
});

/*--------------------------------------- get (查)--------------------------------------------------*/
//get all
app.get('/api/courses', (req, res) => {
    res.send(coursesArr);
});

//get course with a given id
app.get('/api/courses/:id', (req, res) => {
    const course = coursesArr.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('The course wasn\'t found');
    }
    else {
        res.send(course);
    }
});


// Port Config
const port = process.env.PORT || 3000;
// 服务器正在听${port}端口
app.listen(port, () => console.log(`Listening on port ${port}`));