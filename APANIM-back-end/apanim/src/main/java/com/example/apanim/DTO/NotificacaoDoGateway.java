package com.example.apanim.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;

public class NotificacaoDoGateway {

    private String status;

    @JsonProperty("payment_id") 
    private String paymentId;

    @JsonProperty("subscription_id")
    private String subscriptionId;

    @JsonProperty("external_reference")
    private String externalReference; 

    public String getStatus() {
        return status;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public String getSubscriptionId() {
        return subscriptionId;
    }

    public String getExternalReference() {
        return externalReference;
    }

    // Setters
    public void setStatus(String status) {
        this.status = status;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public void setSubscriptionId(String subscriptionId) {
        this.subscriptionId = subscriptionId;
    }

    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
    }
}