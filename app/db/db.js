const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/barkelysstore', {
mongoose.connect('mongodb+srv://jora:OjoEHwrKqsLhimdo@cluster0-8jnyu.mongodb.net/barkleys?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to database successfully'))
.catch((err) => console.log('Failed to connect to database',JSON.stringify(err, undefined, 3)));
    
module.exports = {mongoose};