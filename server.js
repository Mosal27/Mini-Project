const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override')


app.get('/', (req, res) =>{
  res.send(`<h1>welcome to my store</h1><button ><a href="/api/workouts""> workouts </a> </button> <button ><a href="/api/workouts/add""> add workouts </a> </button> `)
  })
// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api/users') {
    // Read user data from a file using fs and path modules
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(data);
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});


app.use((req,res,next) =>{
console.log(`${req.method} request for ${req.url}`);
next()
})

app.get('/api/workouts/add', (req,res) =>{
  res.render('workoutForm.ejs');
})




const workouts = [
    { id: 1, name: 'Pushups' },
    { id: 2, name: 'Situps' },
    { id: 3, name: 'Jogging' },
]

app.get('/', (req, res) =>{
    res.send(`<button ><a href="/api/workouts""> workouts </a> </button> <button ><a href="/api/workouts/add""> add workouts </a> </button> `)
})

app.get('/api/workouts', (req,res) =>{
    res.render("workouts.ejs", {workouts})
})

app.get('/api/workouts/add', (req,res) =>{
    res.render('workoutForm.ejs');
})

// we will continue this on thusday
app.get('/api/workouts/add/:id', (req,res) =>{
    res.render('updateWorkout.ejs');
})

app.post('/api/workouts', (req, res)=>{

    console.log(req.body.name);

    const newWorkout ={
    id:workouts.length + 1,
    name: req.body.name
    };

    workouts.push(newWorkout);
    res.redirect('/api/workouts');

})


// Define a PUT route handler for updating a workout.
app.put('/api/workouts/update/:id', (req, res) => {
    console.log("fired put");
    const workoutId = parseInt(req.params.id);
    const updatedName = req.body.name;

    const workout = workouts.find(w => w.id === workoutId);

    if (workout) {
      workout.name = updatedName;
      res.status(200).send(`Workout with ID ${workoutId} updated.`);
    } else {
      res.status(404).send (`Workout with ID ${workoutId} not found.`);
    }
  });


// Define a DELETE route handler for deleting a workout.
app.delete('/api/workouts/delete/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);

    const index = workouts.findIndex(w => w.id === workoutId);

    if (index !== -1) {
      workouts.splice(index, 1);
    //   res.status(200).send(`Workout with ID ${workoutId} deleted.`);
      res.redirect('/api/workouts')
    } else {
      res.status(404).send(`Workout with ID ${workoutId} not found.`);
    }
  });
// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});


