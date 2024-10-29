import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Parallax } from "react-scroll-parallax";
import { css } from "styled-components";

export const Community = ({ handleScrollToTop }) => {
  const { isDesktop } = useSelector((state) => state.endpoint);

  return (
    <div>
      <style>
        {css`
          .container-main {
            background-color: transparent;
            // padding: 10px;
            /* margin-top: 5px; */
            overflow: hidden;
          }

          .container {
            display: flex;
            flex-direction: column;
            padding: 20px;
            background-color: rgb(255, 255, 255, 0.85);
            border-radius: 25px;
            max-width: 100%;
            height: auto;
            margin: 95px auto;
            align-items: center;
            justify-content: center;
            opacity: 2;
            z-index: 5;
            //  overflow:hidden;
          }

          .circle-1 {
            border: 60px solid #5c8e55;
            border-radius: 50%;
            width: 800px;
            height: 800px;
            position: absolute;
            bottom: 10%;
            left: -15%;
            top: 30%;
            z-index: -1;
          }
          .circle-2 {
            border: 50px solid #5c8e55;
            border-radius: 50%;
            width: 600px;
            height: 600px;
            position: absolute;
            bottom: 10%;
            right: -6%;
            top: 55%;
            z-index: -2;
          }

          .container-items {
            width: 100%;
            padding: 20px;
          }

          .top-button {
            width: 40px;
            height: 40px;
            background-color: #5c8e55;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 1rem;
            border-radius: 50%;
            color: white;
            position: absolute;
            bottom: 17%;
            font-size: 16px;
          }

          .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-bottom: 40px;
            width: 100%;
          }

          .left-section {
            text-align: center;
          }

          .title {
            font-size: 24px;
            font-weight: bold;
            color: #00004d;
            margin-bottom: 16px;
            font-family: "Degular";
          }

          .description {
            font-size: 16px;
            color: #4e4e87;
            margin-bottom: 24px;
            font-family: "Sophia";
          }

          .form {
            position: relative;
            width: 100%;
            max-width: 300px;
          }

          .input {
            flex: 1;
            padding: 12px 0;
            border: none;
            border-bottom: 2px solid #00004d;
            font-size: 16px;
            outline: none;
            width: 100%;
            z-index: 5;
            position: relative;
            background-color: transparent;
          }

          .input:focus {
            border-bottom-color: #000;
          }

          .buttons {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background-color: rgb(254, 209, 65);
            border: none;
            border-radius: 50%;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 0;
            opacity: 0.8;
          }

          .nav {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 40px;
          }

          .logo {
            color: #4caf50;
            font-size: 24px;
            font-weight: bold;
            width: 120px;
            height: auto;
            margin-bottom: 20px;
            transition: 0.5s all;
            cursor: pointer;
          }
          .logo:hover {
            transform: scale(1.1);
          }

          .menu {
            display: flex;
            gap: 16px;
            // background-color: #00004d;
            padding: 10px;
            border-radius: 25px;
            cursor: pointer;
          }
          .icons:hover {
            transform: scale(1.1);
            background-color: #185c1b;
          }

          .icons {
            width: 35px;
            height: 35px;
            background-color: #5c8e55;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.1s all;
          }

          /* Media Queries */
          @media (min-width: 480px) {
            .container-main {
              padding: 40px;
              overflow: hidden;
            }

            .container {
              padding: 30px;
              border-radius: 35px;
            }
            //     .circle-1 {
            //   border:30px solid #5c8e55;
            //   border-radius: 50%;
            //   width: 800px;
            //   height: 800px;
            //   position:absolute;
            //   bottom:10%;
            //   left:-15%;
            //   top:40%;
            //   z-index: -1;

            // }
            // .circle-2 {
            //   border:30px solid #5c8e55;
            //   border-radius: 50%;
            //   width: 600px;
            //   height: 600px;
            //   position:absolute;
            //   bottom:10%;
            //   right:-6%;
            //   top:55%;
            //   z-index: -2;

            // }

            .form {
              max-width: 350px;
            }

            .buttons {
              width: 60px;
              height: 60px;
            }
          }

          @media (min-width: 768px) {
            .container-main {
              /* padding: 60px; */
            }

            .container {
              padding: 40px;
              border-radius: 40px;
            }

            .content {
              flex-direction: row;
              justify-content: space-between;
            }

            .left-section {
              text-align: left;
              width: 60%;
            }

            .title {
              font-size: 28px;
            }

            .description {
              font-size: 18px;
              width: 68%;
            }

            .form {
              max-width: 400px;
            }

            .nav {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              margin-top: 100px;
            }

            .logo {
              margin-bottom: 0;
            }
            .menu {
              gap: 10px;
            }
          }

          @media (min-width: 1024px) {
            .container-main {
              padding: 80px;
            }

            .container {
              padding: 80px;
              border-radius: 50px;
            }

            .title {
              font-size: 45px;
            }

            .description {
              font-size: 24px;
            }

            .form {
              max-width: 640px;
            }

            .buttons {
              width: 95px;
              height: 95px;
            }

            .logo {
              width: 250px;
            }

            .icons {
              width: 45px;
              height: 45px;
            }
            .gap {
              gap: 10px;
            }
          }

          @media (max-width: 468px) {
            .container-main {
              padding: 0 10px;
              overflow: hidden;
            }
            .container {
              margin: 7% 4%;
            }
            .container-items {
              width: 100%;
              padding: 20px;
            }
            .circle-1 {
              border: 20px solid #5c8e55;
              border-radius: 50%;
              width: 300px;
              height: 300px;
              position: absolute;
              // bottom:10%;
              left: -40%;
              top: 50%;
              z-index: -1;
            }
            .circle-2 {
              border: 20px solid #5c8e55;
              border-radius: 50%;
              width: 300px;
              height: 300px;
              position: absolute;
              right: -45%;
              top: 70%;
              z-index: -2;
            }
            .buttons {
              right: -2%;
              top: 70%;
              width: 60px;
              height: 60px;
              font-size: 12px;
              font-weight: 500;
              padding: 0.5rem;
              z-index: 0;
              opacity: 1;
            }
            .nav {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              gap: 8%;
              margin: 20% 0 0 0;
            }

            .left-section {
              text-align: left;
            }

            .input {
              flex: 1;
              padding: 12px 0;
              border: none;
              border-bottom: 1px solid #00004d;
              font-size: 12px;
              outline: none;
              width: 100%;
              z-index: 5;
              position: relative;
              background-color: transparent;
              margin: 3% 0 0 0;
            }

            .input:focus {
              border-bottom-color: #000;
            }

            .title {
              font-size: 2.5rem;
              font-weight: bold;
              color: #00004d;
              font-family: "Degular";
            }

            .description {
              font-size: 11px;
              color: #4e4e87;
              margin-bottom: 24px;
              font-family: "Sophia";
              width: 85%;
            }

            .logo {
              margin-bottom: 0;
              width: 110px;
            }
            .icons {
              width: 25px;
              height: 25px;
            }

            .top-button {
              width: 30px;
              height: 30px;
              background-color: #5c8e55;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              border-radius: 50%;
              color: white;
              position: absolute;
              bottom: 3%;
              font-size: 16px;
            }
            .menu {
              gap: 10px;
            }
          }
        `}
      </style>
      <Parallax speed={isDesktop ? 20 : 0} className="container-main">
        <div className="container" id="contact">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="top-button" onClick={handleScrollToTop}>
            <FaArrowUp />
          </div>
          <div className="container-items">
            <div className="content">
              <div className="left-section">
                <h1 className="title">Join our community</h1>
                <p className="description">
                  Get access to new recipes, exciting updates, and grab Rs.50
                  off on a pack of peanuts
                </p>
                <div className="form">
                  <button className="buttons">Sign up</button>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="input"
                  />
                </div>
              </div>
            </div>

            <nav className="nav">
              <img src="./Image/Logo.svg" alt="nutslogs" className="logo" />
              <div className="menu">
                <div className="icons">
                  <FaFacebookF />
                </div>
                <div className="icons">
                  <FaInstagram />
                </div>
                <div className="icons">
                  <FaWhatsapp />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </Parallax>
    </div>
  );
};
