import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-solid-svg-icons"
import "./Footer.css";

import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <>
     <footer>
        <div className="footer">
            <div className="footer-bowl">

                <div id="first-col">
                    <div className="shiping">
                        <img className="imgtruck" src="https://images.mamaearth.in/wysiwyg/mobile-truck.png
                " alt="#"/>
                        <h3 className="free-head">Free Shiping</h3>
                            <p className="mb-1">On Order Above Rs.399</p>
                    </div>

                    <div className="cod-bowl">
                        <img className="imgtruck" src="https://images.mamaearth.in/wysiwyg/mobile-wallet.png"
                            alt="#"/>
                        <h3 className="cod-head">COD Available</h3>
                        <p className="mb-1">@ Rs.40 Per Order</p>
                    </div>

                    <div className="contactus-bowl">
                        <h2>Have Queries or Concerns?</h2>
                        <NavLink to=""><button id="contact-btn" className="mb-1">CONTACT US</button></NavLink>
                    </div>
                </div>
                <div className="payment-certificate">
                    <div className="payment-bowl">

                        <div className='' opetion-card>
                            <h3 className="head">PAYMENT</h3> <br/>
                            <h4 className="head2"><span><img class="img1"
                                        src="https://images.mamaearth.in/wysiwyg/noun_trusted_27146262x_6Ekja92.png"
                                        alt="#"/></span>100% Payment Protection, Easy Return Policy</h4>
                            <img className="card"
                                src="https://images.mamaearth.in/png/web-payments.png"
                                alt="#"/>

                        </div>
                    </div>

                    
                </div>

                <div className="imp-link">

                    <div className="useful-bowl">
                        <h1 className="useful-head">USEFUL LINKS</h1>
                        <ul>
                            <li className="link-foot"><NavLink to="">Privacy Policy</NavLink></li>
                            <li className="link-foot"><NavLink to="">Returns</NavLink></li>
                            <li className="link-foot"><NavLink to="">Terms&Conditions</NavLink></li>
                            <li className="link-foot"><NavLink to="">Terms&Conditions-Cashback</NavLink></li>
                            <li className="link-foot"><NavLink to="">FAQs</NavLink></li>
                            <li className="link-foot"><NavLink to="">We're Safe</NavLink></li>
                            <li className="link-foot"><NavLink to="">Track Order</NavLink></li>
                            <li className="link-foot"><NavLink to="">Contact Us</NavLink></li>
                            <li className="link-foot"><NavLink to="">Sitemap</NavLink></li>
                            <li className="link-foot"><NavLink to="">About Us</NavLink></li>
                        </ul>
                    </div>


                    <div className="category-bowl">
                        <h1 className="useful-head">CATEGORIES</h1>
                        <ul>
                            <li className="link-foot"><NavLink to="">Baby</NavLink></li>
                            <li className="link-foot"><NavLink to="">Beauty</NavLink></li>
                            <li className="link-foot"><NavLink to="">Hair</NavLink></li>
                            <li className="link-foot"><NavLink to="">Face</NavLink></li>
                            <li className="link-foot"><NavLink to="">Body</NavLink></li>
                            <li className="link-foot"><NavLink to="">Gift Pack</NavLink></li>
                        </ul>
                    </div>


                    <div className="account-bowl">
                        <h1 className="useful-head">MY ACCOUNT</h1>
                        <ul>
                            <li className="link-foot"><NavLink to="">Acount</NavLink></li>
                            <li className="link-foot"><NavLink to="">Order</NavLink></li>
                            <li className="link-foot"><NavLink to="">Addresses</NavLink></li>

                        </ul>
                    </div>
                    <div className="bb">
                        <img src="https://images.mamaearth.in/wysiwyg/Best-Brand500x5002x.png
                            " alt="#"/>
                    </div>

                </div>

                <div className="social-help">
                    <h3 className="social-head">SHOW US SOME <span className="heart"><i class="fa-solid fa-heart"></i></span> ON
                        SOCIAL MEDIA</h3>
                </div>
                <div className="social-img">
                    <i className="fa-brands fa-facebook-f"></i>
                    {/* <FontAwesomeIcon icon={["fa-brands", "fa-facebook-f"]} /> */}
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-square-instagram"></i>
                    <i className="fa-brands fa-youtube"></i>
                    <i className="fa-brands fa-pinterest-p"></i>
                    <i className="fa-regular fa-envelope"></i>
                </div>

                <div className="end">
                    <h3 className="last-line">
                        <span className="c">ⓒ</span> 2025 Satyasubham@The Skillians . All Rights Reserved
                    </h3>
                </div>

            </div>

        </div>
     </footer>
    </>
  )
}
