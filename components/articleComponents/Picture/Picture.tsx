import React, { FC } from "react";
import styles from "./Picture.module.scss";
import Image from "next/image";
import { PictureFloat, SanityImage } from "../../../types";
import CONSTANTS from "../../../helpers/constants.json";

type PictureProps = {
  picture: SanityImage;
  width?: number;
  float?: PictureFloat;
  source?: string;
  sourceLink?: string;
};

/**
 * A Picture that can be scaled and positioned left or right and given an optional source + link
 * @author Ninjabattler
 * @param picture The picture
 * @param width An optional scale to give to the image
 * @param float Which direction to float when scaled down
 * @param source An optional source to give to the image
 * @param sourceLink A link for the source
 */
const Picture: FC<PictureProps> = ({
  picture,
  width,
  float,
  source,
  sourceLink,
}) => {
  const floatLeft = width < CONSTANTS.PICTURE_MAX_WIDTH && float === CONSTANTS.PICTURE_FLOAT.LEFT;
  const floatRight = width < CONSTANTS.PICTURE_MAX_WIDTH && float === CONSTANTS.PICTURE_FLOAT.RIGHT;

  return (
    <figure
      className={`${styles.picture} ${floatLeft && styles.floatingLeft} ${
        floatRight && styles.floatingRight
      }`}
      style={{ width: width ? `${width}%` : "100%" }}
    >
      <Image
        className={styles.banner}
        src={picture.url}
        width={picture.width}
        height={picture.height}
        loading="lazy"
        placeholder="blur"
        blurDataURL={picture.blur}
        alt={picture.alt}
      />

      {source && (
        <figcaption>
          <a href={sourceLink} title={source} target="_blank" rel="noreferrer">
            {source}
          </a>
        </figcaption>
      )}
    </figure>
  );
};

export default Picture;
