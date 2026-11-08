/**
 * Generates an ultra-luxurious, editorial romantic Keepsake Postcard (1080 x 1350px)
 * for Haseena to download and treasure forever on her phone or computer.
 */
export function generateKeepsakeCard(
  targetName = "HASEENA",
  senderName = "Naveen",
  dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
): void {
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Background Gradient (Deep Burgundy to Wine Red)
  const bgGrad = ctx.createRadialGradient(540, 675, 50, 540, 675, 800);
  bgGrad.addColorStop(0, '#64152D');
  bgGrad.addColorStop(0.6, '#3B0A1E');
  bgGrad.addColorStop(1, '#1a040d');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1080, 1350);

  // 2. Double Ornate Champagne Gold Borders
  ctx.strokeStyle = 'rgba(214, 183, 121, 0.6)';
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, 980, 1250);

  ctx.strokeStyle = 'rgba(214, 183, 121, 0.25)';
  ctx.lineWidth = 1;
  ctx.strokeRect(65, 65, 950, 1220);

  // 3. Corner Filigrees
  const drawCorner = (x: number, y: number, angle: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.strokeStyle = '#D6B779';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(0, 0);
    ctx.lineTo(30, 0);
    ctx.stroke();

    ctx.fillStyle = '#D6B779';
    ctx.beginPath();
    ctx.arc(8, 8, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  drawCorner(75, 75, 0);
  drawCorner(1005, 75, 90);
  drawCorner(1005, 1275, 180);
  drawCorner(75, 1275, 270);

  // 4. Subtle Ambient Floating Gold Dust
  ctx.fillStyle = 'rgba(214, 183, 121, 0.4)';
  const points = [
    [200, 250, 2], [320, 180, 3], [850, 220, 2.5], [780, 380, 1.5],
    [150, 800, 2], [880, 750, 3], [250, 1100, 2.5], [750, 1150, 2]
  ];
  points.forEach(([x, y, r]) => {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  });

  // 5. Golden Heart Symbol
  ctx.save();
  ctx.translate(540, 290);
  ctx.fillStyle = '#D6B779';
  ctx.shadowColor = 'rgba(214, 183, 121, 0.8)';
  ctx.shadowBlur = 25;
  ctx.beginPath();
  // Draw heart
  ctx.moveTo(0, 30);
  ctx.bezierCurveTo(-45, -20, -60, -65, -25, -75);
  ctx.bezierCurveTo(0, -80, 0, -50, 0, -50);
  ctx.bezierCurveTo(0, -50, 0, -80, 25, -75);
  ctx.bezierCurveTo(60, -65, 45, -20, 0, 30);
  ctx.fill();
  ctx.restore();

  // 6. Header Tagline
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D6B779';
  ctx.font = '500 18px "Montserrat", sans-serif';
  ctx.letterSpacing = '10px';
  ctx.fillText('A LITTLE WORLD CALLED', 540, 430);

  // 7. Master Name: HASEENA
  ctx.font = '300 84px "Playfair Display", Georgia, serif';
  ctx.letterSpacing = '18px';
  ctx.fillStyle = '#FFF8F0';
  ctx.fillText(targetName, 540, 540);

  // 8. Divider Line
  ctx.strokeStyle = 'rgba(214, 183, 121, 0.5)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(390, 600);
  ctx.lineTo(690, 600);
  ctx.stroke();

  // Small center diamond
  ctx.fillStyle = '#D6B779';
  ctx.save();
  ctx.translate(540, 600);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-4, -4, 8, 8);
  ctx.restore();

  // 9. Romantic Poetic Quote
  ctx.font = 'italic 300 34px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = '#F4DCE2';
  ctx.fillText('"Six moments. One beautiful soul."', 540, 680);

  ctx.font = 'italic 300 24px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = 'rgba(255, 248, 240, 0.85)';
  ctx.fillText('May every day bring you reasons to smile as brightly as you do.', 540, 750);
  ctx.fillText('A chapter of gentle appreciation, quiet warmth, and beautiful dreams.', 540, 795);

  // 10. Date Badge
  ctx.font = '400 16px "Montserrat", sans-serif';
  ctx.fillStyle = '#D6B779';
  ctx.letterSpacing = '6px';
  ctx.fillText(`BEGUN WITH LOVE • ${dateStr.toUpperCase()}`, 540, 930);

  // 11. Signature & Dedication
  ctx.font = 'italic 300 22px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = 'rgba(214, 183, 121, 0.8)';
  ctx.fillText('Dedicated with all my heart,', 540, 1070);

  ctx.font = 'bold 54px "Great Vibes", cursive, serif';
  ctx.fillStyle = '#FFF8F0';
  ctx.fillText(senderName, 540, 1140);

  // Trigger Download
  const link = document.createElement('a');
  link.download = `A_Little_World_Called_Haseena_Keepsake_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  document.body.appendChild(link);
  link.click();
  link.remove();
}
