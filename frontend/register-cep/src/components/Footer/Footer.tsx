import iconGithub from "@/assets/icons/icon-github.png";
import iconLinkedin from "@/assets/icons/icon-linkedin.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__info">
          <span className="footer__copy">&copy; 2026 André Lima</span>

          <span className="divider"> | </span>
          <a
            className="footer__company"
            href="https://www.solutionsa.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solution
          </a>
        </div>

        <ul className="footer__social">
          <li>
            <a
              className="footer__social-link"
              href="https://github.com/andreluislima/register-cep-app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <img
                src={iconGithub}
                alt="Ícone do GitHub"
                className="footer__icon"
              />
            </a>
          </li>

          <li>
            <a
              className="footer__social-link"
              href="https://www.linkedin.com/in/andreluislimasilva/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <img
                src={iconLinkedin}
                alt="Ícone do LinkedIn"
                className="footer__icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}