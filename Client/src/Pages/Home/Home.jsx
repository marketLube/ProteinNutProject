import { useQuery } from "@tanstack/react-query";
import { HomeLandingSection1 } from "../../Component/HomeLandingSection1";
import Landingimg from "../../Component/Modelimage/Landingimg";
import { GridDisplay } from "../../Component/ProductDisplayGrid/GridDisplay";
import { Reels } from "../../Component/Reelsection/Reels";
import Main from "../../Layout/Main";
import { Green } from "../Green/Green";
import HomeSectionOne from "./HomeSectionOne/HomeSectionOne";
import { Community } from "./HomeSectionTwo/Community";
import api from "../../services/api";
import { scrollToTarget } from "../../Helper/scrollToTarget";

function Home() {
  // api to fetch the products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => api.get("/products").then((res) => res.data.docs),
  });

  const handleScrollToTop = () => {
    console.log("inside the parent component");
    scrollToTarget("home")();
  };

  return (
    <Main>
      <div id="home">
        <HomeSectionOne />
      </div>
      <Green />
      <div style={{ overflow: "hidden" }}>
        <GridDisplay products={products} isLoading={isLoading} error={error} />
        <Landingimg />
      </div>
      <div style={{ backgroundColor: "rgb(254,209,65)" }}>
        <HomeLandingSection1 />
        <Reels />
        <Community handleScrollToTop={handleScrollToTop} />
      </div>
    </Main>
  );
}

export default Home;
