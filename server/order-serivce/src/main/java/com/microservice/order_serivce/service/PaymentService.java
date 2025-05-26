package com.microservice.order_serivce.service;


import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {

    private final String stripeSecretKey;

    public PaymentService(Dotenv dotenv) {
        this.stripeSecretKey = dotenv.get("STRIPE_SECRET_KEY");
    }

    public PaymentIntent createPaymentIntent(double amount, String currency, Long orderId, Long sellerId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) (amount * 100))
                .setCurrency(currency)
                .putAllMetadata(java.util.Map.of("orderId", orderId.toString(), "sellerId", sellerId.toString()))
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                )
                .build();

        return PaymentIntent.create(params);
    }

    public String confirmPaymentIntent(String paymentIntentId) throws StripeException {
        Stripe.apiKey = stripeSecretKey;
        PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
        return paymentIntent.getStatus();
    }
}
