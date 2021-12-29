const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");
const fs = require("fs")

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

app.engine('.html', require('ejs').renderFile);
app.set("view engine", "ejs")
app.set("views", "views")

httpserver.listen(3000);


function get_data() {
  return JSON.parse(fs.readFileSync("data.json"))
}

function save_data(data) {
  fs.writeFileSync("data.json", JSON.stringify(data))
}

function get_raw_data() {
  return fs.readFileSync("data.json")
}

io.on('connection', function(socket){
  socket.on("form", (username, info) => {
    let data = get_data()
    data.contacts.unshift({"author": username, "message": info, "id": Math.round(Math.random()* 10000000000000)})
    save_data(data)
  })
  socket.on("buy-static-website", (fullname, email, desc) => {
    let data = get_data()
    data["static-websites"].unshift({"fullname": fullname, "email": email,"desc": desc , "id": Math.round(Math.random()* 10000000000000)})
    save_data(data)
  })
  socket.on("buy-dynamic-website", (fullname, email, desc) => {
    let data = get_data()
    data["dynamic-websites"].unshift({"fullname": fullname, "email": email,"desc": desc , "id": Math.round(Math.random()* 10000000000000)})
    save_data(data)
  })
  socket.on("buy-custom-bot", (fullname, email, desc) => {
    let data = get_data()
    data["custom-bots"].push({"fullname": fullname, "email": email,"desc": desc , "id": Math.round(Math.random()* 10000000000000)})
    save_data(data)
  })
  socket.on("login-request", (username, password) => {
    var data = get_data()
    if (data.admins[username]) {
      if (data.admins[username].password == password) {
        socket.emit("login", "succeed", data.admins[username])
      } else {
        socket.emit("login", "Wrong password entered", "none")
      }
    } else {
      socket.emit("login", `Invalid user ${username}`, "none")
    }
  })
  socket.on("remove", (id) => {
    let data = get_data()
    for (let i=0; i < data.contacts.length; i++) {
      if(data.contacts[i].id == id) {
        data.contacts.splice(i, 1);
      }
    }
    save_data(data)
  })
  socket.on("remove_mess1", (id) => {
    let data = get_data()
    for (let i=0; i < data["static-websites"].length; i++) {
      if(data["static-websites"][i].id == id) {
        data["static-websites"].splice(i, 1);
      }
    }
    save_data(data)
  })
  socket.on("remove_mess2", (id) => {
    let data = get_data()
    for (let i=0; i < data["dynamic-websites"].length; i++) {
      if(data["dynamic-websites"][i].id == id) {
        data["dynamic-websites"].splice(i, 1);
      }
    }
    save_data(data)
  })
  socket.on("remove_mess3", (id) => {
    let data = get_data()
    for (let i=0; i < data["custom-bots"].length; i++) {
      if(data["custom-bots"][i].id == id) {
        data["custom-bots"].splice(i, 1);
      }
    }
    save_data(data)
  })
})

app.get("/", (res, req) => {
  req.render("index.html", {data: get_data()})
})

app.get("/admin", (res, req) => {
  req.render("admin.html", {data: get_data()})
})


app.get("/buy/static-website", (res, req) => {
  req.render("static-website.html")
})

app.get("/buy/dynamic-website", (res, req) => {
  req.render("dynamic-website.html")
})

app.get("/buy/custom-bot", (res, req) => {
  req.render("custom-bot.html")
})

app.get("/buy", (res, req) => {
  req.redirect("/")
})