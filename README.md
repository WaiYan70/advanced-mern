This MERN Application is focused on the authentication which implement with JSON Web Token using HTTP-Only Cookie instead of storing the token in the local storage in browser.
Using HTTP-Only Cookie is more secure and less acceptabel to thing like cross-site scrioting attacks. 
When User log out, it will not only destroy the cookie in the backend but also, clear the local storage. Because it will be storing non-sensitive User data in local storage.
In this Project, I use {"type": "module"} in package.json