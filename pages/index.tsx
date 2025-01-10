import styles from "../styles/HomePage.module.scss";
import React, { FC } from "react";
import HomePageHead from "../components/PageMetadata/HomePageHead";
import HomePageBackground from "../components/backgrounds/HomePageBackground/HomePageBackground";

export default function Home({}: FC<{}> & AppData) {
  return (
    <>
      <HomePageHead />
      <HomePageBackground />

      <main id={styles.homePage}>
        {/* <img src="/home/websiteRobot4.png" />
        <h1>Ninjabattler</h1>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam ipsa ducimus ab vitae dolorem temporibus soluta, omnis, in non necessitatibus vel, debitis quas molestiae. Expedita consequuntur debitis ex hic aspernatur?
        </p> */}
      </main>
    </>
  );
}
