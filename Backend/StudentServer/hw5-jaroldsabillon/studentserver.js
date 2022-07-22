//studentserver.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
var uri = "mongodb://127.0.0.1:27017/";
const dbconn = mongodb.MongoClient.connect(uri);
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for StudentServer',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from StudentServer.',

    contact: {
      name: 'Jarold Sabillon',

    },
  },
  servers: [
    {
      url: 'http://localhost:5678',
      description: 'Student Server',
    },
  ],
};                                                           //setting up swagger express documentation 
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['studentserver.js'],
};

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * /students:
 *   post:
 *     summary: Creates a new student record
 *     description: Creates new student record and checks for duplicates.
 *                  Information includes ID, student name, gpa, and enrollment status.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               first_name:          # <!--- form field name
 *                 type: string
 *               last_name:    # <!--- form field name
 *                 type: string
 *               gpa:    # <!--- form field name
 *                 type: integer
 *               enrolled:    # <!--- form field name
 *                 type: bool
 *             
 * 
 *      
 *     responses:
 *       200:
 *         description: Student information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The student ID.
 *                         example: 123456788
 *                       
 *                       status:
 *                         type: string
 *                         description: status update.
 *                         example: Successfull/failed
 * 
 *                       
 */
app.post('/students', function (req, res) {                     //Creates new student
  var record_id = new Date().getTime();
  var obj = {};
  var rsp_obj = {};
  obj._id = record_id;
  obj.first_name = req.body.first_name;
  obj.last_name = req.body.last_name;
  obj.gpa = req.body.gpa;
  obj.enrolled = req.body.enrolled;                                                   //Input parameters
  obj.fullname = req.body.first_name + req.body.last_name;
  var name = req.body.first_name + req.body.last_name;
  const filter = {
    first_name: obj.first_name,
    last_name: obj.last_name
  }
  function post() {                                                                 
    MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {           
      var dbo = client.db("StudentServer");
      dbo.collection("Students").find(filter).toArray(function (err, result) {    //filters search by first and last name
        if (result.length <= 0) {
          dbconn.then(function (db) {
            db.db("StudentServer").collection("Students").insertOne(obj);         //Creates student record with parameters
          })
          rsp_obj.record_id = record_id;
          rsp_obj.message = 'successfully created';                         //Response message
          str = JSON.stringify(rsp_obj, null, 2);
          console.log("Created");
        } else if (result.length > 0) {
          rsp_obj.record_id = -1;
          rsp_obj.message = 'error - Student Already Exists';
          rsp_obj.name = name;                                            //Response message
          str = JSON.stringify(rsp_obj, null, 2);
          console.log("Student Exists");
        }
        return res.status(201).send(str);
      });
    });
  }
  post();
}); //end post method
/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve student record.
 *     description: Retrieve student record by ID or name.
 *                  Information includes ID, student name, gpa, and enrollment status.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID or name of the student to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The student ID.
 *                         example: 123456788
 *                       first_name:
 *                         type: string
 *                         description: The students first name.
 *                         example: Jarold
 *                       last_name:
 *                         type: integer
 *                         description: The students last name.
 *                         example: Sabillon
 *                       gpa:
 *                         type: string
 *                         description: The students gpa.
 *                         example: 4.00
 *                       enrollment:
 *                         type: boolean
 *                         description: The students enrollment status.
 *                         example: true
 *                       full_name:
 *                         type: string
 *                         description: The students full name.
 *                         example: JaroldSabillon
 * 
 *                       
 */
app.get('/students/:record_id', function (req, res) {
  var record_id = req.params.record_id;
  var obj = {};
  var rsp_obj = {};                                           //Input for parameters
  obj._id = record_id;
  var id = parseInt(req.params.record_id);
  function get() {
    const filter = {
      $or: [{ first_name: record_id }, { last_name: record_id }, { _id: id }, { fullname: record_id }]        //Filter search
    }
    MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
      var dbo = client.db("StudentServer");
      if (record_id === "null") {
        dbo.collection("Students").find().toArray(function (err, results) {                   //Finds all students
          str = JSON.stringify(results, null, 2);
          console.log("Retrieved All");
          client.close();                                                                      //response message                                                                        
          return res.status(201).send(str);
        });
      }
      else {
        dbo.collection("Students").find(filter).toArray(function (err, result) {              //Gets specific student if not null
          console.log(result.length);
          if (result.length > 0) {
            rsp_obj.record_id = record_id;
            rsp_obj.message = 'successfully created';                                     //message if found
            console.log(result);
            str = JSON.stringify(result, null, 2);
            console.log(str);
            console.log("found");
          } else if (result.length <= 0) {
            rsp_obj.record_id = -1; 
            rsp_obj.message = 'Student not found';                                        //Message if not found
            str = JSON.stringify(rsp_obj, null, 2);
            console.log("Not found");
          }
          return res.status(201).send(str);
        });
      }
    });
  }
  get();
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update student record
 *     description: Update student record.
 *                  Can change student first name, last name, gpa, and enrollment status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of student to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *            type: object
 *            properties:
 *               first_name:          # <!--- form field name
 *                 type: string
 *               last_name:    # <!--- form field name
 *                 type: string
 *               gpa:    # <!--- form field name
 *                 type: integer
 *               enrolled:    # <!--- form field name
 *                 type: bool
 *     responses:
 *       200:
 *         description: Student information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The student ID.
 *                         example: 123456788
 *                       Status:
 *                         type: string
 *                         description: Status update.
 *                         example: Successful/Failed
 * 
 */
