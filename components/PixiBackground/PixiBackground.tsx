import React, { ComponentType, useEffect } from 'react';
import styles from "./PixiBackground.module.scss";
import { Application, Sprite } from 'pixi.js';
import { BloomFilter, GodrayFilter } from 'pixi-filters';

const PixiBackground: ComponentType<{}> = () => {
  useEffect(() => {
    const appWidth = window.innerWidth / 2
    const appHeight = window.innerHeight / 2

    const app = new Application({
      height: appHeight,
      width: appWidth,
    });
    document.getElementById(styles.pixiBackground).appendChild(app.view);

    const isMobile = appWidth <= 425;

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
    sun.width = appWidth + (appHeight / 10);
    sun.height = appHeight + (appHeight / 10);
    sun.anchor.x = 0.5;
    sun.anchor.y = 0.5;

    if (isMobile) {
      sun.width = appWidth + (appHeight * 0.15)

      sunRays.center = [app.view.width, app.view.height / 10]
    }

    app.stage.addChild(spaceBackground);
    app.stage.addChild(sun);

    app.ticker.add(() => {
      sunRays.time += 0.05;
    })
  }, []);

  return (
    <div id={styles.container}>
      <svg viewBox='0 0 1920 1080' id={styles.grain}>
        <filter id='noiseFilter'>
          <feTurbulence
            type='fractalNoise'
            baseFrequency='0.65'
            numOctaves='3'
            stitchTiles='stitch'
          />
        </filter>

        <rect width='100%' height='100%' filter='url(#noiseFilter)'></rect>
      </svg>

      <section id={styles.pixiBackground}></section>
    </div>
  )
}

export default PixiBackground