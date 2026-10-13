import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowDownRight, ArrowRight, CalendarDays, Check, ChevronDown, Clock3, Heart, MapPin, Menu, Phone, ShieldCheck, Sparkles, Smile, Stethoscope, X } from 'lucide-react';
import { closeAppointment, openAppointment, submitAppointment } from './features/appointment/appointmentSlice';
import clinicCounter from '../photo/clinic counter.jpeg';
import dentalMachine from '../photo/machine.jpeg';
import dentistWithPatient from '../photo/doctore with women.webp';
import dentistPatient from '../photo/with patient.jpeg';

const PHONE = '+919960416690';
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Pro+Dental+Care+Pimple+Saudagar+Pune';
const photos = {
  hero: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=85',
  doctor: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85',
  care: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=85',
  smile: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=85',
  room: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85',
};
const clinicPhotos = [
  { src: clinicCounter, alt: 'Reception counter at Pro Dental Care', label: 'A warm welcome' },
  { src: dentalMachine, alt: 'Dental equipment at Pro Dental Care', label: 'Our care space' },
  { src: dentistWithPatient, alt: 'Dentist caring for a patient at Pro Dental Care', label: 'The people behind your care' },
  { src: dentistPatient, alt: 'Dentist with a patient at Pro Dental Care', label: 'Here for your smile' },
];
const services = [
  { number: '01', title: 'Root canal care', desc: 'Thoughtful treatment focused on relieving discomfort and preserving your natural tooth.', icon: Stethoscope },
  { number: '02', title: 'Restorative dentistry', desc: 'Care for damaged or missing teeth, with function and everyday comfort in mind.', icon: ShieldCheck },
  { number: '03', title: 'Smile design', desc: 'A personal conversation about your smile, your goals and suitable treatment options.', icon: Sparkles },
  { number: '04', title: 'Family dental care', desc: 'Oral health support for different ages and stages of life, all in one welcoming place.', icon: Heart },
];

