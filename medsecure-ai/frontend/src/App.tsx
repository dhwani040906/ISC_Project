
import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Fingerprint,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Stethoscope,
  UserRound,
  UsersRound,
  HeartPulse,
} from "lucide-react";
import "./index.css";

type Screen = "home" | "login" | "signup" | "forgot" | "dashboard";
type Role = "Doctor" | "Patient" | "Admin";

const features = [
  {
    icon: BrainCircuit,
    title: "AI-assisted analysis",
    text: "Explore medical image analysis through an educational AI prototype.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    text: "Built around secure access and protection of sensitive information.",
  },
  {
    icon: Fingerprint,
    title: "Controlled access",
    text: "Designed for role-based access to healthcare workflows.",
  },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a className={`brand ${light ? "brand-light" : ""}`} href="#" onClick={(e) => e.preventDefault()}>
      <span className="brand-mark"><ShieldCheck size={24} strokeWidth={2.2} /></span>
      <span className="brand-copy">
        <strong>MedSecure <span>AI</span></strong>
        <small>Smarter healthcare. Safer tomorrow.</small>
      </span>
    </a>
  );
}

function Home({ navigate }: { navigate: (screen: Screen) => void }) {
  return (
    <main className="home-page">
      <header className="topbar">
        <Brand />
        <nav className="top-nav">
          <a href="#platform">Platform</a>
          <a href="#security">Security</a>
          <a href="#about">About</a>
        </nav>
        <div className="top-actions">
          <button className="button button-quiet" onClick={() => navigate("login")}>Log in</button>
          <button className="button button-primary" onClick={() => navigate("signup")}>
            Get started <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-wash" />
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> HEALTHCARE, BUILT WITH TRUST</div>
          <h1>Intelligent care.<br /><span>Protected by design.</span></h1>
          <p className="hero-description">
            A healthcare research platform bringing AI-assisted medical image
            analysis together with thoughtful data protection and secure access.
          </p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => navigate("signup")}>
              Explore the platform <ArrowRight size={17} />
            </button>
            <button className="button button-outline button-large" onClick={() => navigate("login")}>
              Sign in
            </button>
          </div>
          <div className="trust-row">
            <span><ShieldCheck size={18} /> Privacy-conscious</span>
            <i />
            <span><Activity size={18} /> AI-assisted</span>
            <i />
            <span><LockKeyhole size={18} /> Access controlled</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Healthcare AI illustration">
          <div className="visual-glow" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="medical-art">
            <div className="art-topline"><span className="live-dot" /> IMAGING WORKSPACE <span>DEMO</span></div>
            <div className="lung-art">
              <svg viewBox="0 0 260 280" role="img" aria-label="Stylized lung illustration">
                <defs>
                  <linearGradient id="lungFill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#BDEDE9" />
                    <stop offset="100%" stopColor="#399C9C" />
                  </linearGradient>
                </defs>
                <path d="M126 27 L126 104 M136 27 L136 104 M130 69 L94 106 M132 79 L170 110" fill="none" stroke="#E9FFFC" strokeWidth="9" strokeLinecap="round" />
                <path d="M111 87 C88 69 66 91 53 125 C36 167 31 219 61 234 C81 244 107 220 115 185 C123 151 117 112 111 87Z" fill="url(#lungFill)" stroke="#E8FFFC" strokeWidth="3" />
                <path d="M151 87 C174 69 196 91 209 125 C226 167 231 219 201 234 C181 244 155 220 147 185 C139 151 145 112 151 87Z" fill="url(#lungFill)" stroke="#E8FFFC" strokeWidth="3" />
                <path d="M128 106 L94 144 L76 181 M131 116 L103 173 L92 205 M138 107 L169 143 L190 183 M136 125 L164 172 L177 207" fill="none" stroke="#E8FFFC" strokeWidth="4" strokeLinecap="round" opacity=".8" />
              </svg>
            </div>
            <div className="art-footer">
              <span className="art-footer-icon"><Activity size={19} /></span>
              <span><strong>AI analysis workspace</strong><small>Educational research preview</small></span>
              <span className="art-arrow"><ArrowRight size={17} /></span>
            </div>
          </div>
          <div className="floating-card floating-security">
            <span className="float-icon"><ShieldCheck size={19} /></span>
            <span><strong>Security first</strong><small>Designed for privacy</small></span>
            <Check size={16} className="float-check" />
          </div>
          <div className="floating-card floating-ai">
            <span className="float-icon float-icon-blue"><BrainCircuit size={20} /></span>
            <span><strong>AI-assisted</strong><small>Medical image research</small></span>
          </div>
          <div className="visual-caption"><span /> A more thoughtful approach to digital health</div>
        </div>
      </section>

      <section className="feature-section" id="platform">
        <div className="section-heading">
          <span className="eyebrow">ONE PLATFORM, THREE PRINCIPLES</span>
          <h2>Healthcare technology<br />with trust at its core.</h2>
        </div>
        <div className="feature-grid" id="security">
          {features.map(({ icon: Icon, title, text }) => (
            <article className="feature-card" key={title}>
              <span className="feature-icon"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="feature-link">Designed with purpose <ChevronRight size={15} /></span>
            </article>
          ))}
        </div>
      </section>

      <footer className="site-footer" id="about">
        <Brand />
        <p>Educational research prototype · Not for clinical diagnosis</p>
      </footer>
    </main>
  );
}

