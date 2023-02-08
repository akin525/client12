import React from "react";

export default function FooterSmall(props) {
  const we={
    position:"fixed",
    width:"60px",
    height:"60px",
    bottom:"40px",
    right:"40px",
    backgroundColor:"#25d366",
    color:"#FFF",
    borderRadius:"50px",
    textAlign:"center",
    fontSize:"30px",
    boxShadow: "2px 2px 3px #999",
    zIndex:"100",
  }

  const fl={
    marginTop:"16px",
  }
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute w-full bottom-0 bg-blueGray-800"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-blueGray-600" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4">
              <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="#"
                  className="text-white hover:text-blueGray-300 text-sm font-semibold py-1"
                >
                  Savebills
                </a>
              </div>
            </div>
            <div className="w-full md:w-8/12 px-4">
              <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-white hover:text-blueGray-300 text-sm font-semibold block py-1 px-3"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <a href="https://wa.me/2349076015317" style={we} target="_blank">
          <i className="text-white fas fa-phone" style={fl}></i>
        </a>
      </footer>
    </>
  );
}
