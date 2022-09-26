const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Title",
    name: "Rei Ashimi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rei Ashimi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is a help message for this page",
    title: "Help",
    name: "Rei Ashimi",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast(
      latitude || 37.8267,
      longitude || -122.4233,
      (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Error! Help article not found!",
    title: "404 Help",
    name: "Rei Ashimi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Error! Not found!",
    title: "404",
    name: "Rei Ashimi",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
