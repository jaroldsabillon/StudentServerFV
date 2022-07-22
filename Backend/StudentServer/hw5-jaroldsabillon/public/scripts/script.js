

/**
 * Returns whether new student record was created or if there is a duplicate
 * @param {string} first_name firstname
 * @param {string} last_name lastname
 * @param {number} gpa gpa of student
 * @param {boolean} enrolled enrollment status
 * @returns {object} { ID: 123456
 *                      status: successful/failed } 
 */
function postStudent() {                          //Connects front end to back end. Posts new student
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var gpa = $("#GPA").val();
  var enrollment = $("#enrollment").val();
  $.ajax({
    url: "http://localhost:5678/students",
    type: "post",
    data: {                                         //sends data to backend
      first_name: first_name,
      last_name: last_name,
      gpa: gpa,
      enrolled: enrollment
    },
    success: function (response) {
      $("#mydiv").text(response);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}
/**
 * Returns student record or not found
 * @param {string} record_id Can be either the student name or the students ID
 * @returns {object} { first_name: firstname
 *                     last_name : lastname
 *                     gpa: gpa 
 *                     enrolled: enrollment
 *                     full_name: firstnameLastname
 *                      status: successful/failed } 
 */

function getStudent() {                                        //connects front to backend. Gets student
  document.getElementById("record_id").defaultValue = null;
  var record_id = $("#record_id").val();
  $.ajax({
    url: "http://localhost:5678/students/" + record_id,
    type: "get",
    data: {                                               //sends data to backend
      _id: record_id,
    },
    success: function (response) {
      $("#mydiv").text(response);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}
/**
 * Deletes student record from files
 * @param {string} record_id name or student ID
 * @returns {object} { ID: 123456
 *                      status: successful/failed } 
 */
function deleteStudent() {                        //deletes student using front end
  var record_id = $("#record_id").val();
  $.ajax({
    url: "http://localhost:5678/students/" + record_id,
    type: "delete",
    data: {
      record_id: record_id
    },
    success: function (response) {
      $("#mydiv").text(response);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}
/**
 * Returns whethere student record updated or student does not exist
 * @param {string} first_name firstname
 * @param {string} last_name lastname
 * @param {number} gpa gpa of student
 * @param {boolean} enrolled enrollment status
 * @returns {object} { ID: 123456
 *                      status: successful/failed } 
 */

function updateStudent() {                            //updates student using front end
  var first_name = $("#first_name").val();
  var last_name = $("#last_name").val();
  var gpa = $("#GPA").val();
  var enrollment = $("#enrollment").val();

  var record_id = $("#record_id").val();
  $.ajax({
    url: "http://localhost:5678/students/" + record_id,
    type: "put",
    data: {
      record_id: record_id,
      first_name: first_name,
      last_name: last_name,
      gpa: gpa,
      enrolled: enrollment
    },
    success: function (response) {
      $("#mydiv").text(response);
    },
    error: function (xhr) {
      $("#mydiv").text('error: ' + xhr);
    }
  });
}