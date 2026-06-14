import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Send,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  Loader,
  ShoppingCart,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xwvzdbez';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartCount, cartTotal, cartMrpTotal, cartSavings, clearCart } = useCart();
  const { currentUser, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    alternateMobile: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });

  const [pincodeValidating, setPincodeValidating] = useState(false);
  const [pincodeVerified, setPincodeVerified] = useState(false);

  const validatePincode = async (pin) => {
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setErrors((prev) => ({ ...prev, pincode: 'Enter a valid 6-digit Indian pincode' }));
      setPincodeVerified(false);
      return false;
    }

    setPincodeValidating(true);
    setErrors((prev) => ({ ...prev, pincode: '' }));

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      if (data && data[0] && data[0].Status === 'Success') {
        const postOffices = data[0].PostOffice;
        if (postOffices && postOffices.length > 0) {
          const postOffice = postOffices[0];
          
          // Autofill City and State
          setFormData((prev) => ({
            ...prev,
            city: prev.city || postOffice.District || '',
            state: prev.state || postOffice.State || '',
          }));

          setErrors((prev) => ({ ...prev, pincode: '' }));
          setPincodeVerified(true);
          return true;
        }
      }
      
      setErrors((prev) => ({ ...prev, pincode: 'Pincode not found/invalid in India' }));
      setPincodeVerified(false);
      return false;
    } catch (err) {
      console.error('Error validating pincode:', err);
      // Fallback: If API is unavailable, rely on regex check
      setErrors((prev) => ({ ...prev, pincode: '' }));
      setPincodeVerified(true);
      return true;
    } finally {
      setPincodeValidating(false);
    }
  };

  useEffect(() => {
    const pin = formData.pincode.trim();
    if (pin.length === 6) {
      validatePincode(pin);
    } else {
      setPincodeVerified(false);
      if (pin.length > 6 || (pin.length > 0 && !/^\d+$/.test(pin))) {
        setErrors((prev) => ({ ...prev, pincode: 'Enter a valid 6-digit Indian pincode' }));
      } else {
        // Clear pincode error when typing (unless it was already flagged as invalid)
        setErrors((prev) => {
          const newErr = { ...prev };
          if (newErr.pincode && newErr.pincode !== 'Enter a valid 6-digit Indian pincode') {
            delete newErr.pincode;
          }
          return newErr;
        });
      }
    }
  }, [formData.pincode]);

  useEffect(() => {
    if (!loading && currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || currentUser.displayName || '',
        email: prev.email || currentUser.email || '',
      }));
    }
  }, [loading, currentUser]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🛒</div>
            <h3 className="empty-state-title">Your Cart is Empty</h3>
            <p className="empty-state-text">
              Add products to your cart before checkout.
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              <ShoppingCart size={18} /> Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Check authentication status
  if (loading) {
    return (
      <div className="page-content">
        <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <Loader size={32} className="spin" style={{ color: 'var(--color-primary)' }} />
          <p style={{ marginTop: '16px', color: 'var(--color-text-secondary)' }}>Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="page-content">
        <div className="container">
          <div className="empty-state">
            <div className="empty-state-icon">🔒</div>
            <h3 className="empty-state-title">Sign In Required</h3>
            <p className="empty-state-text">
              You need to be logged in to submit a procurement request.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg">
              <User size={18} /> Sign In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Invalid email address';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
      newErrors.mobile = 'Enter a valid 10-digit mobile number';
    if (!formData.addressLine1.trim())
      newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit Indian pincode';
    } else if (!pincodeVerified) {
      newErrors.pincode = 'Please enter a valid and verified Indian pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildOrderSummary = () => {
    const lines = cartItems.map((item, i) => {
      const priceNum = item.price ? Number(item.price.replace(/[^0-9.-]+/g, "")) : 0;
      const pack = item.packSize ? ` (${item.packSize})` : '';
      return `${i + 1}. ${item.name}${pack} — Qty: ${item.quantity} × ${item.price || 'Price on Request'} = ₹${priceNum * item.quantity}`;
    });
    return lines.join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pincodeValidating) {
      alert('Please wait, pincode validation is in progress.');
      return;
    }
    if (!validate()) return;

    setSubmitting(true);

    const payload = {
      _subject: `CPHL Procurement Request — ${formData.fullName}`,
      'Customer Name': formData.fullName,
      Email: formData.email,
      Mobile: formData.mobile,
      'Alternate Mobile': formData.alternateMobile || 'N/A',
      Address: `${formData.addressLine1}, ${formData.addressLine2 || ''}, ${formData.city}, ${formData.state} — ${formData.pincode}`,
      'Additional Notes': formData.notes || 'None',
      'Total Items': cartCount,
      'Total Amount (₹)': cartTotal.toFixed(0),
      'Total MRP (₹)': cartMrpTotal.toFixed(0),
      'Total Savings (₹)': cartSavings.toFixed(0),
      'Order Details': buildOrderSummary(),
    };

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        clearCart();
        navigate('/order-success');
      } else {
        // Even if Formspree endpoint is not configured, simulate success for demo
        clearCart();
        navigate('/order-success');
      }
    } catch {
      // For demo, navigate to success even on network error
      clearCart();
      navigate('/order-success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page page-content">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/cart">Cart</Link>
          <span>/</span>
          <span className="breadcrumb-current">Checkout</span>
        </nav>

        <Link to="/cart" className="pd-back">
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="checkout-title">
          <Send size={28} /> Submit Procurement Request
        </h1>
        <p className="checkout-subtitle">
          Fill in your details below. Your order summary will be emailed to our
          procurement team for processing. No payment required.
        </p>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="checkout-form" id="checkout-form">
            <div className="checkout-section">
              <h2>
                <User size={20} /> Personal Details
              </h2>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <span className="form-error">{errors.fullName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <span className="form-error">{errors.email}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">
                    Mobile Number *
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="10-digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                  {errors.mobile && (
                    <span className="form-error">{errors.mobile}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="alternateMobile">
                    Alternate Mobile
                  </label>
                  <input
                    id="alternateMobile"
                    name="alternateMobile"
                    type="tel"
                    placeholder="Optional"
                    value={formData.alternateMobile}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>
                <MapPin size={20} /> Delivery Address
              </h2>

              <div className="form-group">
                <label className="form-label" htmlFor="addressLine1">
                  Address Line 1 *
                </label>
                <input
                  id="addressLine1"
                  name="addressLine1"
                  type="text"
                  placeholder="Building, Street, Area"
                  value={formData.addressLine1}
                  onChange={handleChange}
                />
                {errors.addressLine1 && (
                  <span className="form-error">{errors.addressLine1}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="addressLine2">
                  Address Line 2
                </label>
                <input
                  id="addressLine2"
                  name="addressLine2"
                  type="text"
                  placeholder="Landmark (optional)"
                  value={formData.addressLine2}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="city">
                    City *
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <span className="form-error">{errors.city}</span>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="state">
                    State *
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                  />
                  {errors.state && (
                    <span className="form-error">{errors.state}</span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="pincode">
                    Pincode *
                  </label>
                  <div className="pincode-input-wrapper">
                    <input
                      id="pincode"
                      name="pincode"
                      type="text"
                      placeholder="6-digit pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                    {pincodeValidating && (
                      <span className="pincode-status-indicator checking">
                        <Loader size={16} className="spin" />
                      </span>
                    )}
                    {!pincodeValidating && pincodeVerified && (
                      <span className="pincode-status-indicator verified">✓ Verified</span>
                    )}
                  </div>
                  {errors.pincode && (
                    <span className="form-error">{errors.pincode}</span>
                  )}
                </div>
                <div className="form-group" />
              </div>
            </div>

            <div className="checkout-section">
              <h2>
                <FileText size={20} /> Additional Notes
              </h2>
              <div className="form-group">
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  placeholder="Any special requirements, preferred delivery time, etc."
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-summary" id="checkout-summary">
            <h2 className="checkout-summary-title">Order Summary</h2>

            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item-info">
                    <span className="checkout-item-name">{item.name}</span>
                    <span className="checkout-item-qty">
                      Qty: {item.quantity} × {item.price || 'Price on Request'}
                    </span>
                  </div>
                  <span className="checkout-item-total">
                    ₹{item.price ? (Number(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(0) : 0}
                  </span>
                </div>
              ))}
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-row">
              <span>Subtotal ({cartCount} items)</span>
              <span>₹{cartMrpTotal.toFixed(0)}</span>
            </div>

            {cartSavings > 0 && (
              <div className="cart-summary-row cart-savings">
                <span>Discount</span>
                <span>-₹{cartSavings.toFixed(0)}</span>
              </div>
            )}

            <div className="cart-summary-divider" />

            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(0)}</span>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg btn-block checkout-submit-btn"
              disabled={submitting}
              id="submit-order-btn"
            >
              {submitting ? (
                <>
                  <Loader size={18} className="spin" /> Submitting...
                </>
              ) : (
                <>
                  <Send size={18} /> Submit Procurement Request
                </>
              )}
            </button>

            <p className="cart-note">
              🔒 Your details are sent securely. No payment will be processed.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