function Auth({ screen, navigate, onLogin }: {
  screen: "login" | "signup" | "forgot";
  navigate: (screen: Screen) => void;
  onLogin: (role: Role) => void;
}) {
  const [role, setRole] = useState<Role>("Doctor");
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isSignup = screen === "signup";
  const isForgot = screen === "forgot";

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setNotice("");

    if (isForgot) {
      setNotice("Password recovery will be available when backend authentication is connected.");
      return;
    }
    if (isSignup && password !== confirmPassword) {
      setNotice("Your passwords do not match. Please check them and try again.");
      return;
    }
    if (isSignup) {
      setNotice("Account creation is not connected yet. Your details have not been sent or saved.");
      return;
    }

    setNotice("Demo preview only — real authentication is not connected yet.");
    onLogin(role);
  }

  return (
    <main className="auth-page">
      <aside className="auth-aside">
        <div className="auth-aside-top"><Brand light /></div>
        <div className="aside-content">
          <div className="aside-symbol"><HeartPulse size={29} /></div>
          <span className="eyebrow eyebrow-light">CARE MEETS SECURITY</span>
          <h1>Better care starts with trust.</h1>
          <p>Thoughtfully designed tools for healthcare workflows, AI research, and secure information access.</p>
          <div className="aside-points">
            <span><Check size={16} /> Privacy-conscious by design</span>
            <span><Check size={16} /> AI-assisted research tools</span>
            <span><Check size={16} /> Role-aware experiences</span>
          </div>
        </div>
        <div className="aside-bottom">
          <div className="aside-quote-mark">“</div>
          <p>Technology should support care without compromising trust.</p>
          <small>THE MEDSECURE AI PRINCIPLE</small>
        </div>
        <div className="aside-decoration aside-decoration-one" />
        <div className="aside-decoration aside-decoration-two" />
      </aside>

      <section className="auth-main">
        <div className="auth-topline">
          <button className="back-home" onClick={() => navigate("home")}><ArrowLeft size={16} /> Back to home</button>
          <span className="secure-label"><LockKeyhole size={14} /> Secure access</span>
        </div>

        <div className={`auth-card ${isSignup ? "auth-card-signup" : ""}`}>
          {!isForgot && (
            <div className="auth-tabs" role="tablist" aria-label="Authentication">
              <button className={!isSignup ? "auth-tab active" : "auth-tab"} onClick={() => navigate("login")} role="tab" aria-selected={!isSignup}>Log in</button>
              <button className={isSignup ? "auth-tab active" : "auth-tab"} onClick={() => navigate("signup")} role="tab" aria-selected={isSignup}>Create account</button>
            </div>
          )}

          <div className="auth-heading">
            <span className="auth-mini-icon">{isForgot ? <Mail size={20} /> : isSignup ? <UserRound size={20} /> : <ShieldCheck size={20} />}</span>
            <h2>{isForgot ? "Reset your password" : isSignup ? "Create your account" : "Welcome back"}</h2>
            <p>{isForgot ? "Enter your email and we'll help you get back in." : isSignup ? "Start your secure MedSecure AI experience." : "Sign in to continue to your workspace."}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {isSignup && (
              <label className="field">
                <span>Full name</span>
                <div className="input-wrap"><UserRound size={17} /><input autoComplete="name" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Enter your full name" required /></div>
              </label>
            )}
            <label className="field">
              <span>Email address</span>
              <div className="input-wrap"><Mail size={17} /><input type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required /></div>
            </label>
            {!isForgot && (
              <label className="field">
                <span>Password</span>
                <div className="input-wrap"><LockKeyhole size={17} /><input type={showPassword ? "text" : "password"} autoComplete={isSignup ? "new-password" : "current-password"} value={password} onChange={e => setPassword(e.target.value)} placeholder={isSignup ? "Create a strong password" : "Enter your password"} minLength={8} required /><button className="input-action" type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>
              </label>
            )}
            {isSignup && (
              <>
                <label className="field">
                  <span>Confirm password</span>
                  <div className="input-wrap"><LockKeyhole size={17} /><input type="password" autoComplete="new-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" minLength={8} required /></div>
                </label>
                <fieldset className="role-field">
                  <legend>I'm joining as a</legend>
                  <div className="role-options">
                    {(["Doctor", "Patient", "Admin"] as Role[]).map((r) => {
                      const Icon = r === "Doctor" ? Stethoscope : r === "Patient" ? HeartPulse : UsersRound;
                      return <button type="button" key={r} className={`role-option ${role === r ? "selected" : ""}`} onClick={() => setRole(r)}><Icon size={18} /><span>{r}</span>{role === r && <Check size={13} className="role-check" />}</button>;
                    })}
                  </div>
                  <small>Role selection is a UI preview; permissions must be assigned and verified by the server.</small>
                </fieldset>
              </>
            )}

            {!isSignup && !isForgot && (
              <div className="form-options">
                <label className="remember-option"><input type="checkbox" /> <span>Remember me</span></label>
                <button type="button" className="text-link" onClick={() => navigate("forgot")}>Forgot password?</button>
              </div>
            )}

            <button className="button button-primary submit-button" type="submit">
              {isForgot ? "Request password reset" : isSignup ? "Create account" : "Sign in to workspace"} <ArrowRight size={17} />
            </button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>

          <div className="auth-divider"><span /> <small>YOUR DATA DESERVES CARE</small> <span /></div>
          <div className="auth-bottom">
            {isForgot ? <p>Remember your password? <button onClick={() => navigate("login")}>Log in</button></p> : isSignup ? <p>Already have an account? <button onClick={() => navigate("login")}>Log in</button></p> : <p>New to MedSecure AI? <button onClick={() => navigate("signup")}>Create an account</button></p>}
          </div>
        </div>
        <div className="auth-footnote"><ShieldCheck size={14} /> Educational research prototype <span>•</span> Not for clinical diagnosis</div>
      </section>
    </main>
  );
}

