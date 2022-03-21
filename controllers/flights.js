const res = require('express/lib/response');
let Flight = require('../models/flight');
const ticket = require('../models/ticket');

async function index(req, res) {
    let flights = await Flight.find({})
    console.log(flights);
    res.render('flights/index', { flights });
  };

function newFlight(req, res) {
    res.render('flights/new');
}

async function addFlight(req, res){
    // console.log(req.body)
    // req.body.destination = [];
    await Flight.create(req.body);
    res.redirect('/flights');
}

async function show(req, res) {
    let flight = await Flight.findById(req.params.id);
    let tickets = await ticket.find({flight: flight.id});
    res.render('flights/show', {tickets, flight});
}

async function addDestination(req,res) {
    let flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body)
    await flight.save();
    res.redirect(`/flights/${req.params.id}`);
}

module.exports = {
    index,
    new: newFlight,
    add: addFlight,
    show,
    addDestination,
}