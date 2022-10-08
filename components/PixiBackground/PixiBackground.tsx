import React, { ComponentType, useEffect } from 'react';
import styles from "./PixiBackground.module.scss";
import { Application, Sprite } from 'pixi.js';
import { BloomFilter, GodrayFilter } from 'pixi-filters';

const PixiBackground: ComponentType<{}> = () => {
  useEffect(() => {
    const app = new Application({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    document.getElementById(styles.pixiBackground).appendChild(app.view);

    const isMobile = window.innerWidth <= 425;

    const spaceBackground = Sprite.from(isMobile ? 'homespacemobile.png' : 'homespace.png');
    const spaceGlow = new BloomFilter(40);
    spaceBackground.filters = [spaceGlow];
    spaceBackground.x = app.view.width / 2;
    spaceBackground.y = app.view.height / 2;
    spaceBackground.anchor.x = 0.5;
    spaceBackground.anchor.y = 0.5;

    const sun = Sprite.from(isMobile ? 'homesunmobile.png' : 'homesun.png');
    const sunRays = new GodrayFilter({
      alpha: 0.4,
      parallel: false,
      center: [app.view.width, 0],
      gain: 0.35,
      lacunarity: 3.5,
    });
    sun.filters = [spaceGlow, sunRays]
    sun.x = app.view.width / 2;
    sun.y = app.view.height / 2;
    sun.width = window.innerWidth + (window.innerHeight / 10);
    sun.height = window.innerHeight + (window.innerHeight / 10);
    sun.anchor.x = 0.5;
    sun.anchor.y = 0.5;

    if (isMobile) {
      sun.width = window.innerWidth + (window.innerHeight * 0.15)

      sunRays.center = [app.view.width, app.view.height / 10]
    }

    app.stage.addChild(spaceBackground);
    app.stage.addChild(sun);

    app.ticker.add(() => {
      sunRays.time += 0.05;
    })
  }, []);

  return <section id={styles.pixiBackground}></section>
}

export default PixiBackground