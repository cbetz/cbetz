import { FiGithub, FiTwitter, FiYoutube } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
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
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

          <p className="pt-8 text-sm">
            Totally optional short description about yourself, what you do and
            so on.
          </p>

          <div className="pt-12 pb-8">
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              Get In Touch
            </button>
          </div>

          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <a className="link" href="https://twitter.com/thechrisbetz">
              <FiTwitter size="2em"></FiTwitter>
            </a>
            <a className="link" href="https://github.com/cbetz">
              <FiGithub size="2em"></FiGithub>
            </a>
            <a className="link" href="http://www.youtube.com/c/ChrisBetz">
              <FiYoutube size="2em"></FiYoutube>
            </a>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/5">
        <img
          src="https://images.ctfassets.net/nld1cbd8nf0f/50rUigjk0iUdn6YaTR8fM1/cd888f0f0e4c6b6644301c8ca1526904/profile.png"
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
}
