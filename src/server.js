require('dotenv').config();
const app = require('./api');

const loginController = require('./controller/loginController');
const userController = require('./controller/userController');
const categoryController = require('./controller/categoryController');
const postController = require('./controller/postController');

const errorMiddleware = require('./middlewares/error');
const JWTValidator = require('./middlewares/JWTValidator');
const auth = require('./utils/authentication');
const deleteValidator = require('./middlewares/deleteValidator');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginController);

app.post('/user', userController.createNewUser);
app.get('/user', JWTValidator, userController.getAll);
app.get('/user/:id', JWTValidator, userController.getById);

app.get('/categories', JWTValidator, categoryController.getAll);
app.post('/categories', JWTValidator, categoryController.createCategory);

app.get('/post', JWTValidator, postController.getAll);
app.post('/post', JWTValidator, postController.createNewPost);
app.get('/post/:id', JWTValidator, postController.getById);
app.put('/post/:id', JWTValidator, auth, postController.updateById);
app.delete('/post/:id', JWTValidator, deleteValidator, postController.deletePost);

app.use(errorMiddleware);

app.listen(port, () => console.log('ouvindo porta', port));
