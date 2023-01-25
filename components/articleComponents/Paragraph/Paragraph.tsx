import React, { ComponentType } from 'react';
import FireText from '../../animatedText/FireText/FireText';
import ThunderText from '../../animatedText/ThunderText/ThunderText';
import IceText from '../../animatedText/IceText/IceText';
import EarthText from '../../animatedText/EarthText/EarthText';
import RegexText from '../../animatedText/RegexText/RegexText';
import MetalHeadText from '../../animatedText/MetalHeadText/MetalHeadText';
import TerrariaText from '../../animatedText/TerrariaText/TerrariaText';
import styles from "./Paragraph.module.scss";
import Picture from '../Picture/Picture';
import Spoiler from '../Spoiler/Spoiler';
import { ParagraphItem, PictureItem } from '../../../types';

type ParagraphProps = {
  content: Array<any>;
}

const Paragraph: ComponentType<ParagraphProps> = ({ content }) => (
  <div className={styles.paragraph}>
    {/* @ts-ignore - JsxParser has an error with how it exports, works perfectly fine though */}
    {/* <JsxParser
      components={{ FireText, EarthText, IceText, ThunderText, RegexText, MetalHeadText, TerrariaText, Picture, Spoiler } as {}}

      jsx={`<p>${text}</p>`}
    /> */}
    <p>
      {content && content.map((item) => {
        if (typeof item === 'string') {
          return <span dangerouslySetInnerHTML={{ __html: item.replace(/&quot;/g, '"') }}></span>
        } else {
          switch (item.type) {
            case 'FireText':
              return <FireText text={item.content.replace(/&quot;/g, '"')} />

            case 'EarthText':
              return <EarthText text={item.content.replace(/&quot;/g, '"')} />

            case 'ThunderText':
              return <ThunderText text={item.content.replace(/&quot;/g, '"')} />

            case 'IceText':
              return <IceText text={item.content.replace(/&quot;/g, '"')} />

            case 'MetalHeadText':
              return <MetalHeadText text={item.content.replace(/&quot;/g, '"')} />

            case 'RegexText':
              return <RegexText text={item.content.replace(/&quot;/g, '"')} />

            case 'TerrariaText':
              return <TerrariaText
                text={item.content.replace(/&quot;/g, '"')}
                colour={item.colour}
                dog={item.dog}
                draedon={item.draedon}
                moonlord={item.moonlord}
                scal={item.scal}
                yharim={item.yharim}
              />
            case 'Picture':
              return <Picture
                imageSrc={item.imageSrc}
                width={item.width}
                float={item.float}
                pageColour={item.pageColour || ''}
              />;
            case 'Spoiler':
              return <Spoiler
                text={item.content}
              />;
            default:
              return <></>;
          }
        }
      })}
    </p>
  </div>
)

export default Paragraph