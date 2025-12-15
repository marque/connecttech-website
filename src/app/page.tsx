import Image from "next/image";

export default function Home() {
  const teamMembers = [
    { name: "Luke LIDAR", role: "Navigation Expert", image: "/images/img_58_1.jpeg" },
    { name: "Grace Grid", role: "Precision Engineer", image: "/images/img_56_1.jpeg" },
    { name: "Salima Sand", role: "Excavation Specialist", image: "/images/img_55_1.jpeg" },
    { name: "Sarina Stone", role: "Materials Expert", image: "/images/img_57_1.jpeg" },
    { name: "Naya Natural", role: "Environmental Lead", image: "/images/img_62_1.jpeg" },
    { name: "Ivan Identify", role: "Documentation Chief", image: "/images/img_59_1.jpeg" },
    { name: "Andrew Artifact", role: "Discovery Specialist", image: "/images/img_60_1.jpeg" },
    { name: "Eric Excavate", role: "Field Operations", image: "/images/img_61_1.jpeg" },
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
            <div className="hidden md:flex items-center gap-8">
              <a href="#problem" className="text-gray-600 hover:text-yellow-500 transition">Problem</a>
              <a href="#solution" className="text-gray-600 hover:text-yellow-500 transition">Solution</a>
              <a href="#iterations" className="text-gray-600 hover:text-yellow-500 transition">Iterations</a>
              <a href="#impact" className="text-gray-600 hover:text-yellow-500 transition">Impact</a>
              <a href="#team" className="text-gray-600 hover:text-yellow-500 transition">Team</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSfL6Az6NUfGtIhQCmnqRxvvD1POkf6kp_vzjO9Nm2ZvA98IbA/viewform?usp=send_form" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium transition">Survey</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-full mb-4">
                FIRST LEGO League Team #27757
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                Introducing{" "}
                <span className="text-yellow-500">GridLock</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A revolutionary precision gridding tool that transforms archaeological excavation.
                Built by students, designed for professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#solution" className="bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold text-lg transition shadow-lg shadow-yellow-200">
                  Discover GridLock
                </a>
                <a href="#team" className="border-2 border-gray-300 hover:border-yellow-400 text-gray-700 px-8 py-3 rounded-full font-semibold text-lg transition">
                  Meet the Team
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/img_11_1.jpeg"
                  alt="ConnecTech Team"
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                Bayview Glen School
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">The Problem</h2>
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
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">5-Minute Setup</h4>
                    <p className="text-gray-600">1 person can set up a perfect grid in under 5 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Laser Precision</h4>
                    <p className="text-gray-600">4 integrated lasers project perfectly aligned grid lines</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
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
            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <div className="text-green-600 font-bold text-sm mb-2">ITERATION 3</div>
              <h4 className="font-semibold text-gray-900 mb-2">PVC Pipes</h4>
              <p className="text-gray-600 text-sm">Lightweight PVC frame for portability testing</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <div className="text-blue-600 font-bold text-sm mb-2">ITERATION 4-5</div>
              <h4 className="font-semibold text-gray-900 mb-2">Aluminum Extrusion</h4>
              <p className="text-gray-600 text-sm">Professional aluminum frame with battery pack integration</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-purple-600 font-bold text-sm mb-2">ITERATION 6-7</div>
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

      {/* Impact Section */}
      <section id="impact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Real Impact</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Trusted by archaeology professionals and field-tested at real excavation sites
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-yellow-500 mb-2">75%</div>
              <p className="text-gray-600">Time Savings on Grid Setup</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-green-500 mb-2">1</div>
              <p className="text-gray-600">Person Instead of 2 Required</p>
            </div>
            <div className="bg-white rounded-xl p-8 text-center">
              <div className="text-5xl font-bold text-blue-500 mb-2">$40</div>
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
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              8 innovative students from Bayview Glen School, grades 6-8
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-yellow-50 transition group">
                <div className="aspect-[3/4] rounded-xl mx-auto mb-4 overflow-hidden relative shadow-lg group-hover:shadow-xl transition">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src="/images/img_11_1.jpeg"
              alt="ConnecTech Team Photo"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Gallery</h2>
            <p className="text-xl text-gray-400">Our journey building GridLock</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { src: "/images/img_1_1.jpeg", alt: "Team members" },
              { src: "/images/img_2_1.jpeg", alt: "Building process" },
              { src: "/images/img_3_1.jpeg", alt: "GridLock assembly" },
              { src: "/images/img_26_1.jpeg", alt: "Field testing" },
              { src: "/images/img_28_2.jpeg", alt: "Outdoor testing" },
              { src: "/images/img_10_1.jpeg", alt: "Team with robot" },
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
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition shadow-lg"
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
              FIRST LEGO League Challenge 2024 - Submerged
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
