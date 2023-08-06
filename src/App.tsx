import { useEffect, useRef, useState } from "react";
import { UnsplashImage, fetchUnsplashImage } from "./Service";
import LazyImage from "./LazyImage";

function App() {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const boundaryRef = useRef<HTMLDivElement | null>(null);

  const call = async () => {
    setLoading(true);
    for (let i = 0; i < 5; i++) {
      const image = await fetchUnsplashImage();
      setImages((prevImages) => [...prevImages, image]);
    }
    setLoading(false);
  };

  useEffect(() => {
    call();
  }, []);

  const handleScroll = () => {
    if (boundaryRef.current) {
      const distance =
        boundaryRef.current.getBoundingClientRect().bottom - window.innerHeight;

      if (distance < 100 && !loading) call();
    }
  };

  if (images.length === 0) return;
  return (
    <div
      onScroll={handleScroll}
      ref={boundaryRef}
      className="image-container"
      style={{ height: "100vh", overflow: "scroll" }}
    >
      {images.map((image) => (
        <div key={image.id}>
          <LazyImage url={image.url} />
        </div>
      ))}
      {loading ? <div>Loading...</div> : ""}
    </div>
  );
}

export default App;
