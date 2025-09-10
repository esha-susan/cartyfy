import React from "react";
//outlet is a placeholder for nested routes
//useNavigate allows to programmatically change the url
//useLocation is the hook to get the current URL
import { Outlet, useNavigate, useLocation } from "react-router-dom";
//props are the inputs passed to the component from its Parent(App.tsx)
interface LayoutProps {
  activeTab: 'optimizer' | 'history';
  onTabChange: (tab: 'optimizer' | 'history') => void;
}
//Functional component
const Layout: React.FC<LayoutProps> = ({ activeTab, onTabChange }) => {
  //useNavigate help us to go to  / or /history programmatically
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabClick = (tab: 'optimizer' | 'history') => {
    onTabChange(tab);
    if (tab === 'optimizer') navigate("/"); // index route
    else navigate("/history");
  };

  return (
    <div>
      <header>
        <button
          onClick={() => handleTabClick('optimizer')}
          style={{ fontWeight: activeTab === 'optimizer' ? 'bold' : 'normal' }}
        >
          Optimizer
        </button>
        <button
          onClick={() => handleTabClick('history')}
          style={{ fontWeight: activeTab === 'history' ? 'bold' : 'normal' }}
        >
          History
        </button>
      </header>

      <main>
        <Outlet /> {/* nested routes render here */}
      </main>
    </div>
  );
};

export default Layout;
