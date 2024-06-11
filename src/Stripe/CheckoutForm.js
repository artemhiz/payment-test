import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios";

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    async function handleSubmit(event) {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })

        if (error) {
            console.log(error.message);
        } else {
            console.log('Token Generated!', paymentMethod);
            try {
                const { id } = paymentMethod;
                const response = await axios.post("http://localhost:8080/stripe/charge",
                    {
                        amount: 999,
                        id: id,
                    }
                )
                console.log('Response data success');
                if (response.data.success) {
                    console.log('Payment Successful');
                }
            } catch (error) {
                console.log("Error: ", error)
            }
        }
    }

    return <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <CardElement/>
        <button>Pay</button>
    </form>
}