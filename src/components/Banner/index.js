import { useEffect, useRef, useState } from 'react';
import image1 from '../../assets/images/painel/carrocel-img-1.webp';
import image2 from '../../assets/images/painel/carrocel-img-2.webp';
import image3 from '../../assets/images/painel/carrocel-img-3.webp';
import image4 from '../../assets/images/painel/carrocel-img-4.jpg';
import styles from './Banner.module.css';
import { motion } from 'framer-motion';

export default function Banner() {
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // Estado para rastrear arrasto
  const images = [image1, image2, image3, image4];
  const totalSlides = images.length;


  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded === images.length) {
        console.log('scrollWidth:', carousel.current?.scrollWidth);
        console.log('offsetWidth:', carousel.current?.offsetWidth);
        console.log('calculated width:', carousel.current?.scrollWidth - carousel.current?.offsetWidth);
        setWidth(carousel.current?.scrollWidth - carousel.current?.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded]);


  const handleImageLoad = () => {
    setImagesLoaded((prev) => {
      console.log('Image loaded, count:', prev + 1);
      return prev + 1;
    });
  };


  const handleDrag = (event, info) => {
    console.log('Dragging:', info.offset.x);
  };

  // ---- Intervalo de mudança de slide
  useEffect(() => {
    if (imagesLoaded !== images.length || isDragging) return; // Pausa durante arrasto

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesLoaded, totalSlides, isDragging]);

 // ---- Ajuste da posição do slide
  const slideWidth = window.innerWidth; // Largura do slide
  const xPosition = -currentSlide * slideWidth;

  // Ajustar slide ao soltar o arrasto
  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = carousel.current?.getBoundingClientRect().x || 0;
    const newSlide = Math.round(-currentX / slideWidth);
    console.log('Drag ended, newSlide:', newSlide);
    setCurrentSlide(newSlide >= 0 && newSlide < totalSlides ? newSlide : 0);
  };

  return (
    <div className={styles.Banner}>
      <motion.div
        ref={carousel}
        className={styles.carousel}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className={styles.inner}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          dragElastic={0.2}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }} // transição do slide para voltar ao inical
          onDrag={handleDrag} // ao clicar ele diz o quanto foi arrastado 
          onDragStart={() => setIsDragging(true)}  //quando o usuário começa a arrastar
          onDragEnd={handleDragEnd} // quando o usuário solta o arrasto
          animate={{ x: xPosition }} 
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {images.map((image, index) => (
            <motion.div key={index} className={styles.item}>
              <img
                src={image}
                alt={`Banner ${index + 1}`}
                className={styles.img}
                onLoad={handleImageLoad}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}