// Read a file
const fs = require('fs');

const data = 'words and letters!';

fs.writeFile('example.txt', data, err => {
    if (err) {
        console.error(err);
    }
    console.log('File content:', data);

});

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File content:', data);
});


fs.unlink('example.txt',function(err){
    if(err) return console.log(err);
    console.log('file deleted successfully');
});  
