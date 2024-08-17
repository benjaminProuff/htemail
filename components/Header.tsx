import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
              <a
                href="https://flowbite.com/"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Flowbite Logo"
                />
              </a>
            </div>
          </nav>
        </a>
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;

          display: flex;
        }

        a {
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === "loading") {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                  href="https://flowbite.com/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                </a>
              </div>
            </nav>
          </a>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
            border-bottom: 2px solid;
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: gray;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <a data-active={isActive("/signup")}>
            <button
              type="button"
              className="text-white  bg-blue-chill-500 hover:bg-blue-chill-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-md text-sm px-2 py-0.5 me-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              <a>Login</a>
            </button>
            <button
              type="button"
              className="text-white bg-blue-chill-500 hover:bg-blue-chill-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-md text-sm px-2 py-0.5 me-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              <a>Start free trial</a>
            </button>
          </a>
        </Link>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
              <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a
                  href="https://flowbite.com/"
                  className="flex items-center space-x-3 rtl:space-x-reverse"
                >
                  <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="h-8"
                    alt="Flowbite Logo"
                  />
                </a>
                <div
                  className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pl-6"
                  id="navbar-user"
                >
                  <ul className="flex flex-col font-sans text-lg p-6 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                        aria-current="page"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <Link href="/drafts">
                        <a
                          href="#"
                          className="block py-2 px-4  text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Drafts
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Services
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}></a>
        </Link>
        <style jsx>{`
          .bold {
          }

          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          .left a[data-active="true"] {
            color: black;
          }

          a + a {
            margin-left: 1rem;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email} )
        </p>
        <Link href="/">
          <button
            type="button"
            className="text-white bg-blue-chill-500 hover:bg-blue-chill-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-md text-sm px-2 py-0.5 me-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <a>Contact us</a>
          </button>
        </Link>
        <Link href="/create">
          <button
            type="button"
            className="text-white bg-blue-chill-500 hover:bg-blue-chill-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-md text-sm px-2 py-0.5 me-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <a>New post</a>
          </button>
        </Link>

        <button
          onClick={() => signOut()}
          type="button"
          className="text-white bg-blue-chill-500 hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-md text-sm px-2 py-0.5 me-2 mb-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          <a>Log out</a>
        </button>

        {session.user.image && (
          <Link href="/parameters">
            <img
              src={session.user.image}
              alt={`${session.user.name}'s avatar`}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
              }} // Optionnel : style l'image
            />
          </Link>
        )}

        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;

            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            display: flex;
            align-items: center;
            background-color: white;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <nav className="bg-white">
      {left}
      {right}
      <style jsx>{`
        nav {
          display: flex;
          justify-content: space-between;
          padding-left: 2rem;
          padding-right: 2rem;
          padding-top: 0.5rem;
          align-items: center;
          background-color: ;
        }
      `}</style>
    </nav>
  );
};

export default Header;
