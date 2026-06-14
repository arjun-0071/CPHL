import React from 'react';

export default function TermsConditions() {
  return (
    <div className="page-content container" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-dark)' }}>Terms & Conditions</h1>
      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '30px' }}>Last Updated: October 2023</p>
      
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Welcome to CPHL. By accessing or using our platform, you agree to be bound by these Terms and Conditions. Please read them carefully before utilizing our services.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>1. Use of Platform</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Our platform is intended strictly for business-to-business (B2B) and institutional procurement of pharmaceutical products. You must ensure that all information provided during registration and order submission is accurate and lawful.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>2. Order Processing</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Submitting a request through our cart does not constitute a legally binding contract of sale. It is an inquiry for procurement. All requests are subject to review, availability confirmation, and subsequent formal agreement between your organization and CPHL.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>3. Medical Disclaimer</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Information provided on this platform regarding products, specifications, and indications is for informational purposes only. It is the responsibility of the procuring entity to verify suitability and comply with local healthcare regulations before dispensing.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>4. Limitation of Liability</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        CPHL shall not be held liable for any indirect, incidental, or consequential damages arising from the use of our platform or delays in procurement processing.
      </p>
    </div>
  );
}
