# Basic Rest API

## GOAL : ``A basic rest api to create , modify and delete objects`` 

### Links:
Please use the below link to access the application on heroku
[Basic-REST-API](https://basic-rest-api-exercise.herokuapp.com/)

### Technologies Used :

 1. **Server Side:**
    * Node.
    * Express.
    * md5 lib.
    * Mocha
    * Chai
    * supertest
   
### Installation guide

1. Clone the repository.
2. Install npm. [CLI]
3. Open command prompt and navigate to the cloned directory.
4. Execute npm install.
7. Run node.js application using ``node server``
8. Open the localhost at 5500 port.
9. Access the application directly deployed on cloud(heroku) using the following url 


#### API Documentation :


1. POST:
Create a new object using- ``\api\objects``  <br>
Pass the json object in body. Returns the newly created object with a unique identifier. <br>
example :  ```{ 
                "firstName": "Shubham",
                "lastName": "Rastogi",
                "uid": "8942042eb0b71dfc2289dae4f202ccc7"
             }```

2. PUT:
Create or update a new url using- ``\api\objects\{uid}``  <br>
Pass the json object in body. Returns the newly created object with a unique identifier. <br>

3. GET:
Fetch all objects using - ``\api\objects``  <br>


4. GET:
Get a particular object using the unique identifier- ``\api\objects\{uid}`` 

4. DELETE:
Delete a particular object using the unique identifier : ``\api\objects\{uid}`` 

Tested manually using POSTMAN and added automated tested.

### Overview of the  Application:

This application provided REST end points which can be used to create a new arbitrary objects. 
When a new object is created a unique id is generated for each object using md5 hashing algorithm. The object is then stored in the JSON file. The JSON file is read using IO operation and then parsed into a JSON object and then the new object is appended to the list of already created objects.
The PUT i.e. update or create checks if the uid passed as a param is present in the list of objects stored in the JSON file. If it exists the object replaced with the passed object. If the key is not present the new object is inseted with key passed as param.
The API allows deletion and get features. The delete method removes the object from the object list if present and then writes back the list to the JSON file. The user has the ability to get all objects and or fetch a particular object.

### Possible Extension Of the Application.

1. This application could be extended to use a NoSQL database like MongoDB for storing the json objects.
2. This application could be extended to provide PATCH method also.
3. This application could be extended to provide an authtication feature for users.




