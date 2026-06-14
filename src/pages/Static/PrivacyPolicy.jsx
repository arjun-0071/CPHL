import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="page-content container" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-dark)' }}>Privacy Policy</h1>
      <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', marginBottom: '30px' }}>Last Updated: October 2023</p>
      
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        At CPHL, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal and organizational information when you use our procurement platform.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Information We Collect</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        When you register or submit a procurement request, we may collect information such as your name, email address, phone number, shipping address, and details regarding your organization. We also automatically collect certain technical data like IP addresses and browser types to improve our services.
      </p>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>How We Use Your Information</h2>
      <ul style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', paddingLeft: '20px', marginBottom: '20px' }}>
        <li style={{ marginBottom: '10px' }}>To process and fulfill your procurement requests.</li>
        <li style={{ marginBottom: '10px' }}>To communicate with you regarding order statuses, updates, and support.</li>
        <li style={{ marginBottom: '10px' }}>To improve our platform's functionality and user experience.</li>
        <li style={{ marginBottom: '10px' }}>To comply with legal and regulatory requirements.</li>
      </ul>

      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Data Security</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        We implement robust, industry-standard security measures to protect your data from unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
      </p>
    </div>
  );
}
