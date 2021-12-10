import React from 'react';
import styles from "../styles/LoadingOverlay.module.css";

export default function LoadingOverlay() {
  let QUOTES = [
    'Ware wa meshia nari!',
    "Falcon... I'm not the only copy of you.",
    'This is like taking candy from a baby, which is fine by me',
    "I am the Eggman, that's what I am, I am the Eggman, I've got the master plan",
    'Zero! You were a Maverick?!',
    'Poyo!',
    'You mean... Craymen?!',
    'Impending doom aproaches',
    "But that's what it takes to be infinite!",
    "You there, you're the one they call Dragonborn?",
    "What a fool you are. I'm a god, how can you kill a god? What a grand and intoxicating innocence. How could you be so naive? There is no escape. No recall or intervention can work in this place. Come, lay down your weapons, it is not too late for my mercy",
    "Woomy!",
    "You're dead, your friends are dead, game over",
    "Beadichnoa NiGHTS",
    "わたしはにほんじんをはなません",
    "Seven seconds til the end...",
    "Are we the future of this burning hell?"
  ]

  return (
    <div id={styles.loadingOverlay}>
      <img src='/Ninja placeholder.png' />
      <p>&quot;{QUOTES[Math.floor(Math.random() * QUOTES.length)]}&quot;</p>
    </div>
  )
}