const stripe = require('stripe')('sk_test_51OeQ8KBreDsp0T1J1HlXraYhhk7elJsx9JgrPcjFAMQOwSZeCkFgfCMDpay0nN3td53keK7cdaoF8Vpwp9Tk8L4X00mdKB7SQz');
const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';
app.get('/', (req, res) => {
  res.send('Hello, World!');
})
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation', // Product name
            },
            unit_amount: 1000, // 1000 cents = $10.00, adjust accordingly for other amounts
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success.html`,
      cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(4242, () => console.log('Running on port 4242'));
;

