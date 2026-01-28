"use client";

import Image from "next/image";
import Link from "next/link";

export default function SongPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-yellow-500 flex flex-col items-center justify-center px-4 py-8">
      {/* Logo */}
      <Link href="/" className="mb-8">
        <Image
          src="/images/logo.png"
          alt="ConnecTech Logo"
          width={120}
          height={120}
          className="rounded-full shadow-lg"
        />
      </Link>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-center">
        ConnecTech Team Song
      </h1>
      <p className="text-gray-700 mb-8">Team #27757</p>

      {/* Audio Player Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mb-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-4 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 text-gray-900"
            >
              <path d="M19.952 1.651a.75.75 0 01.298.599V16.303a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.403-4.909l2.311-.66a1.5 1.5 0 001.088-1.442V6.994l-9 2.572v9.737a3 3 0 01-2.176 2.884l-1.32.377a2.553 2.553 0 11-1.402-4.909l2.31-.66a1.5 1.5 0 001.088-1.442V5.25a.75.75 0 01.544-.721l10.5-3a.75.75 0 01.658.122z" />
            </svg>
          </div>
          <audio
            controls
            className="w-full"
            preload="metadata"
          >
            <source src="/audio/Connect Tech.m4a" type="audio/mp4" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>

      {/* Lyrics Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Lyrics</h2>
        <p className="text-gray-800 text-center leading-relaxed">
          ConnecTech family,<br />
          I got all my teammates with me!<br />
          ConnecTech family,<br />
          We&apos;re building robots in unity!<br />
          <br />
          We are Team ConnecTech, we dig and explore,<br />
          <span className="text-yellow-600 font-semibold">Discover new ideas, like never before!</span>
        </p>
      </div>

      {/* Link to main site */}
      <Link
        href="/"
        className="text-gray-800 hover:text-gray-900 underline underline-offset-4 transition-colors"
      >
        Visit our website
      </Link>
    </div>
  );
}
