import "./LandingPage.css";

// Assets import (same images, same UI)
import heroImg from "../../assets/photo-1551434678-e076c223a692.jpg";
import analyticsImg from "../../assets/photo-1551288049-bebda4e38f71.jpg";

import whatsappIcon from "../../assets/WhatsApp.svg";
import instaIcon from "../../assets/Instagram_logo_2016.svg";
import messengerIcon from "../../assets/messenger-icon.svg";

import image1 from "../../assets/image1.png";
import image2 from "../../assets/image2.png";
import image3 from "../../assets/image3.png";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


console.log(window.document);


const LandingPage = () => {

  // implement reference functinality

  const navigate = useNavigate()

  const ContactRef = useRef(null);
  const solutionRef = useRef(null);
  const resourcesRef = useRef(null);
  const homeref = useRef(null);


  const [activeNav, setActiveNav] = useState("");
  const [loading, setLoading] = useState(false);

  const scrollToSection = (ref, name) => {
    setActiveNav(name);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScroll) {
      console.log("Scrolling DOWN");
    } else {
      console.log("Scrolling UP");
    }

    lastScroll = currentScroll;
  }, { passive: true });





  useEffect(() => {
    const onScroll = () => {

      const scroll = window.scrollY;
      const h = window.innerHeight;

      // 1. Reel Switcher (same logic)
      const stickySec = document.getElementById("sticky-trigger");
      if (stickySec) {
        const stickyTop = stickySec.offsetTop;
        const step = Math.floor((scroll - stickyTop) / 600);

        if (step >= 0 && step <= 2) {
          for (let i = 1; i <= 3; i++) {
            const p = document.getElementById("p" + i);
            const f = document.getElementById("f" + i);
            if (p) p.classList.toggle("active", i === step + 1);
            if (f) f.classList.toggle("active", i === step + 1);
          }
        }
      }

      // 2. VIDEO STYLE: RIGHT-TO-LEFT KINETIC ZOOM
      const zoomContainer = document.getElementById("zoom-container");
      const zoomBox = document.getElementById("zoom-box");
      const zoomText = document.getElementById("z-text");
      const analyticsSec = document.getElementById("analytics-details");

      if (zoomContainer && zoomBox && zoomText && analyticsSec) {
        const containerTop = zoomContainer.offsetTop;
        const containerHeight = zoomContainer.offsetHeight;

        let scrollPercent = (scroll - containerTop) / (containerHeight - h);
        scrollPercent = Math.max(0, Math.min(1, scrollPercent));

        const scale = 1 + scrollPercent * 0.4;
        zoomBox.style.transform = `scale(${scale})`;
        zoomBox.style.width = `${70 + scrollPercent * 30}%`;
        zoomBox.style.height = `${60 + scrollPercent * 40}vh`;
        zoomBox.style.borderRadius = `${40 - scrollPercent * 40}px`;

        const xMove = 100 - scrollPercent * 250;
        zoomText.style.transform = `translateX(${xMove}%) scale(${0.8 + scrollPercent})`;
        zoomText.style.opacity = scrollPercent > 0.1 ? "1" : "0";

        if (scrollPercent > 0.7) {
          analyticsSec.style.visibility = "visible";
          const entryProgress = (scrollPercent - 0.7) / 0.3;
          const slideX = 100 - entryProgress * 100;
          analyticsSec.style.transform = `translateX(${slideX}%)`;
          analyticsSec.style.opacity = "1";
        } else {
          analyticsSec.style.transform = "translateX(100%)";
          analyticsSec.style.opacity = "0";
          analyticsSec.style.visibility = "hidden";
        }

        if (scrollPercent >= 1) {
          const exitOffset = scroll - (containerTop + containerHeight - h);
          analyticsSec.style.transform = `translateY(${-exitOffset}px)`;
          analyticsSec.style.left = "0";
        } else if (scrollPercent > 0.7) {
          analyticsSec.style.top = "0";
        }
      }
    };
    // 3. Shaking Cards (Observer logic)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cardsTrigger = document.getElementById("cards-trigger");
          if (!cardsTrigger) return;

          if (entry.isIntersecting) {
            cardsTrigger.classList.add("active");
            setTimeout(() => {
              const c1 = document.getElementById("card1");
              const c2 = document.getElementById("card2");
              if (c1) c1.classList.add("hit-shake");
              if (c2) c2.classList.add("hit-shake");
            }, 700);
          } else {
            cardsTrigger.classList.remove("active");
            const c1 = document.getElementById("card1");
            const c2 = document.getElementById("card2");
            if (c1) c1.classList.remove("hit-shake");
            if (c2) c2.classList.remove("hit-shake");
          }
        });
      },
      { threshold: 0.4 }
    );

    const shakeSection = document.querySelector(".shake-sec");
    if (shakeSection) observer.observe(shakeSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const handeNavigate = () => {
    setLoading(true)
    setTimeout(async () => {

      const token = await localStorage.getItem("token")
      console.log("clcike");

      if (!token) {
        navigate("/login", { replace: true })
      }
      else {
        navigate("/owner/dashboard", { replace: true })
      }
      setLoading(false)
    }, 1000)
  }



  return (
    <>
      <nav className="navbar">
        <div className={` logo ${activeNav === "Smart-bizz" ? "active" : ""}`}
          onClick={() => scrollToSection(homeref, "Smart-bizz")}
        //  className=""
        >
          SmartBiz</div>
        <div className="nav-links">


          <button
            className={`nav-btn ${activeNav === "resources" ? "active" : ""}`}
            onClick={() => scrollToSection(resourcesRef, "resources")}
          >
            Resources
          </button>

          <button
            className={`nav-btn ${activeNav === "solution" ? "active" : ""}`}
            onClick={() => scrollToSection(solutionRef, "solution")}
          >
            solution's
          </button>

          <button className={` nav-btn ${activeNav === "Contact" ? "active" : ""}`}
            onClick={() => scrollToSection(ContactRef, "Contact")}
          >
            Contact
          </button>

        </div>

        <button onClick={handeNavigate} className="btn-purple">{loading ? <div className="loader-mini"></div> : "Start Free Trial"}</button>
      </nav>

      {/* <section className="hero"> */}
      <section className="hero" ref={homeref} >
        <div className="hero-text">
          <h1>Scale Your Social Commerce with AI</h1>
          <p>
            Connect WhatsApp, Instagram, and Facebook into one unified dashboard.
            Use AI to automate customer replies and close sales faster.
          </p>
          <button
            onClick={handeNavigate}
            className="btn-purple2" style={{ padding: "20px 45px", fontSize: "18px" }}>
            {loading ? <div className="loader-mini"></div> : "Start Your Free Trial"}
          </button>
        </div>

        <div className="hero-visual">
          <div className="hero-img-wrapper">
            <img src={heroImg} className="hero-img" alt="SmartBiz" />

            <div className="notif notif-1">
              <img src={whatsappIcon} alt="WA" />
              <div>
                <p style={{ fontSize: "10px", color: "#666" }}>WHATSAPP BUSINESS</p>
                <p>Is this product in stock? 🛍️</p>
              </div>
            </div>

            <div className="notif notif-2">
              <img src={instaIcon} alt="IG" />
              <div>
                <p style={{ fontSize: "10px", color: "#666" }}>INSTAGRAM DM</p>
                <p>Sent! Check your inbox ✨</p>
              </div>
            </div>

            <div className="notif notif-3">
              <img src={messengerIcon} alt="FB" />
              <div>
                <p style={{ fontSize: "10px", color: "#666" }}>FACEBOOK MESSENGER</p>
                <p>I want to buy this! 🚀</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky-container" id="sticky-trigger" ref={resourcesRef} >
        <div className="sticky-wrapper">
          <div className="feature-grid">
            <div className="phone-frame">
              <img src={image1} className="phone-screen active" id="p1" alt="p1" />
              <img src={image2} className="phone-screen" id="p2" alt="p2" />
              <img src={image3} className="phone-screen" id="p3" alt="p3" />
            </div>

            <div style={{ position: "relative", height: "400px" }}>
              <div className="feature-item active" id="f1">
                <h2 style={{ color: "var(--purple)" }}>Unified Inbox</h2>
                <p>
                  Sync WhatsApp, Instagram, and Facebook into one interface
                  Manage all customer conversations from a single dashboard.
                  View WhatsApp, Instagram, and Facebook messages in one inbox.
                  Reply faster with complete customer context in one place.
                  Track new, active, and resolved chats easily.
                  Assign conversations to your team for better collaboration.
                  Never miss a customer message or sales opportunity again.
                </p>
              </div>

              <div className="feature-item" id="f2">
                <h2 style={{ color: "#F51997" }}>AI Smart-Reply</h2>
                <p>
                  Automatically draft friendly and accurate replies based on customer intent
                  Let AI handle common customer questions instantly.
                  Get ready-to-send replies for product, price, and availability queries.
                  Respond faster without typing every message manually.
                  Maintain a consistent and professional tone in every reply.
                  Reduce response time and improve customer experience.
                  Save hours every day while focusing on closing more sales.
                </p>
              </div>

              <div className="feature-item" id="f3">
                <h2 style={{ color: "var(--green)" }}>Live Inventory</h2>
                <p>
                  AI checks your CSV or Google Sheets in real time before replying
                  Keep your product availability always accurate and up to date.
                  AI automatically checks your inventory before sending any customer reply.
                  Connect your CSV file or Google Sheets without complex setup.
                  Ensure customers receive correct stock information every time.
                  Avoid selling products that are out of stock.
                  Reduce manual inventory checks during busy hours.
                  Respond confidently to product and quantity questions.
                  Keep solution and availability aligned across all conversations.
                  Handle multiple customer queries without confusion.
                  Prevent order errors caused by outdated data.
                  Save time by letting AI manage stock verification.
                  Improve customer trust with accurate and reliable responses.
                  Focus more on sales while inventory stays in sync automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="shake-sec"> */}
      <section className="shake-sec" ref={solutionRef}>


        <h2>Stop Operating Blindly</h2>

        <div className="cards-container" id="cards-trigger">
          <div className="card card-grey" id="card1" style={{ "--final-rot": "-3deg" }}>
            <p style={{ fontWeight: 900, color: "#888", fontSize: "12px", marginBottom: "10px" }}>
              THE PROBLEM
            </p>
            <h3>Manual Inventory Checks</h3>
            <p>
              Business owners waste valuable time manually checking product availability.
              Customer messages arrive, but replies are delayed due to inventory checks.
              Switching between multiple apps creates confusion and slows response time.
              Late or incorrect replies lead to lost sales opportunities.
              Out-of-stock products are often sold by mistake.
              Teams struggle to stay aligned across conversations and platforms.
              The result is frustrated customers and poor visibility into daily operations.
            </p>
          </div>

          <div className="card card-green" id="card2" style={{ "--final-rot": "3deg" }}>
            <p style={{ fontWeight: 900, color: "#fff", fontSize: "12px", marginBottom: "10px" }}>
              THE Solution
            </p>
            <h3>One Dashboard Control</h3>
            <p>
              SmartBiz connects conversations and inventory in one powerful dashboard.
              AI checks live stock data before drafting any customer reply.
              All WhatsApp, Instagram, and Facebook messages are handled in one place.
              Teams respond faster with complete and accurate information.
              Only verified product availability is shared with customers.
              Response times improve and conversions increase.
              You gain full visibility and control over your business operations.
            </p>
          </div>
        </div>
      </section>

      <div className="zoom-reveal-container" id="zoom-container">
        <div className="zoom-sticky">
          <div className="zoom-bg" id="zoom-box">
            <img src={analyticsImg} alt="Analytics" />
          </div>
          <h2 className="zoom-text" id="z-text">
            DATA-DRIVEN GROWTH
          </h2>
        </div>
      </div>

      {/* <section className="after-zoom-content" id="analytics-details"> */}
      <section className="after-zoom-content" id="analytics-details">
        <div>
          <h2 style={{ fontSize: "50px", fontWeight: 900 }}>Growth Insights</h2>
          <p style={{ fontSize: "20px", color: "#666", marginTop: "20px" }}>
            SmartBiz analyzes your growth instantly.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ background: "#f4f4f4", padding: "30px", borderRadius: "20px" }}>
            <h3 style={{ color: "var(--purple)" }}>98%</h3>
            <p>Conversion Rate</p>
          </div>

          <div style={{ background: "#f4f4f4", padding: "30px", borderRadius: "20px" }}>
            <h3 style={{ color: "var(--green)" }}>Top 10</h3>
            <p>Trending Products</p>
          </div>
        </div>
      </section>

      <footer className="animated-footer" ref={ContactRef} >
        <div className="footer-container">
          <div className="footer-row">
            <div className="footer-col brand">
              <div className="footer-logo">SmartBiz</div>
              <p>Scaling social commerce with AI intelligence. Automate, Analyze, and Grow.</p>

              <div className="social-links">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Platform</h4>
              <ul>
                <li><a href="#">Unified Inbox</a></li>
                <li><a href="#">AI Smart-Reply</a></li>
                <li><a href="#">Live Inventory</a></li>
                <li><a href="#">solution</a></li>
              </ul>
            </div>

            <div className="footer-col newsletter">
              <h4>Stay Ahead</h4>
              <p>Subscribe to get AI e-commerce tips.</p>
              <form className="footer-form">
                <input type="email" placeholder="Your Email" required />
                <button type="submit">
                  Go <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 SmartBiz AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;