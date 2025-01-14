import React from "react";
import { Link } from "react-router-dom";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedin,FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-8 rounded-t-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className="company-info">
            <h2 className="text-lg font-semibold mb-4">About Our Company</h2>
            <p className="text-sm">
              We are a leading eCommerce platform dedicated to providing our customers with the best products at competitive prices. Our top priority is customer satisfaction, and we strive to ensure that every customer has a positive experience with our platform.
            </p>
          </div>

          {/* Contact Information */}
          <div className="contact-info">
            <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
            <p className="text-sm">
              If you have any questions or concerns, please don't hesitate to contact us. We're always here to help.
            </p>
            <ul className="list-none">
              <li className="text-sm">
                Email: <a href="mailto:info@example.com">info@example.com</a>
              </li>
              <li className="text-sm">
                Phone: 555-555-5555
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="social-media">
            <h2 className="text-lg font-semibold mb-4">Stay Connected with Us</h2>
            <div className="flex space-x-4">
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaFacebookSquare className="size-7" />
              </Link>
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaSquareXTwitter className="size-7" />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <IoLogoInstagram className="size-7" />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                <FaLinkedin className="size-7" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center border-t border-gray-700 pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Any-Buy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;