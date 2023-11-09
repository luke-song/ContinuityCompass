import { useEffect, useRef } from 'react';
import { TweenMax, Power4 } from 'gsap';
import LeonSans from '@nindaff/leonsans';
import { useMediaQuery } from 'react-responsive';

const LeonComponent = () => {
  const canvasRef = useRef(null);
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' });

  useEffect(() => {
    const sw = isMobile ? 300 : 1200;
    const sh = isMobile ? 100 : 300;
    const pixelRatio = 2;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = sw * pixelRatio;
    canvas.height = sh * pixelRatio;
    canvas.style.width = sw + 'px';
    canvas.style.height = sh + 'px';
    ctx.scale(pixelRatio, pixelRatio);

    const leon = new LeonSans({
      text: isMobile ? 'C.C v0.1' : 'Continuity Compass v0.1',
      color: ['#FFFFFF'],
      size: isMobile ? 40 : 80,
      weight: 200,
    });

    const animate = (t) => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, sw, sh);
      const x = (sw - leon.rect.w) / 2;
      const y = (sh - leon.rect.h) / 2;
      leon.position(x, y);
      leon.draw(ctx);
    };

    animate();

    let i,
      total = leon.drawing.length;
    for (i = 0; i < total; i++) {
      TweenMax.fromTo(
        leon.drawing[i],
        1.6,
        {
          value: 0,
        },
        {
          delay: i * 0.05,
          value: 1,
          ease: Power4.easeOut,
        }
      );
    }
  }, []);

  return <canvas ref={canvasRef} />;
};

export default LeonComponent;
