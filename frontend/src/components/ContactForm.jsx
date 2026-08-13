import { useState } from 'react';
import axios from 'axios';

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', area: '', service: '', message: '', honeypot: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, formData);
      setStatus('Thank you! Your message has been sent.');
      setFormData({ name: '', email: '', phone: '', area: '', service: '', message: '', honeypot: '' });
    } catch (error) {
      setStatus(error.response?.data?.message || 'Unable to send message right now.');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
      <input name="area" placeholder="Area" value={formData.area} onChange={handleChange} required />
      <input name="service" placeholder="Service" value={formData.service} onChange={handleChange} required />
      <textarea name="message" placeholder="Your project details" value={formData.message} onChange={handleChange} required />
      <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} style={{ display: 'none' }} />
      <button type="submit">Send enquiry</button>
      {status ? <p>{status}</p> : null}
    </form>
  );
}

export default ContactForm;
