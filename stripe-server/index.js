const express = require('express');
const app = express();

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const cors = require('cors');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors);

app.post('/stripe/charge', async (req, res) => {
    console.log('Route reached', req.body);
    let { amount, id } = req.body;
    console.log('Amount and id', amount, id);
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            descriprtion: "Test Company",
            payment_method: id,
            confirm: true,
        })
        console.log('Payment', payment);
        res.json({
            message: "Payment Successful",
            success: true,
        })
    } catch (error) {
        console.log('Error', error);
        res.json({
            message: "Payment Failed",
            success: false,
        })
    }
})

app.listen(process.env.PORT || 8080, () => console.log('Server started'))