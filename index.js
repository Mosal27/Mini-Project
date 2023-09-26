const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.send('<button ><a href="/api/emp""> workouts </a> </button> ')
  });
  
  app.get('/api/emp', (req,res) =>{
    res.render("emp.json")
})

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}/`);
});