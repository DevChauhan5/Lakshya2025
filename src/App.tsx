import Navbar from "./components/layout/Navbar";
import PageBackground from "./components/layout/PageBackground";
import SmoothScroll from "./components/providers/SmoothScroll";
import About from "./components/sections/About";
import Hero from "./components/sections/Hero";

function App() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-hidden">
        <PageBackground />
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
        </div>
      </main>
    </SmoothScroll>
  );
}

export default App;
