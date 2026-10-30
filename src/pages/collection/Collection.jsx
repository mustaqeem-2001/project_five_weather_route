import { useState } from "react"
import usePlaces from "../../hooks/usePlaces.jsx";

export default function Collection() {
  const { places, setPlaces } = usePlaces(() => {
    
  });
  return (
    <main>
      <p></p>
      <h1></h1>
      <p>Your go to forecasts all in one place <span>total num</span></p>
    </main>
  )
}