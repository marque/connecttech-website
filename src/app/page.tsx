import Image from "next/image";

export default function Home() {
  const teamMembers = [
    { name: "Luke LIDAR", coreValue: "Discovery", image: "/images/img_58_1.jpeg" },
    { name: "Grace Grid", coreValue: "Innovation", image: "/images/img_56_1.jpeg" },
    { name: "Salima Sand", coreValue: "Impact", image: "/images/img_55_1.jpeg" },
    { name: "Sarina Stone", coreValue: "Inclusion", image: "/images/img_57_1.jpeg" },
    { name: "Naya Natural", coreValue: "Teamwork", image: "/images/img_62_1.jpeg" },
    { name: "Ivan Identify", coreValue: "Fun", image: "/images/img_59_1.jpeg" },
    { name: "Andrew Artifact", coreValue: "Impact", image: "/images/img_60_1.jpeg" },
    { name: "Eric Excavate", coreValue: "Innovation", image: "/images/img_61_1.jpeg" },
  ];

  const robotAttachments = [
    { name: "The Snake", image: "/images/the-snake.png" },
    { name: "The Scorpion", image: "/images/the-scorpion.png" },
    { name: "Lionel Meshi", image: "/images/lionel-meshi.png" },
    { name: "The Thwacker", image: "/images/the-thwacker.png" },
    { name: "The Fangs", image: "/images/the-fangs.png" },
    { name: "The Smasher", image: "/images/the-smasher.png" },
  ];

  const coreValues = [
    { name: "Discovery", emoji: "🔍", description: "We explore new skills and ideas" },
    { name: "Innovation", emoji: "💡", description: "We use creativity and persistence to solve problems" },
    { name: "Impact", emoji: "🌍", description: "We apply what we learn to improve our world" },
    { name: "Inclusion", emoji: "🤝", description: "We respect each other and embrace our differences" },
    { name: "Teamwork", emoji: "👥", description: "We are stronger when we work together" },
    { name: "Fun", emoji: "🎉", description: "We enjoy and celebrate what we do!" },
  ];

  const howItWorksSteps = [
    { step: 1, title: "Position", desc: "Place GridLock over your excavation site", image: "/images/img_26_1.jpeg" },
    { step: 2, title: "Level", desc: "Use bubble levels to ensure frame is horizontal", image: "/images/img_27_1.jpeg" },
    { step: 3, title: "Adjust", desc: "Extend telescoping legs to desired height", image: "/images/img_29_2.jpeg" },
    { step: 4, title: "Activate", desc: "Turn on lasers to project grid lines", image: "/images/img_41_1.jpeg" },
    { step: 5, title: "Excavate", desc: "Begin precise, organized excavation", image: "/images/img_28_2.jpeg" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-yellow-500">ConnecTech</span>
              <span className="text-sm text-gray-500">#27757</span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#innovation" className="text-gray-600 hover:text-yellow-500 transition">Innovation</a>
              <a href="#robot" className="text-gray-600 hover:text-yellow-500 transition">Robot</a>
              <a href="#core-values" className="text-gray-600 hover:text-yellow-500 transition">Core Values</a>
              <a href="#team" className="text-gray-600 hover:text-yellow-500 transition">Family</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-medium transition">Survey</a>
            </div>
            {/* Mobile Survey Button */}
            <div className="md:hidden">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-full font-medium text-sm transition">Survey</a>
            </div>
          </div>
        </div>
        {/* Mobile Navigation Links */}
        <div className="md:hidden border-t border-gray-100 bg-white/95">
          <div className="flex overflow-x-auto gap-4 px-4 py-2 text-sm">
            <a href="#innovation" className="text-gray-600 whitespace-nowrap">Innovation</a>
            <a href="#robot" className="text-gray-600 whitespace-nowrap">Robot</a>
            <a href="#core-values" className="text-gray-600 whitespace-nowrap">Core Values</a>
            <a href="#team" className="text-gray-600 whitespace-nowrap">Family</a>
          </div>
        </div>
      </nav>

      {/* Entry Slide / Hero Section */}
      <section className="min-h-screen pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-100 via-yellow-50 to-amber-50">
        <div className="max-w-5xl mx-auto text-center">
          {/* Team Logo/Badge */}
          <div className="mb-8">
            <div className="inline-block bg-yellow-400 text-black text-lg font-bold px-6 py-2 rounded-full mb-6 shadow-lg">
              FIRST LEGO League Challenge 2025
            </div>
            <h1 className="text-6xl sm:text-8xl font-bold text-gray-900 mb-4">
              <span className="text-yellow-500">ConnecTech</span>
            </h1>
            <p className="text-3xl sm:text-4xl font-semibold text-gray-700 mb-4">#27757</p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bayview Glen School - Toronto, Ontario
            </p>
          </div>

          {/* Team Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-12 max-w-3xl mx-auto">
            <Image
              src="/images/img_11_1.jpeg"
              alt="ConnecTech Team"
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>

          {/* Three Main Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <a href="#innovation" className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-2">
              <span className="text-3xl">💡</span>
              <span>Innovation</span>
            </a>
            <a href="#robot" className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-2">
              <span className="text-3xl">🤖</span>
              <span>Robot</span>
            </a>
            <a href="#core-values" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-6 rounded-2xl font-bold text-xl transition shadow-lg hover:shadow-xl flex flex-col items-center gap-2">
              <span className="text-3xl">⭐</span>
              <span>Core Values</span>
            </a>
          </div>
        </div>
      </section>

      {/* Innovation Section - GridLock Project */}
      <section id="innovation" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              INNOVATION PROJECT
            </div>
            <h2 className="text-4xl font-bold mb-4">GridLock: The Problem</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Traditional archaeological gridding methods are slow, inaccurate, and require multiple workers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-3">Time Consuming</h3>
              <p className="text-gray-400">
                Setting up excavation grids manually takes 20+ minutes with traditional methods using string and stakes.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-3">Labor Intensive</h3>
              <p className="text-gray-400">
                Requires at least 2 people to set up, taking valuable team members away from actual excavation work.
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="text-4xl mb-4">📐</div>
              <h3 className="text-xl font-semibold mb-3">Accuracy Issues</h3>
              <p className="text-gray-400">
                Manual string measurements lead to inconsistent grid squares, affecting the precision of artifact documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/img_12_1.jpeg"
                alt="GridLock Product"
                width={600}
                height={450}
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold shadow-lg">
                $199.99
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Meet <span className="text-yellow-500">GridLock</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                GridLock is a portable, precision gridding tool that uses laser technology and
                adjustable legs to create perfect excavation grids in minutes, not hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5-Minute Setup</h4>
                    <p className="text-gray-600">1 person can set up a perfect grid in under 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Laser Precision</h4>
                    <p className="text-gray-600">4 integrated lasers project perfectly aligned grid lines</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fully Portable</h4>
                    <p className="text-gray-600">Lightweight aluminum frame with telescoping legs for any terrain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Engineered with precision and built for the field
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-yellow-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔦</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">4 Laser Emitters</h3>
              <p className="text-gray-600 text-sm">
                Project precise grid lines onto any surface for accurate excavation zones
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-amber-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Bubble Levels</h3>
              <p className="text-gray-600 text-sm">
                Integrated levels ensure the frame is perfectly horizontal on uneven terrain
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📏</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Telescoping Legs</h3>
              <p className="text-gray-600 text-sm">
                Adjustable height legs adapt to any ground conditions and excavation depth
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏗️</span>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Aluminum Frame</h3>
              <p className="text-gray-600 text-sm">
                Lightweight yet durable construction with 3D-printed precision brackets
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Iteration Section */}
      <section id="iterations" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Design Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              7 iterations of continuous improvement led to the final GridLock design
            </p>
          </div>

          {/* Iteration Diagram */}
          <div className="mb-16">
            <Image
              src="/images/img_63_2.jpeg"
              alt="GridLock Iteration Process - 7 versions from concept to final product"
              width={1400}
              height={600}
              className="w-full h-auto rounded-2xl shadow-xl"
            />
          </div>

          {/* Iteration Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <div className="text-yellow-600 font-bold text-sm mb-2">ITERATION 1-2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Concept & Wood Frame</h4>
              <p className="text-gray-600 text-sm">Initial sketches and wooden prototype to test basic structure</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 border-2 border-amber-200">
              <div className="text-amber-600 font-bold text-sm mb-2">ITERATION 3</div>
              <h4 className="font-semibold text-gray-900 mb-2">PVC Pipes</h4>
              <p className="text-gray-600 text-sm">Lightweight PVC frame for portability testing</p>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 border-2 border-yellow-300">
              <div className="text-yellow-700 font-bold text-sm mb-2">ITERATION 4-5</div>
              <h4 className="font-semibold text-gray-900 mb-2">Aluminum Extrusion</h4>
              <p className="text-gray-600 text-sm">Professional aluminum frame with battery pack integration</p>
            </div>
            <div className="bg-amber-100 rounded-xl p-6 border-2 border-amber-300">
              <div className="text-amber-700 font-bold text-sm mb-2">ITERATION 6-7</div>
              <h4 className="font-semibold text-gray-900 mb-2">Final Refinements</h4>
              <p className="text-gray-600 text-sm">Improved threading and 3D-printed brackets for precision</p>
            </div>
          </div>

          {/* Build Process Photos */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/images/img_30_1.jpeg" alt="Early prototype" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/images/img_25_1.jpeg" alt="PVC iteration" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/images/img_27_1.jpeg" alt="3D printed bracket" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image src="/images/img_41_1.jpeg" alt="Final product with lasers" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600">Five simple steps to perfect excavation grids</p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {howItWorksSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Demo QR Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">See GridLock in Action</h2>
              <p className="text-gray-300 text-lg max-w-md">
                Scan the QR code to watch our product demonstration and see how GridLock transforms archaeological excavation.
              </p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <Image
                src="/images/QR.png"
                alt="Product Demo QR Code"
                width={180}
                height={180}
                className="w-40 h-40 md:w-44 md:h-44"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Real Impact</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Trusted by archaeology professionals and field-tested at real excavation sites
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-yellow-600 mb-2">75%</div>
              <p className="text-gray-600">Time Savings on Grid Setup</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-amber-500 mb-2">1</div>
              <p className="text-gray-600">Person Instead of 2 Required</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">$40</div>
              <p className="text-gray-600">Materials Cost to Build</p>
            </div>
          </div>

          {/* Expert Testimonials */}
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Expert Endorsements</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-28 h-28 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg">
                  <Image
                    src="/images/img_44_2.jpeg"
                    alt="Dr. Barbara Mills"
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 italic mb-4">
                  &ldquo;An innovative approach to a common challenge in field archaeology.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Dr. Barbara Mills</p>
                <p className="text-sm text-gray-500">Professor of Anthropology</p>
                <p className="text-sm text-gray-500">Arizona State University</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg">
                  <Image
                    src="/images/img_45_1.jpeg"
                    alt="Lisa Sonnenburg"
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 italic mb-4">
                  &ldquo;This tool could significantly streamline excavation documentation.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Lisa Sonnenburg</p>
                <p className="text-sm text-gray-500">Cultural Resource Management Advisor</p>
                <p className="text-sm text-gray-500">Parks Canada</p>
              </div>
              <div className="text-center">
                <div className="w-28 h-28 rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg">
                  <Image
                    src="/images/img_46_2.jpeg"
                    alt="Ramsay Macfie"
                    fill
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-gray-600 italic mb-4">
                  &ldquo;A practical solution that addresses real needs in the field.&rdquo;
                </blockquote>
                <p className="font-semibold text-gray-900">Ramsay Macfie</p>
                <p className="text-sm text-gray-500">Archaeological Field Supervisor</p>
                <p className="text-sm text-gray-500">AECOM Ontario</p>
              </div>
            </div>
          </div>

          {/* Innovation Gallery */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Innovation Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_1_1.jpeg", alt: "Team brainstorming" },
                { src: "/images/img_2_1.jpeg", alt: "Building process" },
                { src: "/images/img_3_1.jpeg", alt: "GridLock assembly" },
                { src: "/images/img_26_1.jpeg", alt: "Field testing" },
                { src: "/images/img_28_2.jpeg", alt: "Outdoor testing" },
                { src: "/images/img_12_1.jpeg", alt: "Final product" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Robot Section */}
      <section id="robot" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-amber-400 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              ROBOT DESIGN
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Our Robot</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Precision engineering meets creative problem-solving
            </p>
          </div>

          {/* Mission Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-500 mb-2">545</div>
              <p className="text-gray-600 font-medium">Max Points</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-amber-200">
              <div className="text-4xl font-bold text-amber-500 mb-2">15</div>
              <p className="text-gray-600 font-medium">Missions</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-yellow-200">
              <div className="text-4xl font-bold text-yellow-600 mb-2">2</div>
              <p className="text-gray-600 font-medium">Home Areas</p>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-lg border-2 border-amber-200">
              <div className="text-4xl font-bold text-amber-600 mb-2">6</div>
              <p className="text-gray-600 font-medium">Attachments</p>
            </div>
          </div>

          {/* Robot Photo */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16 max-w-4xl mx-auto">
            <Image
              src="/images/img_10_1.jpeg"
              alt="ConnecTech Robot"
              width={1000}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Attachments */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Attachments</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {robotAttachments.map((attachment, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-xl transition border-2 border-gray-200">
                  <div className="w-20 h-20 rounded-xl overflow-hidden mx-auto mb-3 relative bg-gray-100">
                    <Image
                      src={attachment.image}
                      alt={attachment.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{attachment.name}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Coding Approach */}
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Coding Approach</h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🧭</span>
                </div>
                <h4 className="font-semibold mb-2">Gyro Sensor Navigation</h4>
                <p className="text-gray-400 text-sm">We use gyro sensors instead of color sensors since there are only 3 black and white lines on the mat</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📐</span>
                </div>
                <h4 className="font-semibold mb-2">Precision Movements</h4>
                <p className="text-gray-400 text-sm">Every motor rotation is calculated for exact positioning</p>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔄</span>
                </div>
                <h4 className="font-semibold mb-2">Iterative Testing</h4>
                <p className="text-gray-400 text-sm">We test, measure, adjust, and repeat until perfect</p>
              </div>
              <div className="text-center">
                <div className="bg-amber-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="font-semibold mb-2">Mission Optimization</h4>
                <p className="text-gray-400 text-sm">Strategic run planning to maximize points per trip</p>
              </div>
            </div>
          </div>

          {/* Robot Gallery */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Robot Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_10_1.jpeg", alt: "Robot with attachments" },
                { src: "/images/img_30_1.jpeg", alt: "Robot building" },
                { src: "/images/img_25_1.jpeg", alt: "Robot testing" },
                { src: "/images/img_27_1.jpeg", alt: "Robot details" },
                { src: "/images/img_41_1.jpeg", alt: "Robot in action" },
                { src: "/images/img_29_2.jpeg", alt: "Robot missions" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section id="core-values" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-100 to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block bg-yellow-500 text-black text-sm font-semibold px-4 py-1 rounded-full mb-4">
              CORE VALUES
            </div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What We Stand For</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The FLL Core Values guide everything we do
            </p>
          </div>

          {/* Core Values Gear/Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {coreValues.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition border-2 border-yellow-200 hover:border-yellow-400">
                <div className="text-4xl mb-3">{value.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.name}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>

          {/* Team Members with Core Values */}
          <div id="team" className="mb-16 scroll-mt-28">
            <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">Meet the ConnecTech Family</h3>
            <p className="text-lg text-gray-600 mb-8 text-center">8 innovative students from Bayview Glen School, grades 6-8</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-xl transition">
                  <div className="aspect-square rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg w-24 h-24">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
                  <p className="text-yellow-600 font-bold">{member.coreValue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values Gallery */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Values Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { src: "/images/img_11_1.jpeg", alt: "Team together" },
                { src: "/images/img_1_1.jpeg", alt: "Teamwork in action" },
                { src: "/images/cv.jpg", alt: "Team presenting" },
                { src: "/images/cv2.jpg", alt: "Team in classroom" },
                { src: "/images/cv3.jpg", alt: "Team outdoors" },
                { src: "/images/cv4.jpg", alt: "Team fun" },
              ].map((image, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden group shadow-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Team Cheer */}
          <div className="bg-yellow-400 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Team Cheer</h3>
            <div className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow-lg">
              <p className="text-xl font-semibold text-gray-800 leading-relaxed">
                &ldquo;ConnecTech Family<br />
                I&apos;ve got all my teammates with me<br />
                ConnecTech Family<br />
                <span className="text-yellow-600 font-bold">Building robots in unity!&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-yellow-400">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Get In Touch</h2>
          <p className="text-xl text-gray-700 mb-8">
            Interested in GridLock or want to learn more about our team?
          </p>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">School</h3>
                <p className="text-gray-600">Bayview Glen School</p>
                <p className="text-gray-600">Toronto, Ontario, Canada</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Team</h3>
                <p className="text-gray-600">ConnecTech #27757</p>
                <p className="text-gray-600">FIRST LEGO League Challenge</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                <span className="font-semibold">Product:</span> GridLock - Precision Gridding Tool
              </p>
              <p className="text-2xl font-bold text-yellow-500 mt-2">$199.99</p>
            </div>
          </div>
        </div>
      </section>

      {/* Survey Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">We Value Your Feedback</h2>
          <p className="text-lg text-gray-600 mb-8">
            Help us improve GridLock by sharing your thoughts!
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg"
          >
            Take Our Survey
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-yellow-400">ConnecTech</span>
              <span className="text-gray-500 ml-2">#27757</span>
            </div>
            <div className="text-gray-400 text-sm">
              FIRST LEGO League Challenge 2025 - Unearthed
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p>Built with innovation by ConnecTech Team at Bayview Glen School</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
