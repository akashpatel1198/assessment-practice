const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const PORT = 3000;
const Task = require('./models/taskmodel.js')

mongoose.connect('mongodb+srv://andrewngo91:test123@cluster0.16ozigj.mongodb.net/?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('Connected to mongoose'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/')))
app.get('/', (req, res) => {
    // console.log('serving')
    res.sendFile(path.join(__dirname, '../client/index.html')) 
})

app.get('/tasks', (req, res) => {
    //const { taskItem } = req.body;
    Task.find({})
    .then((data) => {
        res.status(200).json(data);
    })
    
})

app.post('/tasks', (req, res) => {
    const { taskItem } = req.body;
    Task.create({'task': taskItem});
    res.status(200).send("OK STORED!");
})

app.delete('/tasks/:deletedId', (req, res) => {
  const { deletedId } = req.params;
  console.log("DELETEDID: ", deletedId);
  Task.findOneAndDelete({ _id: deletedId })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => console.log(err))
    // res.send("")
})


/**
 * 404 handler
 */
 app.use('*', (req,res) => {
    res.status(404).send('Not Found');
});
  
  /**
   * Global error handler
   */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send({ error: err });
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;
