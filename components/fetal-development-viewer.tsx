"use client"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, useGLTF, Html, PerspectiveCamera } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Info, RotateCcw, Maximize2 } from "lucide-react"

// For demonstration purposes, we'll use the sample duck model
// In a real application, you would use actual fetal development models
function Model({ week, ...props }) {
  // In a real implementation, you would load different models based on the week
  // const { scene } = useGLTF("/assets/3d/duck.glb")

  // Scale the model based on the gestational week to show growth
  const scale = 0.5 + (week / 40) * 1.5

  // Rotate the model slowly
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // return <primitive ref={ref} object={scene} scale={scale} position={[0, -0.5, 0]} {...props} />
}

function WeekLabel({ week }) {
  const { camera } = useThree()

  return (
    <Html position={[0, 1.5, 0]} center distanceFactor={10} sprite transform occlude>
      <div className="px-2 py-1 rounded-full bg-white/90 shadow-md text-sm font-medium">Semana {week}</div>
    </Html>
  )
}

function DevelopmentInfo({ week, onClose }) {
  // Development information for different weeks
  const weekInfo = {
    8: {
      title: "Semana 8",
      facts: [
        "Aproximadamente 1,5 cm de largo",
        "Los dedos de manos y pies se están formando",
        "El corazón late con un ritmo regular",
        "El cerebro se desarrolla rápidamente",
      ],
    },
    12: {
      title: "Semana 12",
      facts: [
        "Aproximadamente 6,3 cm de largo",
        "Los reflejos se están desarrollando",
        "Los genitales externos comienzan a mostrar el género",
        "Puede hacer movimientos de succión",
      ],
    },
    16: {
      title: "Semana 16",
      facts: [
        "Aproximadamente 10-12,7 cm de largo",
        "Los músculos faciales se desarrollan - puede hacer expresiones",
        "El esqueleto se está formando",
        "Puede escuchar sonidos desde fuera del útero",
      ],
    },
    20: {
      title: "Semana 20",
      facts: [
        "Aproximadamente 15,2 cm de largo",
        "Se pueden sentir movimientos activos (quickening)",
        "El cabello está creciendo en la cabeza",
        "Las huellas dactilares se están formando",
      ],
    },
    24: {
      title: "Semana 24",
      facts: [
        "Aproximadamente 28-35,6 cm de largo",
        "Los pulmones se están desarrollando pero no están maduros",
        "Las papilas gustativas se están formando",
        "El crecimiento cerebral es muy rápido",
      ],
    },
    28: {
      title: "Semana 28",
      facts: [
        "Aproximadamente 35,6-40,6 cm de largo",
        "Los ojos pueden abrirse y cerrarse",
        "Continúa el rápido desarrollo cerebral",
        "Puede tener hipo en el útero",
      ],
    },
    32: {
      title: "Semana 32",
      facts: [
        "Aproximadamente 40,6-45,7 cm de largo",
        "Practica movimientos respiratorios",
        "Gana peso rápidamente",
        "Puede responder a la luz, el sonido y el tacto",
      ],
    },
    36: {
      title: "Semana 36",
      facts: [
        "Aproximadamente 43,2-48,3 cm de largo",
        "Los pulmones están casi maduros",
        "Generalmente posicionado con la cabeza hacia abajo",
        "Gana aproximadamente 28 gramos al día",
      ],
    },
    40: {
      title: "Semana 40",
      facts: [
        "Aproximadamente 48,3-53,3 cm de largo",
        "Considerado a término completo",
        "Todos los órganos están desarrollados",
        "Listo para la vida fuera del útero",
      ],
    },
  }

  const info = weekInfo[week] || weekInfo[8]

  return (
    <Html position={[2, 0, 0]} transform>
      <Card className="w-64 bg-white/90 backdrop-blur-sm shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">{info.title}</h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={onClose}>
              ×
            </Button>
          </div>
          <ul className="space-y-1 text-sm">
            {info.facts.map((fact, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Html>
  )
}

export default function FetalDevelopmentViewer() {
  const [week, setWeek] = useState(20)
  const [showInfo, setShowInfo] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef(null)

  const weeks = [8, 12, 16, 20, 24, 28, 32, 36, 40]

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error al intentar habilitar pantalla completa: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl overflow-hidden border border-slate-200 shadow-md transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 bg-white" : "h-[500px]"
      }`}
    >
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <Suspense
          fallback={
            <Html center>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-4 w-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div
                  className="h-4 w-4 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="h-4 w-4 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </Html>
          }
        >
          <Model week={week} />
          <WeekLabel week={week} />
          {showInfo && <DevelopmentInfo week={week} onClose={() => setShowInfo(false)} />}
          <Environment preset="apartment" />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} minDistance={2} maxDistance={10} />
        </Suspense>
      </Canvas>

      {/* Controls overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-white/80">
                Semana {week}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 bg-white/80"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="h-7 w-7 bg-white/80" onClick={toggleFullscreen}>
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 bg-white/80"
                onClick={() => {
                  const controls = document.querySelector(".canvas-container canvas")
                  if (controls) {
                    controls.style.transform = "rotate(0deg)"
                  }
                }}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="w-full">
            <Slider
              value={[week]}
              min={8}
              max={40}
              step={4}
              onValueChange={(value) => setWeek(value[0])}
              className="py-1"
            />
          </div>

          <div className="flex justify-between">
            {weeks.map((w) => (
              <Button
                key={w}
                variant={week === w ? "secondary" : "ghost"}
                size="sm"
                className={`px-2 py-1 h-auto text-xs ${week === w ? "bg-white/90" : "bg-white/50 hover:bg-white/70"}`}
                onClick={() => setWeek(w)}
              >
                {w}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
