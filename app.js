var express = require("express");
var app = express();
var port = process.env.PORT || 8081;
var moment = require("moment");


app.get('/', function(req, res) {
    res.send('please add a date to the url')
})

app.get('/:timeinput', function (req, res) {
  
  var timeinput = req.params.timeinput
  console.log('received req with param, ' + timeinput)
  res.json(getFormattdTimestamp(timeinput));
})

function getFormattdTimestamp(inputParam) {
    var result = {
        unix: null,
        natural: null,
    };
    var date = inputParam;
    var isnum = /^[\-\d]+$/.test(+inputParam);//if param includes only numbers 
    
    if (isnum) {
        date = new Date(+inputParam).toDateString();//if date is given in unix convert to string format
        console.log('number date to string = ' + date)
    }
    if (moment(date).isValid()) {
            // console.log(moment(date))
            result.unix = new Date(date).getTime();
            result.natural = moment(date).format('MMMM D, YYYY');
        }
    return result;
}
app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})