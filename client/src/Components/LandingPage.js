// src/components/LandingPage.js
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LandingPage.css";
import image from './glowcart-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import QuizStart from "./QuizStart";
import { useContext } from 'react';
import { useAuth } from '../AuthContext';
// import './src/App.css'

function LandingPage() {

    const scrollRef = useRef(null);

    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const testimonials = [
        {
            text: "Amazing. Smells like potpourri all day. The scent lingers keeping the mood up. The face cleanser is ultra gentle and smells like ayurveda with flowers.",
            author: "Deudutta N.",
        },
        {
            text: "The smell is relaxing and comforting. IT WASHES OFF thank goodness unlike nearly everything else available. Cheers!",
            author: "Ashwasti",
        },
        {
            text: "Thank you for listening to your customers and making this eco-friendly move!",
            author: "Dang",
        },
        // Add more testimonials as needed
    ];

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const { isLoggedIn, logout } = useAuth(); // Accessing AuthContext state and methods
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();  // Log the user out (updates context)
        navigate('/');  // Redirect after logout (optional)
    };


    return (
        <div className="LandingPage">

            <header className="navbar">
                <div className="offer-banner">
                    Spend ₹1500 to get a FREE Travel Size Face Cleanser
                </div>

                <nav>

                    <div className="logo-container">
                        <button className="hamburger-icon" onClick={toggleMenu}>
                            &#9776; {/* Hamburger icon */}
                        </button>
                        <ul className={`left-nav ${menuOpen ? "open" : ""}`}>
                            <li><Link to="/All">Shop All</Link></li>
                            <li><Link to="/quiz">Personalised Products</Link></li>
                            <li>More</li>
                            <li>
                                {isLoggedIn ? (
                                    <button onClick={handleLogout}>Logout</button>  // Show Logout if user is logged in
                                ) : (
                                    <Link to="/login">Login</Link>  // Show Login if user is logged out
                                )}
                            </li>
                            <li><Link to="/cart">Cart</Link></li>
                        </ul>
                    </div>

                </nav>

            </header>
            <main>
                <div className="left-section">
                    <img
                        src="https://img.freepik.com/premium-photo/beauty-care-products_935138-974.jpg"
                        alt="Body Care"
                        className="product-image"
                    />
                </div>
                <div className="right-section">
                    <h1 className="title">GLOWKART</h1>
                    {/* <h2 className="subtitle">{`{ BODY CARE }`}</h2> */}
                    <p className="description">
                        Your daily body cleanser & lotion that will deliver exceptional
                        hydration and barrier support. The formulas are 95% naturally
                        derived and will leave you feeling like everyday is spa-day.
                    </p>
                    <button className="shop-now"><Link to='/All'>Shop Now</Link></button>
                </div>
            </main>
            <section className="section1">
                <div className="left-content">
                    <h1 className="skincare-title">It's All About You</h1>
                    <p className="skincare-description">
                        You know your skin. We know what works. Which is why we collaborate with you on remedies that suit just you. From stress, and pollution, to poor lifestyle choices, there’s plenty that gets in the way of good skin. We synthesise some of the most important factors affecting you to provide well-researched tried and tested formulations that combine the best of nature and science. We’re here to be your allies in personalised skincare.
                    </p>
                </div>
            </section>

            <section className="shop-by-concern-section">
                <div className="shop-by-concern-container">
                    <h2 className="section-title">SHOP BY CONCERN</h2>
                    <div className="shop-by-concern-wrapper">
                        <button className="scroll-button left" onClick={scrollLeft}>
                            &#10094;
                        </button>
                        <div className="concern-cards" ref={scrollRef}>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2022/08/ybp-oily-acne-prone-skin.jpg" alt="Acne & Blemishes" />
                                <p>ACNE & BLEMISHES</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2022/08/ybp-dry-mature-skin.jpg" alt="Dry & Dehydrated" />
                                <p>DRY & DEHYDRATED</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2022/08/ybp-sensitive-damaged-skin.jpg" alt="Sensitive & Redness" />
                                <p>SENSITIVE & REDNESS</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2023/10/ybp-mature-skin-1.jpg" alt="Mature Skin" />
                                <p>MATURE SKIN</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2022/08/ybp-hyperpigmentation-uneven.jpg" alt="Oily Skin" />
                                <p>HYPER PIGMENTATION</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2023/10/ybp-cleansers-1.jpg" alt="Dullness" />
                                <p>COMBINATION SKIN</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2023/10/ybp-serums-1.jpg" alt="Uneven Tone" />
                                <p>TEXTURED</p>
                            </div>
                            <div className="concern-card">
                                <img src="https://ybpskin.com/wp-content/uploads/2023/10/ybp-moisturizer-1.jpg" alt="Large Pores" />
                                <p>OILY SKIN</p>
                            </div>
                        </div>
                        <button className="scroll-button right" onClick={scrollRight}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </section>


            <section>
                <div className="customisation-container">
                    <h1>How Our Customisation Works</h1>
                    <div className="customisation-steps">
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-online-questionnaire-icon_180x.png?v=1646906029" alt="Online Questionnaire" />
                            <h2>Online Questionnaire</h2>
                            <p>
                                Extraordinary skincare starts with you. Which is why we like to get to
                                know you and your skin through a series of simple questions.
                            </p>
                        </div>
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-skin-analysis-icon_180x.png?v=1646906086" alt="Skin Analysis" />
                            <h2>Skin Analysis</h2>
                            <p>
                                We study your unique profile, lifestyle choices, personal preferences, and exposure
                                to environmental stressors to find you your perfect formulations.
                            </p>
                        </div>
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-customised-remedy-icon_180x.png?v=1646906257" alt="Customised Remedy" />
                            <h2>Customised Remedy</h2>
                            <p>
                                We pair you with a formula and custom routine that your skin actually needs.
                                Our formulations are bottled fresh to order with clean ingredients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="skincare-section">
                <div className="left-content">
                    <h1 className="skincare-title">Customize Your Skincare</h1>
                    <p className="skincare-description">
                        No two people are exactly alike, which is why our approach to
                        skincare is deeply personal. We co-create your remedy with you based
                        on an analysis of your unique skin profile, lifestyle, and
                        environmental factors. Simply answer our questionnaire and get set
                        for your custom remedy.
                    </p>
                    <button className="view-results"><Link to='/quiz'>Let's Get Started</Link></button>
                </div>
            </section>

            <section>
                <div className="customisation-container">
                    <h1>Good for you.
                        Good for the planet.</h1>
                    <div className="customisation-steps">
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-bottle-to-order_180x.png?v=1646908213" alt="Online Questionnaire" />
                            <h2>WE THINK SMALL</h2>
                            <p>
                                Our products are not mass-produced or factory-made. We only produce and bottle to order. This keeps us from wasting precious resources and ingredients.
                            </p>
                        </div>
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-biodegradable_180x.png?v=1646908256" alt="Skin Analysis" />
                            <h2>WE ARE NOT TRASHY</h2>
                            <p>
                                Our bottles, cartons and shipping materials are planet friendly. While our bottles are made from glass and can be reused and repurposed, our cartons and shipping sleeves are 100% biodegradable.
                            </p>
                        </div>
                        <div className="step">
                            <img src="https://www.suhiandsego.com/cdn/shop/files/suhi-_-sego-clean-ingredients_180x.png?v=1646908293" alt="Customised Remedy" />
                            <h2>WE ARE CLEAN</h2>
                            <p>
                                Our ingredients are sustainably and ethically sourced. In our commitment to clean beauty, we say no to the use of parabens, sulphates, and phthalates in our products.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="testimonials-container">
                    <h2>Testimonials</h2>
                    <p className="subheading">Real Words, Real Customers</p>
                    <Slider {...settings}>
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="testimonial-card">
                                <div className="testimonial-content">
                                    <div className="stars">★★★★★</div>
                                    <p>{testimonial.text}</p>
                                    <h4>{testimonial.author}</h4>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

            </section>

            <footer className="footer-container">
                <div className="footer-content">
                    <div className="footer-left">
                        <img src={image} alt="Suhi & Sego" className="footer-logo" />
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="footer-middle">
                        <ul className="footer-links">
                            <li><a href="#">Our Story</a></li>
                            <li><a href="#">Our Products</a></li>
                            <li><a href="#">Get Your Remedy</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-right">
                        <ul className="footer-links">
                            <li><a href="#">FAQs</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Return & Refund Policy</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="footer-subscribe">
                        <p>GlowKart's Club</p>
                        <div className="subscribe-form">
                            <input type="email" placeholder="Enter email" />
                            <button>Join</button>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>Urban Natives Pvt. Ltd. , New Delhi - 110035.</p>
                </div>
            </footer>

        </div>
    );
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#000" }}
            onClick={onClick}
        />
    );
};

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#000" }}
            onClick={onClick}
        />
    );
};

export default LandingPage;
