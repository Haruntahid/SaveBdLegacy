function Banner() {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://i.ibb.co.com/M5jgL12/shohid-minar.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="min-w-lg">
            <h1 className="mb-10 text-6xl font-bold">
              Save Bangladeshi Legacy
            </h1>
            <button className="btn btn-outline text-white text-xl ">
              Report Here
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
