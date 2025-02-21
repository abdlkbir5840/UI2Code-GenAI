"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Authentication from "./_components/Authentication";
import ProfileAvatar from "./_components/ProfileAvatar";
import { useAuthContext } from "./provider";

const codeSnippets = [
  `<div className="flex items-center justify-center">
  <img src="image.jpg" alt="AI generated" />
</div>`,
  `const Button = ({ text, onClick }) => (
  <button
    className="bg-blue-500 text-white px-4 py-2 rounded"
    onClick={onClick}
  >
    {text}
  </button>
);`,
  `function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">My App</h1>
      <nav className="mt-2">
        <a href="/" className="mr-4">Home</a>
        <a href="/about" className="mr-4">About</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}`,
];

export default function Home() {
  const user = useAuthContext();
  const [backgroundSnippets, setBackgroundSnippets] = useState([]);

  useEffect(() => {
    const snippets = Array(5)
      .fill(null)
      .map(() => ({
        code: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
      }));
    setBackgroundSnippets(snippets);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden relative flex flex-col">
      {backgroundSnippets.map((snippet, index) => (
        <motion.div
          key={index}
          className="absolute opacity-10 pointer-events-none"
          initial={{
            x: `${snippet.x}%`,
            y: `${snippet.y}%`,
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            x: [`${snippet.x}%`, `${(snippet.x + 10) % 100}%`],
            y: [`${snippet.y}%`, `${(snippet.y + 10) % 100}%`],
            scale: [0.5, 0.6, 0.5],
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <SyntaxHighlighter
            language="jsx"
            style={atomDark}
            customStyle={{ padding: "1em", borderRadius: "0.5em" }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </motion.div>
      ))}

      <div className="relative z-10 flex-grow">
        <header className="flex justify-between items-center p-4 md:p-6">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
            <span className="text-lg font-semibold text-white opacity-55">
              UI2CODE GENAI
            </span>
          </div>

          <div>
            {!user?.user?.email ? (
              <Authentication>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Get Started
                </button>
              </Authentication>
            ) : (
              <ProfileAvatar />
            )}
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-24">
          <div className="text-center">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Transform Images into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                React Code
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Upload an image, get production-ready React components in seconds.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {!user?.user?.email ? (
                <Authentication>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg">
                    Start Coding
                  </button>
                </Authentication>
              ) : (
                <Link href="/dashboard">
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg">
                    Go to Dashboard
                  </button>
                </Link>
              )}
            </motion.div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🚀"
              title="Instant Code Generation"
              description="Upload an image and get React code in seconds."
            />
            <FeatureCard
              icon="🎨"
              title="Customizable Output"
              description="Tailor the generated code to your project needs."
            />
            <FeatureCard
              icon="📱"
              title="Responsive Design"
              description="Get mobile-friendly components out of the box."
            />
          </div>
        </main>
      </div>

      <footer className="relative z-10 bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">
                Created by Abdelkabir EL BAHMADI
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/elbahmadi/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.facebook.com/abdlkbir.elbahmadi.3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="mailto:habonbahmadi@gmail.com"
                className="hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="sr-only">Email</span>
              </a>
              <a
                href="https://abdelkabirelbahmadi.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  ></path>
                </svg>
                <span className="sr-only">Portfolio</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
