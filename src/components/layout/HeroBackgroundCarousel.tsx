import { useEffect, useState } from "react";

interface HeroBackgroundCarouselProps {
    images: string[];
    interval?: number;
}

export const HeroBackgroundCarousel: React.FC<HeroBackgroundCarouselProps> = ({
    images,
    interval = 4000,
}) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, interval);

        return () => clearInterval(timer);
    }, [images.length, interval]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100" : "opacity-0"
                        }`}
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            ))}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/50" />
        </div>
    );
};
