import { RxGithubLogo } from "react-icons/rx";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-4 flex justify-between items-center gap-2 text-sm text-slate-500 font-medium">
      <p>© {currentYear} Vinay Kumar. All rights reserved.</p>
      <a
        href="https://github.com/n4ryn/ai-speech"
        target="_blank"
        className="text-xl p-2 bg-white hover:text-blue-500 rounded-full shadow-2xl shadow-blue-400/60"
      >
        <RxGithubLogo />
      </a>
    </div>
  );
};

export default Footer;
