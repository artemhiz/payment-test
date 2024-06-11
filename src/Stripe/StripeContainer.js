import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY = 'pk_test_51PQV1mI0Yb4GLo9nUjlwfeR9OcJY5NZ2haIn7d1cKp5nFOyt6ZmuKtL3xKMsoa1YjCLYxlP37ZKUffJk41pXtpZB008H3AIapk';
const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return <Elements stripe={stripeTestPromise}>
        <CheckoutForm/>
    </Elements>
}