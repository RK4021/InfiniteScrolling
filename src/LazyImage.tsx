import React, { useEffect, useRef, useState } from "react";

export default function LazyImage({ url }: { url: string }) {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibility(true);
        } else {
          setVisibility(false); // Reset visibility when the image is out of view
        }
      });
    };

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.1, // Percentage of the element that should be visible to trigger the intersection
    };

    const observer = new IntersectionObserver(callback, options);

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div ref={imageRef}>
      {isVisible ? (
        <img src={url} width={500} height={500} alt="" />
      ) : (
        <div
          style={{ height: "500px", width: "500px", backgroundColor: "black" }}
        ></div>
      )}
    </div>
  );
}
