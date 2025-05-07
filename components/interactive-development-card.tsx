"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface InteractiveDevelopmentCardProps {
  title: string
  icon: React.ReactNode
  weeks: string
  description: string
  facts: string[]
}

export default function InteractiveDevelopmentCard({
  title,
  icon,
  weeks,
  description,
  facts,
}: InteractiveDevelopmentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{weeks}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-hidden"
            >
              <h4 className="font-medium mb-2">Datos Clave:</h4>
              <ul className="space-y-1">
                {facts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant="ghost" className="w-full justify-between" onClick={() => setIsExpanded(!isExpanded)}>
          <span>{isExpanded ? "Mostrar Menos" : "Mostrar Más"}</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  )
}
