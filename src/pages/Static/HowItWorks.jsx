import React from 'react';

export default function HowItWorks() {
  return (
    <div className="page-content container" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-dark)' }}>How It Works</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
        Procuring pharmaceuticals through CPHL is designed to be as straightforward as possible. Follow these simple steps to complete your request.
      </p>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '10px' }}>1. Browse & Search</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
          Explore our extensive catalog of medicines, supplements, and medical supplies. You can filter by category or use our advanced search feature to find exactly what you need.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '10px' }}>2. Build Your Cart</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
          Select the products and the specific quantities required for your procurement. Review your cart to ensure all necessary items are included before proceeding.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '10px' }}>3. Submit Your Request</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
          Proceed to checkout and provide your delivery details. Once submitted, your order request is securely sent to our team for immediate processing. No upfront payment is required on the platform.
        </p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ fontSize: '20px', color: 'var(--color-primary)', marginBottom: '10px' }}>4. Confirmation & Fulfillment</h3>
        <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)' }}>
          Our team will review your request, confirm availability and pricing, and get in touch with you to finalize the procurement and arrange for secure delivery.
        </p>
      </div>
    </div>
  );
}
