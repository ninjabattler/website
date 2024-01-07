import React, { ComponentType } from "react";
import { ColourType } from "../../../types";
import styles from "./TerrariaText.module.scss";

type TerrariaTextProps = {
  text: string;
  colour: ColourType;
  draedon?: boolean;
  yharim?: boolean;
  moonlord?: boolean;
  dog?: boolean;
  scal?: boolean;
};

const TerrariaText: ComponentType<TerrariaTextProps> = ({
  text,
  colour,
  draedon,
  yharim,
  moonlord,
  dog,
  scal,
}) => (
  <span
    className={`${styles.terrariaText} ${draedon && styles.draedon} ${
      moonlord && styles.moonlord
    } ${yharim && styles.yharim} ${dog && styles.dog} ${scal && styles.scal}`}
    style={colour && { color: colour }}
  >
    <b>{text}</b>
  </span>
);

export default TerrariaText;
