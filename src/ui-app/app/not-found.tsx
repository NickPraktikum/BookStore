import Link from "next/link";

export default function Custom404() {
  return (
    <main className="w-[410px]">
      <div className="flex justify-center items-center">
        <div className="bg-[#ECECEC] w-[300px] h-[150px] p-5 text-center rounded-xl flex justify-center items-center flex-col mt-[25px] overflow-hidden drop-shadow-md shadow-md">
          <h2 className="oxygen-mono-regular text-5xl">404 Error</h2>
          <p className="text-base">No instances were found!</p>
          <Link href="/">
            <button className="bg-white p-2 rounded-lg m-2 text-sm">
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
