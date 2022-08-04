import React from 'react';
import Image from 'next/image'

export default function Emoji(props){
  return (
    <span style={{ height: '20px', display: 'inline-flex', alignItems: 'center', marginBottom: '-20px' }}>
      <Image src={props.imageSrc} layout="fixed" width="30%" height="30%" objectFit='contain' style={{ imageRendering: 'pixelated' }} />
    </span>
  )
}