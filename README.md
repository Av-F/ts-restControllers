# ts-restControllers

You would need to get node modules to run this:

Additional notes:
First lines are imports for express, fs to read/write files, path to access them and app.use is for middleware

DATA_FILE uses path commands to point to the users.json

readUsers() checks if the datafile exists and if not, create an empty file, then data takes in the file returning a JSON.parse of data


writeUser() writes to DAT_FILE with a stringified json of users


GET works on /users and reads all users from file and sends as JSON

POST creates users 

another get to retrieve a user by ID 

PUT updates a user

and delete deletes the user 


How to run:
In a terminal run: npx ts-node src/index.ts

In a bash run: 
curl -X POST -H "Content-Type: application/json" -d '{"name":"john"}' http://localhost:3000/users  this creates a user

curl http://localhost:3000/users/useridwhichisanumber   gets a user

curl -X PUT -H "Content-Type: application/json" -d '{"name":"Jane"}' http://localhost:3000/users/Useridwhichisanumber    updates a user

curl -X DELETE http://localhost:3000/users/Useridwhichisanumber  deletes the user


you could also user postman whith the url:
http://localhost:3000/users

Then check with method you want and then in Body->raw->JSON 
{
	"name": John
}
click send and see the response

for ones needing ID, put in the id after /users
so for example http://localhost:3000/users/1693401234567





