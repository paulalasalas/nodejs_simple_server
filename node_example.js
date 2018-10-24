var http = require('http')

var server = http.createServer(function (request, response) {
  var url = request.url
  var data = url.split('?')

  if(data[0] === '/suma') {
    var suma = 0
    var input = data[1].split('&')
    input.forEach(function(numero) {
      var splitted = numero.split('=')[1]
      if(isNumeric(splitted)) {
        //Ok, it's a number
        var number = Number(splitted)
        suma += number
      } else {
        //It's not a number, so we show an error message and sends to the client
        response.writeHead(400, {'Content-Type': 'application/json'})
        response.end(JSON.stringify({result:'error, el input debe ser numerico'}))
      }
    })
    //If everithing was OK, we send code 200 response, using json format
    response.writeHead(200, {'Content-Type': 'application/json'})
    response.end(JSON.stringify({result:suma}))
  }

  if(data[0]=='/multiplicacion'){
    m = 1
    var input = data[1].split('&')
    input.forEach(function(data){
      var num = Number(data.split('=')[1])
      m *= num
    })
    response.end("El resultado de la multiplicacion es: " + m)
  }

  if(data[0]=='/fibonacci'){
    var n1 = 0;
    var n2 = 1;
    var n3;
    var input = data[1].split('&')
    input.forEach(function(data){
      var num2 = Number(data.split('=')[1])
      for(var i=1; i<num2; i++){
        n3 = n1 + n2;
        n1 = n2;
        n2 = n3;
      }
    })
    response.end("La sucesion es: " + n3)
  }
})

/**
 ** isNumeric returns true if input is a number. This can be done using the oppsite behaviour from isNaN function
 **/
function isNumeric(num) {
  //isNaN returns false if the input is a number, true otherwise
  return !isNaN(num)
}

server.listen(8080)
