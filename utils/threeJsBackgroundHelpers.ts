import {
  Group,
  TextureLoader,
  Sprite,
  SpriteMaterial,
  Object3DEventMap,
  PlaneGeometry,
  SRGBColorSpace,
  MeshBasicMaterial,
  Mesh,
  ColorRepresentation,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Color,
  RepeatWrapping,
  Vector2,
} from "three";
import {
  BloomEffect,
  ScanlineEffect,
  EffectComposer,
  EffectPass,
  GodRaysEffect,
  KernelSize,
  RenderPass,
  BlendFunction,
  NoiseEffect,
  BlurPass,
  GaussianBlurPass,
  DepthOfFieldEffect,
} from "postprocessing";

/**
 * Creates and returns a sprite object with an SRGB colour space
 */
export const initSpaceBackground = (
  backgroundRef: React.RefObject<HTMLDivElement>,
): { scene: Scene; camera: PerspectiveCamera; renderer: WebGLRenderer } => {
  const scene = new Scene();
  scene.background = new Color(0x060909);

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.y = 0;
  camera.position.z = 5;

  const renderer = new WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  backgroundRef.current?.appendChild(renderer.domElement);

  return { scene, camera, renderer };
};

/**
 * Creates and returns an effect composer containing layers of post-processing effects
 */
export const createPostProcessing = (
  scene: Scene,
  camera: PerspectiveCamera,
  renderer: WebGLRenderer,
  sun: Sprite<Object3DEventMap>,
): EffectComposer => {
  // @ts-expect-error
  const sunRays = new GodRaysEffect(camera, sun, {
    height: 960,
    kernelSize: KernelSize.SMALL,
    density: 0.96,
    decay: 0.92,
    weight: 0.5,
    exposure: 0.25,
    samples: 120,
    clampMax: 1,
  });

  const bloom = new BloomEffect({
    intensity: 1,
    radius: 0.1,
  });

  // const noise = new NoiseEffect({
  //   blendFunction: BlendFunction.COLOR_DODGE,
  // });
  // noise.blendMode.opacity.value = 0.04;

  // const scanlines = new ScanlineEffect({
  //   blendFunction: BlendFunction.MULTIPLY,
  //   density: 1.0,
  // });
  // scanlines.blendMode.opacity.value = 0.1;
  // scanlines.scrollSpeed = 0.05;

  const depthOfField = new DepthOfFieldEffect(camera, {
    bokehScale: 2,
    worldFocusDistance: 1,
    worldFocusRange: 25,
  });

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(new EffectPass(camera, bloom));
  composer.addPass(new EffectPass(camera, sunRays));
  composer.addPass(new EffectPass(camera, depthOfField));
  // composer.addPass(new EffectPass(camera, noise));
  // composer.addPass(new EffectPass(camera, scanlines));

  return composer;
};

/**
 * Creates and returns an array of objects containing an asteroid sprite for three js and a rotation speed variable
 */
export const createAsteroidsObject = (
  colour?: ColorRepresentation,
): ThreeJSBackgroundAsteroids => {
  const asteroidMap = new TextureLoader().load(
    "/threeJs/general/asteroid.webp",
  );
  asteroidMap.colorSpace = SRGBColorSpace;
  const asteroid2Map = new TextureLoader().load(
    "/threeJs/general/asteroid2.webp",
  );
  asteroid2Map.colorSpace = SRGBColorSpace;
  const asteroid3Map = new TextureLoader().load(
    "/threeJs/general/asteroid3.webp",
  );
  asteroid3Map.colorSpace = SRGBColorSpace;
  const asteroid4Map = new TextureLoader().load(
    "/threeJs/general/asteroid4.webp",
  );
  asteroid4Map.colorSpace = SRGBColorSpace;

  const asteroidMaps = [asteroidMap, asteroid2Map, asteroid3Map, asteroid4Map];

  const asteroids: ThreeJSBackgroundAsteroids = [];

  for (let i = 0; i <= 500; i++) {
    const asteroidSize = 2 + Math.random() * 4;

    const asteroidMaterial = new SpriteMaterial({
      map: asteroidMaps[Math.floor(Math.random() * 0)],
      alphaHash: true,
      color: colour,
    });

    const asteroid = new Sprite(asteroidMaterial);
    const asteroidPositionOffset = Math.random() * 360;

    asteroid.position.x =
      Math.cos(asteroidPositionOffset) * 75 + Math.random() * 10;
    asteroid.position.y = -3 + Math.random() * 7;
    asteroid.position.z =
      Math.sin(asteroidPositionOffset) * 75 + Math.random() * 10;
    asteroid.scale.x = asteroidSize;
    asteroid.scale.y = asteroidSize;
    asteroidMaterial.rotation = Math.random();

    asteroids.push({
      rotationSpeed: -0.001 + Math.random() * 0.005,
      asteroid,
    });
  }

  return asteroids;
};

/**
 * Creates and returns a three js group object from an array of asteroid sprites
 */
export const createAsteroidsGroup = (
  asteroids: ThreeJSBackgroundAsteroids,
): Group<Object3DEventMap> => {
  const asteroidsGroup = new Group();

  asteroids.forEach(({ asteroid }) => {
    asteroidsGroup.add(asteroid);
  });

  return asteroidsGroup;
};

