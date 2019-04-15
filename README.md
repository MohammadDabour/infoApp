# infoApp
This project contains the information of the employees.

# Clone the repo
```
git clone https://github.com/MohammadDabour/infoApp.git
```
# Building and running with docker
- ```cd``` into ```infoApp``` folder.
- Run ```docker-compose up --build```
- Application starts on ```localhost:8080```
- Better to download **[Postman API Development Environment](https://www.getpostman.com/downloads/)** to check how the application working.
# Endpoints
**Get**
- ```/``` return hello message.
- ```/users``` return all the employees details.
- ```/users/{_id}``` return the employee details with specified id.

**Post**
- ```/users``` you can write on Postman body the details of employee which you need to add it.

**Delete**
- ```/users/{_id}``` delete the employee with specified id.
