const HeroSection = ({ 
  title, 
  subtitle, 
  backgroundImage = 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000',
  overlayOpacity = 85,
  children 
}) => {
  return (
    <div 
      className="relative bg-cover bg-center text-white py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay escuro para legibilidade */}
      <div 
        className="absolute inset-0 bg-[#0a1929]"
        style={{ opacity: overlayOpacity / 100 }}
      ></div>
      
      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl mb-8 text-gray-300">
            {subtitle}
          </p>
        )}
        
        {/* Conteúdo personalizado */}
        {children && (
          <div>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export default HeroSection
