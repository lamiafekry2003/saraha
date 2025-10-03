const Footer = () => {
  return (
    <footer className="bg-indigo-700 font-bold p-4 text-center text-white">
      <div className="container">
        Made By{" "}
        <a
          href="https://ahmed-profile.vercel.app"
          className="underline"
          target="_blank"
          rel="nofollow"
        >
          Ahmed Tarek
        </a>{" "}
        &{" "}
        <a
          href="https://www.linkedin.com/in/lamia-fekry"
          className="underline"
          target="_blank"
          rel="nofollow"
        >
          Lamia Fekry
        </a>
      </div>
    </footer>
  );
};
export default Footer;
