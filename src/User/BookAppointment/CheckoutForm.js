import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function CheckoutForm({ details }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const base_url =
      "http://127.0.0.1:5001/hospital-management-6b160/us-central1/api";
    const getClientSecret = async () => {
      const { data } = await axios({
        method: "post",
        url: `${base_url}/payment/create`,
        data: {
          amount: details.fees,
        },
      });
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    };
    if (details && details.fees) {
      getClientSecret();
    } else {
      navigate("/appointments");
    }
  }, [details, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const stringClientSecret = clientSecret.toString();

    await stripe
      .confirmCardPayment(stringClientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${details.userDetails.firstname} ${details.userDetails.lastname}`,
          },
        },
      })
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          addDoc(collection(db, "appointments"), details);
          alert("Appoitnment booked successfully.");
          setSucceeded(true);
          setProcessing(false);
          navigate("/appointments");
        }
      })
      .catch((e) => {
        console.error("Error inserting data", e);
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setProcessing(false);
    setError(e.error ? e.error.message : null);
  };

  return (
    <div>
      {details && details.fees && (
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="appointment-details">
            <h2> Appoitnment Details </h2>
            <p> <strong>Doctor Name:</strong> {details.doctorName} </p>
            <p> <strong>Appoitnment Date:</strong> {details.date} </p>
            <p> <strong>Appoitnment Time:</strong> {details.appointmentTime} </p>
            <p> <strong>Your total amount is:</strong> ${details.fees} </p>
          </div>
          <h2> Payment Details </h2>
          <CardElement onChange={handleChange} />
          <button disabled={processing || succeeded || disabled}>
            <span> {processing ? "Processing..." : "Pay now"} </span>
          </button>
          {error && <div>{error}</div>}
        </form>
      )}
    </div>
  );
}

export default CheckoutForm;
