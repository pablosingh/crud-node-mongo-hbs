const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const express = require('express');
// const { mainModule } = require('process');
const coneccion = require('./database');
const model = require('./model');
const app = express();

const handlebars = require('handlebars');


// Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs( {
    defaultLayout: 'main',
    layoutsDir: path.join( app.get('views'), 'layouts'),
    partialsDir: path.join( app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: handlebars
}) );
app.set( 'view engine', '.hbs');
app.use( express.urlencoded( { extended: false } ) ); // es un middleware para que no haga un encoded
app.use( express.static('public') );

// Inicializaciones

// Middlewares
app.use(morgan('dev'));

// Routes
app.get('/pre-delete', async (req,res) => {
    const personas = await model.find({});
    res.render('partials/pre-delete', {personas});
});
app.post('/delete', async (req,res) => {
    const id = req.body.id;
    const person = await model.findById( id , (err, per) => {
        if (err) 
            res.send('Error al buscar para borrar');
        else 
            per.remove( err => {
                if (err)
                    res.send('Error al borrar');
                else 
                    showAll(req,res);
            });
    });
});

app.get('/pre-edit', async(req,res) => {
    const personas = await model.find({});
    console.log(personas);
    res.render('partials/pre-edit', {personas});
});

app.post('/editing', async (req,res) => {
    const persona = await model.findById(req.body.id);
    res.render('partials/editing', {persona});
});

app.post('/edit', async (req,res) => {
    const personToUpdate = {};
    const id = req.body.id;
    personToUpdate.name = req.body.name;
    personToUpdate.tel = req.body.tel;
    await model.findByIdAndUpdate( id, personToUpdate, (err, personToUpdate) => {
        if (err) console.err(err);
        else console.log('Editado');
    } );
    showAll(req,res);
});

app.get('/add', (req,res) => { 
    res.render('partials/add');
});

const showAll = async (req,res) => {
    const personas = await model.find({});
    console.log(personas);
    res.render('partials/all', {personas});
}

app.get('/all', showAll);

app.post('/add', async (req,res) => {
    const { name, tel } = req.body;
    const user = new model ( {name,tel } );
    await user.save();
    res.render('partials/show', {name, tel});
} );

// Server
app.listen( app.get('port'), (req,res) => {
    console.log(`Server on port: ${app.get('port')}`);
} );



