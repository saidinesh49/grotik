import GeminiPlayground from "@/components/gemini-playground"
import Particles from "@/components/magicui/particles"

export default function Home() {
  return (
    <div className="relative min-h-screen dark:bg-black">
      {/* Particles as background */}
      <Particles className="absolute inset-0 z-0" quantity={100} ease={80} color="#ffffff" refresh />

      {/* Main content above particles */}
      <div className="relative z-10">
        <GeminiPlayground />
      </div>
    </div>
  )
}
