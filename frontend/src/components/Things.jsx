function Things() {
  return (
    <>
      <div className="bg-stone-400 pt-10 pb-20">
        <div className=" container mx-auto">
          <div className="grid grid-cols-3 gap-5">
            <div className="text-center space-y-2">
              <img
                src="https://i.ibb.co.com/fSpJrHs/shat-gombujh-mosjid.jpg"
                alt=""
                className="rounded-full"
              />
              <p className="text-2xl">দর্শনীয় ধর্মীয় প্রার্থনাস্থল</p>
              <p>
                বাংলাদেশের মুসলিম, হিন্দু, বৌদ্ধ, খ্রিস্টান ধর্মের প্রার্থনাস্থল
              </p>
              <button className="btn btn-outline text-white">Learn More</button>
            </div>
            <div className="text-center space-y-2">
              <img
                src="https://i.ibb.co.com/6tyjWLQ/shalba-bihar.jpg"
                alt=""
                className="rounded-full"
              />
              <p className="text-2xl">জাদুঘর</p>
              <p>বাংলাদেশের জাতীয় জাদুঘরের পাশাপাশি রয়েছে বেশ কিছু জাদুঘর</p>
              <button className="btn btn-outline text-white">Learn More</button>
            </div>
            <div className="text-center space-y-2">
              <img
                src="https://i.ibb.co.com/cFnRGpK/vashkorjo.jpg"
                alt=""
                className="rounded-full"
              />
              <p className="text-2xl">ভাস্কর্য</p>
              <p>বাংলাদেশে আছে অগণিত ভাস্কর্য</p>
              <button className="btn btn-outline text-white">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Things;
