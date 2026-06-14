import React from 'react';

export default function AboutUs() {
  return (
    <div className="page-content container" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-dark)' }}>About CPHL</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Welcome to CPHL, your premier destination for reliable and efficient pharmaceutical procurement. We are dedicated to bridging the gap between quality healthcare products and the organizations that need them the most.
      </p>
      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Our Mission</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', marginBottom: '20px' }}>
        Our mission is to simplify the procurement process by providing a seamless, transparent, and secure platform. We believe that access to genuine medicines and medical supplies should be straightforward, which is why we meticulously vet our sources and streamline the ordering process.
      </p>
      <h2 style={{ fontSize: '24px', marginTop: '40px', marginBottom: '16px' }}>Why Choose Us?</h2>
      <ul style={{ fontSize: '16px', lineHeight: '1.7', color: 'var(--color-text-secondary)', paddingLeft: '20px' }}>
        <li style={{ marginBottom: '10px' }}><strong>Quality Assurance:</strong> We partner with trusted manufacturers to ensure 100% genuine products.</li>
        <li style={{ marginBottom: '10px' }}><strong>Streamlined Process:</strong> Our platform is designed for quick browsing, easy cart management, and rapid request submission.</li>
        <li style={{ marginBottom: '10px' }}><strong>Dedicated Support:</strong> Our team is always ready to assist you with your procurement needs.</li>
      </ul>
    </div>
  );
}
