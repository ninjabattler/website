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
        <img src="/home/Ninjabattler_Forward.png" />
      </main>
    </>
  );
}
