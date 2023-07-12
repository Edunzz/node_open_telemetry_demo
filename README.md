# Container simple app nodejs

# docker create image and upload
docker build -t edunzz/node-app:pokemon .
<br>
docker login
<br>
docker push edunzz/node-app:pokemon
<br>
docker run -d -p 3000:3000 edunzz/node-app:pokemon
<br>
node --require ./opentelemetry.js app.js

# Links
http://localhost:3000/api-docs/
<br>
http://{IP}:3000/api-docs/

# Author
Jose Romero
