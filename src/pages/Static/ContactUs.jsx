import React from 'react';

import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="page-content container" style={{ padding: '60px 20px', minHeight: '60vh', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '36px', marginBottom: '24px', color: 'var(--color-dark)' }}>Contact Us</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.8', color: 'var(--color-text-secondary)', marginBottom: '40px' }}>
        Have questions about a product or need help with a procurement request? Our dedicated team is here to assist you.
      </p>

      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginBottom: '50px' }}>
        <div style={{ padding: '30px', background: 'var(--color-bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
          <Mail size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Email Us</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>info@cphl.com</p>
        </div>
        <div style={{ padding: '30px', background: 'var(--color-bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
          <Phone size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Call Us</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>+91 12345 67890</p>
        </div>
        <div style={{ padding: '30px', background: 'var(--color-bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
          <MapPin size={32} color="var(--color-primary)" style={{ marginBottom: '16px' }} />
          <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Headquarters</h3>
          <p style={{ color: 'var(--color-text-secondary)' }}>Mumbai, India</p>
        </div>
      </div>

      <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Send us a Message</h2>
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            <input type="text" placeholder="Your Name" style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
            <input type="email" placeholder="Your Email" style={{ flex: 1, padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
          </div>
          <input type="text" placeholder="Organization / Company" style={{ padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px' }} />
          <textarea placeholder="How can we help you?" rows="5" style={{ padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px', resize: 'vertical' }}></textarea>
          <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 32px' }}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