/**
 * Modify's an asteroid sprite's rotation using it's given rotationSpeed
 */
export const rotateAsteroids = (
  asteroids: ThreeJSBackgroundAsteroids,
): void => {
  asteroids.forEach((asteroidObject) => {
    asteroidObject.asteroid.material.rotation += asteroidObject.rotationSpeed;
  });
};

/**
 * Creates a plane object with a given texture & color, that looks at a given camera
 */
export const createSpaceClouds = (
  texture: string,
  color: ColorRepresentation | undefined,
  camera: PerspectiveCamera,
): Mesh<PlaneGeometry, MeshBasicMaterial, Object3DEventMap> => {
  const spaceCloudsGeometry = new PlaneGeometry(400, 225);
  const spaceMap = new TextureLoader().load(texture);
  spaceMap.colorSpace = SRGBColorSpace;
  const spaceCloudsMaterial = new MeshBasicMaterial({
    map: spaceMap,
    color: color,
    transparent: true,
  });

  const spaceClouds = new Mesh(spaceCloudsGeometry, spaceCloudsMaterial);

  spaceClouds.position.z = -100;
  spaceClouds.position.y = 0;
  spaceClouds.lookAt(camera.position);

  return spaceClouds;
};

/**
 * Creates and returns an array of objects containing a star sprite for three js and a boolean to determine if it should scale up or down
 */
export const createStars = (
  colour?: ColorRepresentation,
): ThreeJSBackgroundStars => {
  const stars: ThreeJSBackgroundStars = [];
  const starMap = new TextureLoader().load("/threeJs/star.png");
  starMap.colorSpace = SRGBColorSpace;
  const starMaterial = new SpriteMaterial({
    map: starMap,
    color: colour || 0x999999,
  });

  for (let i = 0; i < 500; i++) {
    const star = new Sprite(starMaterial);
    const starScale = 1 + Math.random() * 1.5;

    star.position.x = (Math.random() - 0.5) * 600;
    star.position.y = (Math.random() - 0.5) * 300;
    star.position.z = -150 - Math.random() * 50;
    star.scale.x = starScale * 1.5;
    star.scale.y = starScale;

    stars.push({ scaleUp: true, star, scaleSpeed: Math.random() * 0.03 });
  }

  return stars;
};

/**
 * Modify's a star sprite's scale based on it's scaleUp variable
 */
export const scaleStars = (stars: ThreeJSBackgroundStars): void => {
  stars.forEach((star) => {
    if (star.scaleUp) {
      star.star.scale.x += star.scaleSpeed;
      star.star.scale.y += star.scaleSpeed;
    } else {
      star.star.scale.x -= star.scaleSpeed;
      star.star.scale.y -= star.scaleSpeed;
    }

    if (star.star.scale.y > 2.75) {
      star.scaleUp = false;
    }

    if (star.star.scale.y < 1) {
      star.scaleUp = true;
    }
  });
};

/**
 * Creates and returns a sprite object with an SRGB colour space
 */
export const createSpriteObject = (
  texture: string,
  settings?: {
    position?: XYZCoordinates;
    rotation?: XYZCoordinates;
    scale?: XYZCoordinates;
    colour?: ColorRepresentation;
    alphaMap?: string;
  },
): Sprite<Object3DEventMap> => {
  const map = new TextureLoader().load(texture);
  map.colorSpace = SRGBColorSpace;
  const material = new SpriteMaterial({
    map: map,
    alphaHash: true,
    color: settings ? settings.colour : undefined,
  });

  if (settings && settings.alphaMap) {
    const alphaMap = new TextureLoader().load(settings.alphaMap);

    material.alphaMap = alphaMap;
  }

  const sprite = new Sprite(material);

  if (settings) {
    if (settings.position) {
      sprite.position.x = settings.position.x || 0;
      sprite.position.y = settings.position.y || 0;
      sprite.position.z = settings.position.z || 0;
    }

    if (settings.rotation) {
      sprite.rotation.x = settings.rotation.x || 0;
      sprite.rotation.y = settings.rotation.y || 0;
      sprite.rotation.z = settings.rotation.z || 0;
    }

    if (settings.scale) {
      sprite.scale.x = settings.scale.x || 0;
      sprite.scale.y = settings.scale.y || 0;
    }
  }

  return sprite;
};

/**
 * Sets the repeat of a sprite object's material for an object using a sprite sheet
 */
export const setSpriteSheetRepeat = (
  sprite: Sprite<Object3DEventMap>,
  tiles: number,
): void => {
  if (sprite.material.map) {
    sprite.material.map.wrapS = RepeatWrapping;
    sprite.material.map.repeat.set(1 / tiles, 1);
  }
};

/**
 * Modify's a group of asteroid's y rotation
 */
export const rotateAsteroidBelt = (asteroidBelt: Group): void => {
  asteroidBelt.rotation.y -= 0.00005;
};

/**
 * Modify's the rotation of a sun object's material
 */
export const rotateSun = (sun: Sprite<Object3DEventMap>): void => {
  sun.material.rotation += 0.0005;
};
