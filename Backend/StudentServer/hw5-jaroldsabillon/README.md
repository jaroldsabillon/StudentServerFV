
HW 5 COT 4930 - Full Stack Web Development Jarold Sabillon Z: 23638144 

This program will create a database with student information using mongoDB
To start use command - node studentserver.js

Requires - mongodb, express, body-parser, nodeJS.


Creates Server - > StudentServer
Creates Collections -> Studens
Creates records -> Individual student records


Student information can be retrieved by name and by ID
To add add, delete, update, or get student records go to localhost:5678/index.html
Two links at the bottom will take you to documentation to how expressions work and the functions used in the website.


app.post/ postStudent() - 
To prevent duplication we search the database and find a match for the input field. If it exists then we create the file with the given parameters

params{	

	first_name: "John"
	last_name:	"Doe"
	gpa: 		4.00
	enrolled: 	True
}

returns{

	successful{
	
		record_id: "123456"
		message: "successfully updated
		name: "JohnDoe"
		
	}
	
	failed{
	
		"record_id": -1,
		"message": "error - Student Already Exists",
		"name": "TestingSabillon"
		
	}
	
}

app.Get/getStudent()  - Gets student record and checks if it exists.

params{	

	record_id: "firstname"/"lastname"/"ID"
}

returns{

	success{
	
		"_id": 1648417252729,
		"first_name": "Jarold",
		"last_name": "Sabillon",
		"gpa": "4.00",
		"enrolled": "True",
		"fullname": "JaroldSabillon"
	}
	
	failed{
	
		"record_id": -1,
		"message": "Student not found"
		
	}
}

app.put/updateStudent() - updates student record and checks if it exists.

params{

		"_id": 1648417252729,
		"first_name": "Jarold",
		"last_name": "Sabillon",
		"gpa": "4.00",
		"enrolled": "True",
	
}

returns{

	success{
	
		"record_id": "1648418355930",
		"message": "Succesfully Updated"
		
	}
	
	failed{
	
		"record_id": -1,
		"message": "Student not found"
		
	}
}

app.delete/deleteStudent() - deletes student file and checks if it exists.

params{

	record_id: "firstname"/"lastname"/"ID"
	
}

returns{

	successful{
	
		"record_id": "1648418355930",
		"message": "successfully Deleted"
	
	}
	
	failed{
	
		"record_id": -1,
		"message": "Student not found"
	
	}

}


