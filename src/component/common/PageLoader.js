/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import styled from "styled-components";
// import Theme from "../theme/Theme";

const PageLoader = ({ type, component }) => {
  const [loadingText, setLoadingText] = useState(false);
  const loaderWidth = type === "btnLoader" ? 55 : 65;
  const loaderHeight = type === "btnLoader" ? 20 : 65;
  const loaderColor = type === "btnLoader" ? "white" : "#3c8dbc";

  useEffect(() => {
    setTimeout(() => {
      setLoadingText(true);
    }, 5000);
  }, []);

  const wrapperStyle = {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // transform: "translate(-50%, -50%)",
    // marginTop: type === "btnLoader" ? "" : "200px",
    // padding: type === "btnLoader" ? "1rem" : "",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
  };
  if (type === "btnLoader") {
    return (
      <Bars
        height={loaderHeight}
        width={loaderWidth}
        color={loaderColor}
        ariaLabel="bars-loading"
        wrapperStyle={wrapperStyle}
        visible
      />
    );
  }
  return (
    // <>
    <PageLoaderWrapper
      className={
        component === "voterDetails"
          ? "voterDetails-loader"
          : component === "modalLoader"
          ? "modalPageLoader"
          : ""
      }
    >
      <Bars
        height={loaderHeight}
        width={loaderWidth}
        color={loaderColor}
        ariaLabel="bars-loading"
        wrapperStyle={wrapperStyle}
        visible
      />
      {loadingText && (
        <div className="text-center">
          Hang tight, we are working on your request
        </div>
      )}
    </PageLoaderWrapper>
    // </>
  );
};

const PageLoaderWrapper = styled.div`
  position: fixed;
  z-index: 999;
  height: 55px;
  width: 300px;
  overflow: visible;
  margin: auto;
  inset: 170px 0px 0px 250px;

  &.voterDetails-loader {
    position: unset;
    display: flex;
    justify-content: space-evenly;
    height: 100vh;
    align-items: center;
  }
  &.modalPageLoader {
    position: unset;
    display: flex;
    justify-content: space-evenly;
    height: 100px;
    align-items: center;
  }
`;

export default PageLoader;