app.put('/students/:record_id', function (req, res) {                   //updates student record
  var record_id = req.params.record_id;
  var obj = {};
  obj.record_id = record_id;
  obj.first_name = req.body.first_name;
  obj.last_name = req.body.last_name;
  obj.gpa = req.body.gpa;                                           //Input to update student
  obj.enrolled = req.body.enrolled;
  obj.fullname = req.body.first_name + req.body.last_name;
  var id = parseInt(req.params.record_id);
  console.log(id);
  const filter = { "_id": id };
  const value = { $set: { first_name: req.body.first_name, last_name: req.body.last_name, gpa: req.body.gpa, enrolled: req.body.enrolled, fullname: req.body.first_name + req.body.last_name } };
  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {           
    var dbo = client.db("StudentServer");
    dbo.collection("Students").find(filter).toArray(function (err, result) {
      if (result.length > 0) {
        if (err) throw err;
        var dbo = client.db("StudentServer");
        dbo.collection("Students").updateOne(filter, value, function (err, result) {          //Updates file if found
          if (err) throw err;
          var rsp_obj = {};
          rsp_obj.record_id = record_id;
          rsp_obj.message = "Succesfully Updated";
          str = JSON.stringify(rsp_obj, null, 2);
          client.close();                                                     //message if found
          console.log(result.modifiedCount);
          return res.status(201).send(str);
        });
      } else if (result.length <= 0) {
        var rsp_obj = {};
        rsp_obj.record_id = -1;
        rsp_obj.message = 'Student not found';                    //error if student not found
        str = JSON.stringify(rsp_obj, null, 2);
        console.log("Student not found");
        return res.status(201).send(str);
      }
    });
  });
});
/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete student record
 *     description: Deletes student file
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID or name of student to update
 *         schema:
 *           type: string
 *       
 *     responses:
 *       200:
 *         description: Student information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The ID of student that was deleted.
 *                         example: 123456788
 *                       Status:
 *                         type: string
 *                         description: Status update.
 *                         example: Successful/Failed
 * 
 */

app.delete('/students/:record_id', function (req, res) {                //deletes student record
  var record_id = req.params.record_id;
  var id = parseInt(req.params.record_id);
  MongoClient.connect(uri, { useUnifiedTopology: true }, function (err, client) {
    if (err) throw err;
    var dbo = client.db("StudentServer");
    const filter = {
      $or: [{ first_name: record_id }, { last_name: record_id }, { _id: id }, { fullname: record_id }]        //filter search
    }
    if(record_id === "all"){
      dbo.collection("Students").drop(function(err, result) {         //drops all records
        client.close();
        var rsp_obj = {};
        rsp_obj.record_id = -1;
        rsp_obj.message = 'All files deleted';                    //response if all are deleted
        str = JSON.stringify(rsp_obj, null, 2);
        console.log("All deleted");
        return res.status(201).send(str);
      });
    }else{
    dbo.collection("Students").find(filter).toArray(function (err, result) {        //deletes if record is found
      if (result.length > 0) {
        var rsp_obj = {};
        dbo.collection("Students").deleteOne(filter);
        rsp_obj.record_id = record_id;
        rsp_obj.message = 'successfully Deleted';                   //response if found
        str = JSON.stringify(rsp_obj, null, 2);
        console.log("Deleted");
        return res.status(201).send(str);
      } else if (result.length <= 0) {
        var rsp_obj = {};
        rsp_obj.record_id = -1;
        rsp_obj.message = 'Student not found';                //response if not found
        str = JSON.stringify(rsp_obj, null, 2);
        console.log("Student not found");
        return res.status(201).send(str);
      }
    });
  }
  });
});
//end delete method
app.listen(5678); //start the server
console.log('Server is running...');