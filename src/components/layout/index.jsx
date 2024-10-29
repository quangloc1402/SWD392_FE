import Headers from "../header";
import MyFooter from "../footer";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <div>
      <Headers />
      <div
        className="main-content"
        style={{
          paddingTop: "150px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>
      <MyFooter />
    </div>
  );
}
export default Layout;
