import React, { FC, useEffect, useRef } from "react";
import styles from "./PostsPageBackground.module.scss";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  CubeTextureLoader,
  SRGBColorSpace,
} from "three";

/**
 * The three js space background for the Posts page
 * @author Ninjabattler
 */
const PostsPageBackground: FC<{}> = () => {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      const renderer = new WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      backgroundRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      // Set up the space skybox
      const loader = new CubeTextureLoader();
      loader.setPath("/threeJs/posts/");

      const spaceTexture = loader.load([
        "spaceFront.png",
        "spaceBack.png",
        "spaceLeft.png",
        "spaceRight.png",
        "spaceTop.png",
        "spaceBottom.png",
      ]);

      //Ninjabattler
      const map = new TextureLoader().load("/threeJs/posts/testNinja.png");
      const material = new SpriteMaterial({ map: map });
      const ninjabattler = new Sprite(material);

      ninjabattler.colorSpace = SRGBColorSpace;
      ninjabattler.position.x = 2;
      ninjabattler.scale.x = 3;
      ninjabattler.scale.y = 1.77777 * 3;

      scene.add(ninjabattler);

      scene.background = spaceTexture;

      const renderScene = () => {
        camera.rotation.y += 0.001;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      renderScene();
    }
  }, []);

  return <div ref={backgroundRef} className={styles.postsPageBackground} />;
};

export default PostsPageBackground;
