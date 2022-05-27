import NavBar from "./NavBar";

const SiteLayout = ({ children }) => (
  <div>
    <NavBar />
    <div className="max-w-2xl mx-auto">{children}</div>
  </div>
);

export default SiteLayout;
