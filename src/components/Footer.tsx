import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "1rem",
        marginTop: "2rem",
        backgroundColor: "#f2f2f2",
      }}
      className="footer"
    >
      <p>© {new Date().getFullYear()} Admin Panel</p>
    </footer>
  );
};

export default Footer;
