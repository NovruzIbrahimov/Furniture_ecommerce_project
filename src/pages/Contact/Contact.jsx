/* eslint-disable no-unused-vars */
import React from "react";
import "../../pages/Contact/contact.css";

function Contact() {
  return (
    <div className="contact-section">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-lg-6 col-md-12 contactSection">
            <h2>Bizimlə əlaqə saxlayın</h2>
            <p>
              Hər hansı bir sualınız üçün bizimlə əlaqə saxlayın. Eviniz üçün
              mükəmməl mebel seçməkdə sizə kömək etmək üçün buradayıq.
            </p>
            <ul className="list-unstyled">
              <li>
                <strong>Ünvan:</strong> Q.Məmmədov küçəsi 123, Bakı, Azərbaycan
              </li>
              <li>
                <strong>Telefon:</strong> +994 51 858 58 00
              </li>
              <li>
                <strong>E-poçt:</strong> novruz.ibrahimov56@gmail.com
              </li>
            </ul>
          </div>
          <div className="col-lg-6 col-md-12">
            <iframe
              title="Map of Azerbaijan"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3036.049378769468!2d49.85506431525756!3d40.392046477961956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403079dd0d9441e3%3A0x3216f392bed8c20b!2sBaku%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1629729719380!5m2!1sen!2s"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 contact-form">
            <h2 className="text-center mb-4">Bizə Mesaj Göndərin</h2>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="name">Ad</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Adınızı daxil edin"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="email">E-poçt</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="E-poçtunuzu daxil edin"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Mesaj</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Mesajınızı daxil edin"
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-submit mt-3">
                  Təqdim edin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
