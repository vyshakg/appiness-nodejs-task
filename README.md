# Appiness nodejs task
<pre>
Deployed to Heroku Url & swagger UI : https://dry-castle-38837.herokuapp.com/(swagger having some issue use postman)
READ me : https://dry-castle-38837.herokuapp.com/readme
Github repo : https://github.com/vyshakg/appiness-nodejs-task
</pre>

What I have Used : 
<pre>
1.Javascript
2.Express
3.babel - to compile down to vanilla javascript from es6
4.body-parser - to parse the incoming request
5.mongodb
6.mongosee - ODM  
7.Docker
8.Heroku - deployment
</pre>

### Api End-points :
All APIs are exposed in https://dry-castle-38837.herokuapp.com/{endpoints}
<pre>
- ` /api/register `  : POST : To register a user.
- ` /api/reset ` : POST : To Reset database (FOR TEST).
</pre>

### Ex. Register
Input : 
<pre>
- username
- email
- password
</pre>
Output : (For 1st user)

```json
{
    "status": "SUCCESS",
    "message": "vyshak is register as ROLE_ADMIN"
}
```
Output : (For subsequent user with different email)
```json
{
    "status": "SUCCESS",
    "message": "vyshak is register as ROLE_USER"
}
```
Output : (For same email)
```json
{
    "status": "FAILURE",
    "message": "vyshak1@gmail.com is already taken"
}
```


---

### Code screeshot:

![carbon](https://user-images.githubusercontent.com/17231224/71304270-8641cc80-23ea-11ea-859b-a3f91a19622c.png)

---
### Swagger UI
![swagger](https://user-images.githubusercontent.com/17231224/71305897-28b87a80-2400-11ea-9ade-d7dde2104dda.png)

---
### Output screenshot for 1st new User - Role as admin :

![admin](https://user-images.githubusercontent.com/17231224/71304419-75925600-23ec-11ea-9dff-c3ff2945e8ad.png)

---
### Output screenshot for subsequent new User - Role as User :

![user](https://user-images.githubusercontent.com/17231224/71304437-a4103100-23ec-11ea-8207-e42d5ee8a54c.png)

---

### Output screenshot for same user email  :

![same](https://user-images.githubusercontent.com/17231224/71304442-d02bb200-23ec-11ea-8043-ce514a802a47.png)

---
### Output screenshot to test -  reset the database  :

![reset](https://user-images.githubusercontent.com/17231224/71304450-eafe2680-23ec-11ea-8c45-e38a3fc4d60a.png)

---

