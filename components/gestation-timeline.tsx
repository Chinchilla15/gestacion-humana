"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import Image from "next/image"

export default function GestationTimeline() {
  const [currentWeek, setCurrentWeek] = useState(12)

  const weekData = {
    4: {
      title: "Semana 4",
      description: "El embrión ahora mide aproximadamente 1/25 de pulgada. El tubo neural se está formando.",
      size: "Semilla de amapola",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "El corazón y otros órganos comienzan a formarse",
        "El tubo neural se desarrolla en cerebro y médula espinal",
        "Los brotes de brazos y piernas comienzan a formarse",
      ],
    },
    8: {
      title: "Semana 8",
      description:
        "Ahora llamado feto, mide aproximadamente 1/2 pulgada. Todos los órganos esenciales han comenzado a formarse.",
      size: "Frijol",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los dedos de manos y pies se están formando",
        "El corazón late con un ritmo regular",
        "El cerebro se desarrolla rápidamente",
      ],
    },
    12: {
      title: "Semana 12",
      description: "El feto ahora mide aproximadamente 2,5 pulgadas y pesa alrededor de 0,5 onzas.",
      size: "Lima",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los reflejos se están desarrollando",
        "Los genitales externos comienzan a mostrar el género",
        "Puede hacer movimientos de succión",
      ],
    },
    16: {
      title: "Semana 16",
      description: "El feto mide aproximadamente 4-5 pulgadas y pesa alrededor de 3-4 onzas.",
      size: "Aguacate",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los músculos faciales se desarrollan - puede hacer expresiones",
        "El esqueleto se está formando",
        "Puede escuchar sonidos desde fuera del útero",
      ],
    },
    20: {
      title: "Semana 20",
      description: "El feto mide aproximadamente 6 pulgadas y pesa alrededor de 9 onzas.",
      size: "Plátano",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Se pueden sentir movimientos activos (quickening)",
        "El cabello está creciendo en la cabeza",
        "Las huellas dactilares se están formando",
      ],
    },
    24: {
      title: "Semana 24",
      description: "El feto mide aproximadamente 11-14 pulgadas y pesa alrededor de 1,5 libras.",
      size: "Maíz",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los pulmones se están desarrollando pero no están maduros",
        "Las papilas gustativas se están formando",
        "El crecimiento cerebral es muy rápido",
      ],
    },
    28: {
      title: "Semana 28",
      description: "El feto mide aproximadamente 14-16 pulgadas y pesa alrededor de 2,5 libras.",
      size: "Berenjena",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los ojos pueden abrirse y cerrarse",
        "Continúa el rápido desarrollo cerebral",
        "Puede tener hipo en el útero",
      ],
    },
    32: {
      title: "Semana 32",
      description: "El feto mide aproximadamente 16-18 pulgadas y pesa alrededor de 4 libras.",
      size: "Jícama",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Practica movimientos respiratorios",
        "Gana peso rápidamente",
        "Puede responder a la luz, el sonido y el tacto",
      ],
    },
    36: {
      title: "Semana 36",
      description: "El feto mide aproximadamente 17-19 pulgadas y pesa alrededor de 6 libras.",
      size: "Melón",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Los pulmones están casi maduros",
        "Generalmente posicionado con la cabeza hacia abajo",
        "Gana aproximadamente una onza al día",
      ],
    },
    40: {
      title: "Semana 40",
      description: "El feto mide aproximadamente 19-21 pulgadas y pesa alrededor de 7,5 libras.",
      size: "Sandía",
      image: "/placeholder.svg?height=200&width=200",
      facts: [
        "Considerado a término completo",
        "Todos los órganos están desarrollados",
        "Listo para la vida fuera del útero",
      ],
    },
  }

  // Find the closest week in our data
  const getClosestWeek = (week) => {
    const weeks = Object.keys(weekData).map(Number)
    return weeks.reduce((prev, curr) => (Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev))
  }

  const displayWeek = getClosestWeek(currentWeek)
  const data = weekData[displayWeek]

  const handlePrevious = () => {
    const weeks = Object.keys(weekData)
      .map(Number)
      .sort((a, b) => a - b)
    const currentIndex = weeks.indexOf(displayWeek)
    if (currentIndex > 0) {
      setCurrentWeek(weeks[currentIndex - 1])
    }
  }

  const handleNext = () => {
    const weeks = Object.keys(weekData)
      .map(Number)
      .sort((a, b) => a - b)
    const currentIndex = weeks.indexOf(displayWeek)
    if (currentIndex < weeks.length - 1) {
      setCurrentWeek(weeks[currentIndex + 1])
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-3xl">
          <Slider
            value={[currentWeek]}
            min={1}
            max={40}
            step={1}
            onValueChange={(value) => setCurrentWeek(value[0])}
            className="py-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Semana 1</span>
            <span>Semana 10</span>
            <span>Semana 20</span>
            <span>Semana 30</span>
            <span>Semana 40</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevious} disabled={displayWeek === 4}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-lg font-medium">Semana {currentWeek}</span>
          <Button variant="outline" size="icon" onClick={handleNext} disabled={displayWeek === 40}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="aspect-square relative">
            <Image
              src={data.image || "/placeholder.svg"}
              fill
              alt={`Feto en la semana ${displayWeek}`}
              className="object-cover"
            />
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{data.title}</CardTitle>
            <CardDescription className="text-base">{data.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4 text-muted-foreground" />
                Comparación de Tamaño
              </h4>
              <p className="text-lg">{data.size}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Desarrollos Clave</h4>
              <ul className="space-y-1">
                {data.facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
