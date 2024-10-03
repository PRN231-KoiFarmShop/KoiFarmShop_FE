import React from "react";
import Hero from "../Hero/Hero";
import Kois from "../Kois/Koi";
import PackageKoi from "../PackageKoi/PackageKoi";
import Banner from "../Banner/Banner";
import Feedbacks from "../Feedback/Feedback";

const Home = () => {
    return (
        <div>
            <Hero />
            <Kois />
            <PackageKoi />
            <Banner />
            <Feedbacks />
        </div>
    );
};

export default Home;
