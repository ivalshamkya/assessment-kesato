export default function Hero() {
  return (
    <>
      <div className="relative w-full h-screen">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src="https://videos.pexels.com/video-files/854976/854976-uhd_2560_1440_30fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-4">
            PREMIER DIVING LIVEABOARDS
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-epilogue">
            Experience the best diving destinations in Indonesia
          </p>
        </div>
      </div>
    </>
  );
}