function Dashboard({ role, navigate }: { role: Role; navigate: (screen: Screen) => void }) {
  return (
    <main className="preview-dashboard">
      <header className="topbar"><Brand /><div className="top-actions"><span className="dashboard-role">{role} preview</span><button className="button button-outline" onClick={() => navigate("home")}>Log out</button></div></header>
      <section className="dashboard-content">
        <span className="eyebrow">MEDSECURE AI WORKSPACE</span>
        <h1>Welcome to your workspace.</h1>
        <p className="dashboard-description">This is a UI preview. Real accounts, permissions, and saved records will be connected to the backend in a later step.</p>
        <div className="dashboard-grid">
          <article className="feature-card"><span className="feature-icon"><BrainCircuit size={22} /></span><h3>AI image analysis</h3><p>Educational pneumonia image analysis will be connected to the existing prediction API.</p></article>
          <article className="feature-card"><span className="feature-icon"><ShieldCheck size={22} /></span><h3>Secure records</h3><p>Encrypted record storage and access controls are planned for the backend integration.</p></article>
          <article className="feature-card"><span className="feature-icon"><UsersRound size={22} /></span><h3>{role} workspace</h3><p>This is a role-based visual preview, not a security boundary.</p></article>
        </div>
        <button className="button button-primary" onClick={() => navigate("home")}>Return to welcome page <ArrowRight size={16} /></button>
      </section>
    </main>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [role, setRole] = useState<Role>("Doctor");

  function navigate(next: Screen) {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (screen === "home") return <Home navigate={navigate} />;
  if (screen === "dashboard") return <Dashboard role={role} navigate={navigate} />;
  if (screen === "login" || screen === "signup" || screen === "forgot") {
    return <Auth screen={screen} navigate={navigate} onLogin={(selectedRole) => { setRole(selectedRole); setScreen("dashboard"); }} />;
  }
  return <Home navigate={navigate} />;
}
