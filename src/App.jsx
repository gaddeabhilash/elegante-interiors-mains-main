import { useMemo, useState } from "react";
import "./App.css";
import brandLogo from "./assets/11-removebg-preview.png";

function App() {
  const [projectType, setProjectType] = useState("Residential");
  const [bhkType, setBhkType] = useState("1BHK");
  const [selectedServices, setSelectedServices] = useState([]);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const serviceOptions = useMemo(() => {
    return {
      Residential: [
        { label: "Living Room", icon: "🛋" },
        { label: "Bedroom", icon: "🛏" },
        { label: "Wardrobe", icon: "👗" },
        { label: "Pooja Room", icon: "🛕" },
        { label: "Study Room", icon: "📚" },
        { label: "Kids Room", icon: "🧸" },
        { label: "Guest Room", icon: "🛎" },
        { label: "Wall Painting", icon: "🎨" },
        { label: "Full Home Interior", icon: "🏠" },
      ],
      "Office Space": [
        { label: "Reception", icon: "🏢" },
        { label: "Workstations", icon: "💻" },
        { label: "Cabin Area", icon: "🪑" },
        { label: "Conference Room", icon: "📊" },
        { label: "Pantry", icon: "☕" },
        { label: "Full Office Interior", icon: "🏬" },
      ],
      "Cafes & Restaurants": [
        { label: "Indoor Dining", icon: "🍽" },
        { label: "Outdoor Seating", icon: "🌿" },
        { label: "Counter Area", icon: "🧾" },
        { label: "Kitchen Layout", icon: "👨‍🍳" },
        { label: "Full Cafe Interior", icon: "☕" },
        { label: "Full Restaurant Interior", icon: "🍴" },
      ],
      "Commercials": [
        { label: "Residential Layout", icon: "📐" },
        { label: "Office Layout", icon: "📊" },
        { label: "Furniture Planning", icon: "🪑" },
        { label: "Circulation Planning", icon: "🔄" },
        { label: "Space Optimization", icon: "⚡" },
      ],
    };
  }, []);

  const currentServiceOptions = serviceOptions[projectType] || [];

  const handleProjectTypeChange = (e) => {
    const value = e.target.value;
    setProjectType(value);
    setSelectedServices([]);
  };

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((item) => item !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !phoneNumber) {
      alert("Please enter your name and phone number.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const backendUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          phone: phoneNumber,
          projectType,
          bhkType: projectType === "Residential" ? bhkType : null,
          selectedServices,
          details: projectDetails,
        }),
      });

      if (response.ok) {
        alert("Thank you! Your request has been sent successfully.");
        setFullName("");
        setPhoneNumber("");
        setProjectDetails("");
        setSelectedServices([]);
        setProjectType("Residential");
        setBhkType("1BHK");
      } else {
        alert("Failed to send request. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };



  const serviceCards = [
    {
      title: "Residency",
      description:
        "Elegant interiors for homes designed with comfort, function, and style.",
    },
    {
      title: "Office Space",
      description:
        "Modern workspace interiors that balance productivity, identity, and comfort.",
    },
    {
      title: "Cafes & Restaurants",
      description:
        "Inviting commercial interiors crafted to create memorable customer experiences.",
    },
    {
      title: "Space Planning",
      description:
        "Smart layout solutions that improve flow, maximize space, and enhance usability.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Orniva Design Studio transformed our 3BHK in Jubilee Hills beyond imagination. The pooja room and kids room are stunning. On-time delivery!",
      name: "Ramesh & Priya Reddy",
      location: "Jubilee Hills, Hyderabad",
      initial: "R",
      colorClass: "gold-avatar",
    },
    {
      quote:
        "Got our 2BHK done in Gachibowli. The modular wardrobes and living room are exactly what we envisioned. 3D visualization was a game-changer!",
      name: "Arjun Sharma",
      location: "Gachibowli, Hyderabad",
      initial: "A",
      colorClass: "blue-avatar",
    },
    {
      quote:
        "The wall painting and texture work in our 4BHK villa is breathtaking. Every room tells a unique story. Highly recommended!",
      name: "Sunita & Venkat Kumar",
      location: "Banjara Hills, Hyderabad",
      initial: "S",
      colorClass: "green-avatar",
    },
  ];

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container nav-row">
          <div className="brand-block" aria-label="Orniva Design Studio">
            <img className="brand-logo" src={brandLogo} alt="Orniva Design Studio" />
            <div>
              <h1 className="brand-title">
                Orniva <span>Design Studio</span>
              </h1>
            </div>
          </div>

          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#process">Process</a>
            <a href="#reviews">Reviews</a>
            <a href="#contact">Contact</a>
          </nav>

          <a className="nav-cta" href="#contact">
            Get Free Consultation
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="container hero-content">
            <p className="section-label">PREMIUM INTERIOR DESIGN STUDIO</p>
            <h2 className="hero-title">
              Design spaces that feel elegant, practical, and truly yours.
            </h2>
            <p className="hero-description">
              We create premium interior solutions in Hyderabad for residences,
              office spaces, cafes, restaurants, and thoughtful space planning.
            </p>

            <div className="hero-buttons">
              <a href="#contact" className="primary-btn">
                Book Free Consultation
              </a>
              <a href="#services" className="secondary-btn">
                Explore Spaces
              </a>
            </div>
          </div>
        </section>

        <section id="services" className="services-section">
          <div className="container">
            <p className="section-label">OUR SERVICES</p>
            <h3 className="section-title">Designed for Every Kind of Space</h3>

            <div className="services-grid">
              {serviceCards.map((card) => (
                <div className="service-card" key={card.title}>
                  <div className="service-card-body">
                    <h4>{card.title}</h4>
                    <p>{card.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="process-section">
          <div className="container">
            <p className="section-label">OUR PROCESS</p>
            <h3 className="section-title">Simple, clear, and client-focused</h3>

            <div className="process-grid">
              <div className="process-card">
                <span>01</span>
                <h4>Consultation</h4>
                <p>We understand your needs, style, and functional goals.</p>
              </div>

              <div className="process-card">
                <span>02</span>
                <h4>Design Planning</h4>
                <p>Layouts, mood direction, materials, and design detailing.</p>
              </div>

              <div className="process-card">
                <span>03</span>
                <h4>Execution</h4>
                <p>Careful coordination, site work, and smooth implementation.</p>
              </div>

              <div className="process-card">
                <span>04</span>
                <h4>Handover</h4>
                <p>Final styling, finishing touches, and ready-to-use spaces.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="reviews" className="testimonials-section">
          <div className="container">
            <h3 className="testimonial-heading">
              What Our <span>Clients</span> Say
            </h3>

            <div className="testimonial-grid">
              {testimonials.map((item) => (
                <div className="testimonial-card" key={item.name}>
                  <div className="quote-mark">"</div>
                  <p className="testimonial-text">{item.quote}</p>

                  <div className="testimonial-footer">
                    <div className={`avatar-circle ${item.colorClass}`}>
                      {item.initial}
                    </div>

                    <div>
                      <h4>{item.name}</h4>
                      <p>{item.location}</p>
                      <div className="stars">★★★★★</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div className="contact-left">
              <p className="section-label">CONTACT US</p>
              <h3 className="section-title">
                Get a free quote for your interior project
              </h3>
              <p className="contact-copy">
                Share your requirements and our team will get in touch with
                design ideas and next steps.
              </p>

              <div className="contact-info-list">
                <div className="contact-info-box">
                  📍 Hyderabad, Telangana, India
                </div>
                <div className="contact-info-box">📞 +91 9398801834</div>
                <div className="contact-info-box">
                  ✉ ornivedesignstudio@gmail.com
                </div>
                <div className="contact-info-box">
                  🕒 Mon – Sat | 9:00 AM – 7:00 PM
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Project Type</label>
                  <select value={projectType} onChange={handleProjectTypeChange}>
                    <option>Residential</option>
                    <option>Office Space</option>
                    <option>Cafes & Restaurants</option>
                    <option>Commercials</option>
                  </select>
                </div>

                {projectType === "Residential" && (
                  <div className="form-group">
                    <label>BHK Type</label>
                    <select
                      value={bhkType}
                      onChange={(e) => setBhkType(e.target.value)}
                    >
                      <option>1BHK</option>
                      <option>2BHK</option>
                      <option>3BHK</option>
                      <option>4BHK</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  {projectType === "Residential"
                    ? "Room / Services"
                    : "Services Needed"}
                </label>

                <div className="multi-select-box">
                  {currentServiceOptions.map((service) => (
                    <button
                      type="button"
                      key={service.label}
                      className={
                        selectedServices.includes(service.label)
                          ? "service-chip active-chip"
                          : "service-chip"
                      }
                      onClick={() => toggleService(service.label)}
                    >
                      <span className="chip-icon">{service.icon}</span>
                      {service.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Project Details</label>
                <textarea
                  rows="6"
                  placeholder="Tell us about your space and requirements"
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="primary-btn form-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Request Free Quote"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <a
        className="whatsapp-float"
        href="https://wa.me/919398801834?text=Hi%20I’m%20interested%20in%20your%20interior%20services"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp Us
      </a>
    </div>
  );
}

export default App;