function AppointmentModal() {
  const dispatch = useDispatch();
  const { isOpen, submitted } = useSelector(s => s.appointment);
  if (!isOpen) return null;
  const sendToWhatsApp = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get('name');
    const phone = form.get('phone');
    const service = form.get('service');
    const date = form.get('date') || 'Flexible';
    const message = `Hello Pro Dental Care, I would like to enquire about an appointment.\nName: ${name}\nPhone: ${phone}\nInterested in: ${service}\nPreferred date: ${date}`;
    dispatch(submitAppointment());
    window.open(`https://wa.me/${PHONE.replace('+','')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  return <div className="modal-backdrop" role="presentation" onMouseDown={e => e.target === e.currentTarget && dispatch(closeAppointment())}>
    <section className="appointment-modal" role="dialog" aria-modal="true" aria-labelledby="appointment-title">
      <button className="icon-button modal-close" aria-label="Close appointment form" onClick={() => dispatch(closeAppointment())}><X size={20}/></button>
      {submitted ? <div className="success-state"><span className="success-icon"><Check/></span><p className="eyebrow">NEXT STEP</p><h2 id="appointment-title">Your message is ready.</h2><p>WhatsApp should open with your appointment enquiry. Send it to the clinic to confirm details.</p><button className="button button-dark" onClick={() => dispatch(closeAppointment())}>Done <ArrowRight size={17}/></button></div> : <>
        <p className="eyebrow">LET'S START WITH A HELLO</p><h2 id="appointment-title">Request an appointment</h2><p className="modal-intro">Share a few details and we’ll prepare a WhatsApp enquiry for the clinic.</p>
        <form className="appointment-form" onSubmit={sendToWhatsApp}>
          <label>Your name<input name="name" placeholder="e.g. Aditi Sharma" required /></label>
          <label>Phone number<input name="phone" type="tel" placeholder="Your contact number" required /></label>
          <label>What would you like help with?<select name="service" defaultValue="General consultation"><option>General consultation</option><option>Tooth pain / root canal</option><option>Smile design</option><option>Cleaning and prevention</option><option>Other / not sure yet</option></select></label>
          <label>Preferred date <span className="optional">(optional)</span><input name="date" type="date" min={new Date().toISOString().split('T')[0]} /></label>
          <button className="button button-dark full-button" type="submit">Continue to WhatsApp <ArrowRight size={17}/></button>
          <p className="form-note">This demo does not book appointments automatically. The clinic must confirm availability.</p>
        </form>
      </>}
    </section>
  </div>;
}

function App() {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [unavailableClinicPhotos, setUnavailableClinicPhotos] = useState(() => new Set());
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <div className="announcement"><span className="announcement-dot"/> A little more care in every smile <span className="announcement-sep">·</span> Pimple Saudagar, Pune</div>
    <header className="site-header">
      <a href="#home" className="brand" onClick={closeMenu} aria-label="Pro Dental Care home"><span className="brand-mark"><Smile size={25} strokeWidth={1.8}/></span><span className="brand-copy"><strong>pro dental care<span>.</span></strong><small>PERSONAL CARE. CONFIDENT SMILES.</small></span></a>
      <button className="mobile-menu icon-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation"><a href="#approach" onClick={closeMenu}>Our approach</a><a href="#care" onClick={closeMenu}>Treatments</a><a href="#gallery" onClick={closeMenu}>Gallery</a><a href="#dentists" onClick={closeMenu}>Meet your dentists</a><a href="#visit" onClick={closeMenu}>Find us</a><button className="button button-dark nav-cta" onClick={() => { closeMenu(); dispatch(openAppointment()); }}>Let's talk <ArrowRight size={16}/></button></nav>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> YOUR NEIGHBOURHOOD DENTAL TEAM</div>
          <h1>Good dental care<br/>starts with <em>feeling</em><br/><em>looked after.</em></h1>
          <p className="hero-text">Your questions matter. Your comfort matters. And your smile deserves care that feels personal, from the very first hello.</p>
          <div className="hero-actions"><button className="button button-dark" onClick={() => dispatch(openAppointment())}>Plan a visit <ArrowRight size={17}/></button><a className="text-link" href="#approach">Get to know us <ArrowDownRight size={17}/></a></div>
          <div className="hero-note"><span className="note-icon"><Heart size={17}/></span><span><strong>Care, without the rush.</strong><small>Let's talk through what you need.</small></span></div>
        </div>
        <div className="hero-visual" style={{'--parallax': `${Math.min(scrollY * 0.12, 70)}px`}}>
          <div className="hero-photo-wrap"><img className="hero-photo" src={photos.hero} alt="Welcoming dental care environment" fetchPriority="high"/><div className="photo-overlay"/></div>
          <div className="hero-sticker"><span className="sticker-spark">✳</span><span>Thoughtful care<br/><strong>for every smile</strong></span></div>
          <div className="hero-caption"><span className="caption-line"/> A calmer kind of dental visit</div>
          <div className="floating-shape shape-one"/><div className="floating-shape shape-two"/>
        </div>
        <a className="scroll-cue" href="#approach"><span/> SCROLL TO EXPLORE</a>
      </section>

      <section className="local-strip"><div className="local-strip-inner"><span className="local-icon"><MapPin size={19}/></span><p><strong>Right here in Pimple Saudagar.</strong> Dental care for you, your family, and your everyday life.</p><a href={MAP_URL} target="_blank" rel="noreferrer">Find the clinic <ArrowRight size={15}/></a></div></section>

      <section className="approach section-pad" id="approach">
        <div className="section-heading"><p className="eyebrow"><span className="eyebrow-line"/> A DIFFERENT KIND OF DENTAL EXPERIENCE</p><h2>You bring the questions.<br/><em>We'll bring the care.</em></h2></div>
        <div className="approach-grid"><div className="approach-photo parallax-card"><img src={photos.care} alt="Dental professional preparing a comfortable care space" loading="lazy" style={{transform: `translateY(${Math.min(scrollY * 0.035, 24)}px)`}}/><span className="image-label">A little more human. Always.</span></div><div className="approach-content"><p className="lead">A visit to the dentist should feel like a conversation, not a checklist.</p><p>We believe good care begins by listening. That means understanding what brought you in, explaining your options clearly, and helping you feel comfortable asking anything along the way.</p><div className="values-list"><div><span className="value-icon"><Heart size={18}/></span><span><strong>People before procedures</strong><small>Your concerns and comfort come first.</small></span></div><div><span className="value-icon"><Sparkles size={18}/></span><span><strong>Clear, considered guidance</strong><small>Understand your options before deciding.</small></span></div><div><span className="value-icon"><ShieldCheck size={18}/></span><span><strong>Care with a personal touch</strong><small>A plan that starts with your needs.</small></span></div></div><button className="button button-outline" onClick={() => dispatch(openAppointment())}>Talk to our team <ArrowRight size={16}/></button></div></div>
      </section>

      <section className="gallery-section section-pad" id="gallery">
        <div className="section-heading">
          <p className="eyebrow"><span className="eyebrow-line"/> A LOOK INSIDE</p>
          <h2>A little closer to<br/><em>your neighbourhood clinic.</em></h2>
          <p className="gallery-intro">Real moments and spaces from Pro Dental Care.</p>
        </div>
        <div className="gallery-grid">
          {clinicPhotos.map((photo) => (
            <figure className="gallery-card" key={photo.src}>
              {unavailableClinicPhotos.has(photo.src)
                ? <div className="gallery-placeholder"><span>Clinic photo</span><small>Image unavailable: {photo.alt}</small></div>
                : <img src={photo.src} alt={photo.alt} loading="lazy" onError={() => setUnavailableClinicPhotos(current => new Set(current).add(photo.src))}/>}
              <figcaption>{photo.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="care-section section-pad" id="care"><div className="care-top"><div><p className="eyebrow"><span className="eyebrow-line"/> HOW WE CAN HELP</p><h2>Care for your smile,<br/><em>at every stage.</em></h2></div><p className="care-intro">Every smile has its own story. Here are some of the ways our team can help you look after yours.</p></div><div className="services-grid">{services.map(({number,title,desc,icon:Icon})=><article className="service-card" key={number}><div className="service-card-top"><span className="service-number">{number}</span><span className="service-icon"><Icon size={21} strokeWidth={1.7}/></span></div><h3>{title}</h3><p>{desc}</p><button className="service-link" onClick={() => dispatch(openAppointment())}>Ask us about this <ArrowRight size={16}/></button></article>)}</div><p className="care-disclaimer">Treatment suitability is determined by a dentist after an individual assessment.</p></section>

      <section className="dentists-section" id="dentists"><div className="dentists-photo" style={{'--parallax': `${Math.min(scrollY * 0.055, 34)}px`}}><img src={photos.doctor} alt="Dental professional in a clinical setting" loading="lazy"/><div className="dentist-photo-note"><span>✳</span> Expertise with empathy</div></div><div className="dentists-copy"><p className="eyebrow"><span className="eyebrow-line"/> THE PEOPLE BEHIND YOUR CARE</p><h2>Skilled hands.<br/><em>Listening ears.</em></h2><p className="lead">Meet the team that believes dentistry should feel personal.</p><p>At Pro Dental Care, Dr. Dnyaneshwar Patil and Dr. Reshma Patil bring specialist training in conservative dentistry and endodontics to a practice built around helping people feel heard and cared for.</p><div className="doctor-profiles"><div className="doctor-profile"><span className="doctor-initials">DP</span><span><strong>Dr. Dnyaneshwar Patil</strong><small>MDS · Conservative Dentistry & Endodontics</small></span></div><div className="doctor-profile"><span className="doctor-initials">RP</span><span><strong>Dr. Reshma Patil</strong><small>MDS · Conservative Dentistry & Endodontics</small></span></div></div><button className="button button-dark" onClick={() => dispatch(openAppointment())}>Get in touch <ArrowRight size={17}/></button></div></section>

      <section className="comfort-banner"><div className="comfort-image" style={{'--parallax': `${Math.min(scrollY * 0.045, 28)}px`}}><img src={photos.smile} alt="A warm, natural smile" loading="lazy"/></div><div className="comfort-copy"><span className="comfort-spark">✳</span><p className="eyebrow">NO QUESTION IS TOO SMALL</p><h2>Let's make your<br/>next visit feel <em>easier.</em></h2><p>Whether you know exactly what you need or aren't sure where to start, we're happy to talk it through.</p><button className="button button-light" onClick={() => dispatch(openAppointment())}>Start a conversation <ArrowRight size={17}/></button></div></section>

      <section className="visit-section section-pad" id="visit"><div className="visit-copy"><p className="eyebrow"><span className="eyebrow-line"/> COME SAY HELLO</p><h2>Close by.<br/><em>Here for you.</em></h2><p>Find us in Pimple Saudagar, Pune. If you're planning your first visit, feel free to call with any questions before you come in.</p><div className="visit-detail"><span><MapPin size={19}/></span><div><strong>Pro Dental Care</strong><p>204, Vantage Commercial, BRT Road,<br/>near P.K. Chowk, above Max Showroom,<br/>Pimple Saudagar, Pune 411027</p></div></div><div className="visit-detail"><span><Phone size={19}/></span><div><strong>Give us a call</strong><a href={`tel:${PHONE}`}>+91 99604 16690</a></div></div><div className="visit-detail"><span><Clock3 size={19}/></span><div><strong>Planning your visit?</strong><p>Please call to confirm current clinic timings.</p></div></div><div className="visit-actions"><a className="button button-dark" href={MAP_URL} target="_blank" rel="noreferrer">Get directions <ArrowRight size={17}/></a><a className="text-link" href={`tel:${PHONE}`}>Call the clinic <Phone size={15}/></a></div></div><a className="map-card" href={MAP_URL} target="_blank" rel="noreferrer" aria-label="Open Pro Dental Care in Google Maps"><img src={photos.room} alt="Bright, modern dental clinic interior" loading="lazy"/><div className="map-card-overlay"><span className="map-pin"><MapPin size={22}/></span><div><strong>Pro Dental Care</strong><small>Pimple Saudagar · Pune</small></div><span className="map-arrow"><ArrowRight size={19}/></span></div><span className="map-decoration">YOUR NEIGHBOURHOOD DENTAL TEAM</span></a></section>

      <section className="final-cta"><div className="final-ornament">✳</div><p className="eyebrow">YOUR SMILE, YOUR PACE</p><h2>Whenever you're ready,<br/><em>we're here.</em></h2><button className="button button-dark" onClick={() => dispatch(openAppointment())}>Let's talk about your visit <ArrowRight size={17}/></button></section>
    </main>

    <footer className="footer"><a href="#home" className="brand footer-brand"><span className="brand-mark"><Smile size={24}/></span><span className="brand-copy"><strong>pro dental care<span>.</span></strong><small>PERSONAL CARE. CONFIDENT SMILES.</small></span></a><p>Thoughtful dental care, close to home.</p><div className="footer-bottom"><span>© {new Date().getFullYear()} Pro Dental Care · Website concept</span><a href={MAP_URL} target="_blank" rel="noreferrer">Pimple Saudagar, Pune <ArrowRight size={14}/></a></div></footer>
    <AppointmentModal/>
  </>;
}
export default App;
