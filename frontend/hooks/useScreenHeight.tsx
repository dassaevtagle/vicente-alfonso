import { useEffect, useState } from "react";

const useScreenHeight = () => {
  const [screenHeight, setScreenHeight] = useState<number>(0)
  useEffect(() => {
    const handleWindowResize = () => setScreenHeight(window.innerHeight)
    setScreenHeight(window.innerHeight)
    window.addEventListener("resize", handleWindowResize)
    return () => window.removeEventListener("resize", handleWindowResize)
  }, [])

  return screenHeight
}

export default useScreenHeight