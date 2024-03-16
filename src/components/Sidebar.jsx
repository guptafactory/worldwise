import { Outlet } from "react-router-dom";
import Logo from "./Logo";
import AppNav from "./AppNav";
import CopyrightFooter from "./CopyrightFooter";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* to render child route elements in Sidebar of App Layout (for nested UI routes)*/}
      <Outlet />
      <CopyrightFooter />
    </div>
  );
}

export default Sidebar;
