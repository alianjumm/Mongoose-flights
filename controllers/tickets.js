const Ticket = require('../models/ticket');

async function addTicket(req,res) {
    req.body.flight = req.params.id;
    await Ticket.create(req.body);
    res.redirect(`/flights/${req.params.id}`);
}

function newTicket(req, res) {
    res.render('flights/newTicket', {flightId: req.params.id});
}

module.exports = {
    add: addTicket,
    new: newTicket
}