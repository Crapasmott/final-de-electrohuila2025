import React, { useState, useRef, useEffect } from 'react';
import styles from './VideoThumbnail.module.css';

const VideoThumbnail = ({ 
  thumbnailSrc, 
  title, 
  duration, 
  previewVideoSrc = null,
  category,
  onClick
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const previewRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Manejar hover para iniciar/detener preview
  useEffect(() => {
    if (!previewVideoSrc || !previewRef.current) return;
    
    if (isHovering && hasInteracted) {
      previewRef.current.currentTime = 0;
      previewRef.current.play().catch(e => console.log('Auto-play prevented:', e));
    } else {
      previewRef.current.pause();
    }
  }, [isHovering, hasInteracted, previewVideoSrc]);
  
  // Manejar carga de la imagen
  useEffect(() => {
    if (thumbnailRef.current && thumbnailRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    setHasInteracted(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const handleThumbnailLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      className={`${styles.thumbnailContainer} ${isLoaded ? styles.loaded : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Efecto de carga con pulso */}
      {!isLoaded && (
        <div className={styles.loadingPulse}></div>
      )}
      
      {/* Imagen principal de miniatura */}
      <img 
        ref={thumbnailRef}
        src={thumbnailSrc} 
        alt={title} 
        className={styles.thumbnail}
        onLoad={handleThumbnailLoad}
      />
      
      {/* Video de vista previa si está disponible */}
      {previewVideoSrc && (
        <video 
          ref={previewRef}
          className={`${styles.previewVideo} ${isHovering ? styles.active : ''}`}
          muted
          loop
          playsInline
        >
          <source src={previewVideoSrc} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay con degradado */}
      <div className={styles.overlay}>
        {/* Categoría */}
        <div className={styles.category}>{category}</div>
        
        {/* Título del video */}
        <h3 className={styles.title}>{title}</h3>
        
        {/* Duración del video */}
        <div className={styles.duration}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-0.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span>{duration}</span>
        </div>
      </div>
      
      {/* Botón de reproducción con animación */}
      <div className={styles.playButtonWrapper}>
        <div className={`${styles.playButton} ${isHovering ? styles.active : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Animación de ondas al hacer hover */}
      <div className={`${styles.rippleEffect} ${isHovering ? styles.active : ''}`}>
        <div className={styles.ripple}></div>
        <div className={styles.ripple}></div>
        <div className={styles.ripple}></div>
      </div>
    </div>
  );
};

export default VideoThumbnail;