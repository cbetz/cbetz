import { FiGithub, FiTwitter, FiYoutube, FiLinkedin } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 lg:my-0">
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png')`,
            }}
          ></div>

          <h1 className="text-3xl font-bold pt-8 lg:pt-0">Chris Betz</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2"></div>

          <p className="pt-8 text-sm">
            Currently CTO at{" "}
            <a
              className="underline"
              href="https://newoceanhealth.com"
              target="_blank"
              rel="noreferrer"
            >
              New Ocean Health
            </a>
            . <br></br>
            Building software at{" "}
            <a
              className="underline"
              href="https://unitedeffects.com"
              target="_blank"
              rel="noreferrer"
            >
              United Effects
            </a>{" "}
            and{" "}
            <a
              className="underline"
              href="https://betzsoftware.com.com"
              target="_blank"
              rel="noreferrer"
            >
              Betz Software
            </a>
            .
          </p>

          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <a
              className="link"
              href="http://www.linkedin.com/in/christopherbetz"
              target="_blank"
              rel="noreferrer"
            >
              <FiLinkedin size="2em"></FiLinkedin>
            </a>
            <a
              className="link"
              href="https://twitter.com/thechrisbetz"
              target="_blank"
              rel="noreferrer"
            >
              <FiTwitter size="2em"></FiTwitter>
            </a>
            <a
              className="link"
              href="https://github.com/cbetz"
              target="_blank"
              rel="noreferrer"
            >
              <FiGithub size="2em"></FiGithub>
            </a>
            <a
              className="link"
              href="http://www.youtube.com/c/ChrisBetz"
              target="_blank"
              rel="noreferrer"
            >
              <FiYoutube size="2em"></FiYoutube>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5">
        <img
          src="https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png"
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
}
