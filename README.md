### INSTALL

yarn install

###

yarn start

### Deploy

git add
git commit -am
git push heroku deploy

### Error deploy

git login -i
heroku git:remote -a project-name
git push heroku HEAD:master
