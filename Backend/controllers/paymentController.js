
import Stripe from "stripe";

const secret = "sk_test_51PJxTxSFy5zHhVvnJLM9pUnwjoX5toddEjnxLlABfzbDtgV3wL1dCKm9GHkmYqvRTnGg7WAeDWV3FwBIdcVKUus900Znw0epMD";
const stripe = new Stripe(secret);

const processPayment = async (req, res, next) => {
    try {
      const {amount, description} = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "inr",
        description,
        automatic_payment_methods: {
          enabled: true,
        },
        
      });
  
      res.status(200).json({
        success: true,
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const sendStripeAPIKey = async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
};

export { processPayment, sendStripeAPIKey };
