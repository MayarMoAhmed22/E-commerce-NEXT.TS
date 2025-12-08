import Link from "next/link";

export default function notFound() {
  return (
    <>
      <div className=" h-[80%] flex items-center justify-center">
        <div className=" flex flex-col justify-center items-center">
          <h1 className="font-bold text-6xl mb-4">404 Not Found</h1>
          <p className="text-sm mb-6">
            Your visited page not found. You may go home page.
          </p>
          <Link href={"/"} className="p-3 bg-[#DB4444] rounded-sm text-white">
            Back to home
          </Link>
        </div>
      </div>
    </>
  );
}
