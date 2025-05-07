"use client"

import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

interface TrimesterSectionProps {
  title: string
  description: string
  image: string
  weeks: number
  currentWeek: number
  keyPoints: string[]
}

export default function TrimesterSection({
  title,
  description,
  image,
  weeks,
  currentWeek,
  keyPoints,
}: TrimesterSectionProps) {
  const progressPercentage = (currentWeek / 40) * 100

  return (
    // Changed md:grid-cols-2 to md:grid-cols-1 to make content take full width
    <div className="grid gap-8 md:grid-cols-1">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <p className="text-muted-foreground mt-2">{description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Progreso del Desarrollo</span>
            <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs text-muted-foreground">Semana {currentWeek} de 40</p>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Desarrollos Clave:</h4>
          <ul className="space-y-3">
            {keyPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <span className="text-primary mt-1 font-bold">•</span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Removed the div that previously held the image */}
    </div>
  )
}
