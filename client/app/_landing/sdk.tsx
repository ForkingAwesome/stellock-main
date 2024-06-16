import Image from "next/image";

const SDK = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <div className="w-1/2 flex justify-center items-center">
          <Image
            src="/key.png"
            alt="key"
            width={500}
            height={500}
            className="rounded-md shadow-md"
          />
        </div>
        <div className="w-1/2">
          <div className="w-[666px] hidden md:flex text-center text-black text-6xl font-semibold font-playfair">
            Have it both ways, a user-friendly and decentralised account
          </div>
        </div>
      </div>
      <div className="min-h-screen flex flex-col gap-y-4 justify-center items-center">
        <div className="hidden md:flex text-center text-black text-3xl font-semibold font-playfair">
          Bring dApp's from 0 to 1
        </div>
        <div className="hidden md:flex text-center text-black text-6xl font-semibold font-playfair">
          <span className="relative">
            <span>Builders</span>
            <span className="absolute left-0 bottom-0 w-full h-1 bg-yellow-500"></span>
          </span>
          , get started in seconds
        </div>
        <div>
            <Image src="/carbon.svg" alt="code" width={600} height={400} className="shadow-md rounded-md pt-4"/>
        </div>
      </div>
    </>
  );
};

export default SDK;
