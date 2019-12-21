# Appiness nodejs task

Deployed to Heroku Url : https://dry-castle-38837.herokuapp.com/

Github repo : https://github.com/vyshakg/appiness-nodejs-task


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

<pre>
- ` /api/register `  : POST : To register a user.
- ` /test/reset ` : POST : To Sell a share in security.
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

### Output screenshot :

![tradebuy](https://user-images.githubusercontent.com/17231224/55734708-ab013a00-5a3d-11e9-9892-5281ea00772a.png)

---

## Error handling for the invalid OwnerShip and quantity :

### Inavalid Quantity : 

![errorhandling](https://user-images.githubusercontent.com/17231224/55734893-ffa4b500-5a3d-11e9-8bac-3678908bc74a.png) 

---

### Invalid Ownership :

![errorhandling2](https://user-images.githubusercontent.com/17231224/55734931-0a5f4a00-5a3e-11e9-8faa-743c190f8919.png)



