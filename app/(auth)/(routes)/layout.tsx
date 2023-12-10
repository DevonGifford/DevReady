import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <div className="h-full flex-col">
    <div className="flex h-screen flex-col items-center justify-center max-w-3xl mx-auto overflow-x-hidden">
      <div
        className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>

      <main className="flex flex-col h-full overflow-y-auto">
        <div className="flex flex-col items-center h-screen justify-center">
          {/* TEMPORARY LOGO SOLUTION 🎯 */}
          <Link
            href="/"
            className="flex flex-row items-center justify-start gap-0.5 font-bold text-3xl pt-6"
          >
            <Image
              src="/landingpage/ZTM-logo.png"
              alt="ztmready logo"
              width={66}
              height={66}
              className=""
            />
            <span className="flex text-devready-green">ZTM</span>
            <span className="flex">Ready</span>
          </Link>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
