"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon, Bot, User, RefreshCw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Predefined questions and answers about human gestation in Spanish
const predefinedQA = [
  {
    id: 1,
    question: "¿Cómo se calcula la fecha de parto?",
    answer:
      "La fecha de parto se calcula típicamente añadiendo 280 días (40 semanas) al primer día de tu último período menstrual. Esto se conoce como la regla de Naegele. Sin embargo, solo alrededor del 5% de los embarazos realmente dan a luz en la fecha exacta prevista. La mayoría de los bebés nacen dentro de una semana antes o después de la fecha estimada.",
  },
  {
    id: 2,
    question: "¿Cuándo comienza a latir el corazón?",
    answer:
      "El corazón del bebé comienza a formarse alrededor de la semana 5 del embarazo y comienza a latir alrededor de la semana 6. Para la semana 8, el corazón late a un ritmo constante de aproximadamente 110-160 latidos por minuto, que a menudo se puede detectar durante un examen de ultrasonido.",
  },
  {
    id: 3,
    question: "¿Cuándo se puede determinar el sexo del bebé?",
    answer:
      "Los órganos sexuales del bebé comienzan a desarrollarse alrededor de la semana 7, pero los genitales externos no son típicamente distinguibles hasta alrededor de las semanas 18-20. Es cuando la mayoría de los padres descubren el sexo de su bebé durante el ultrasonido de mitad del embarazo (exploración anatómica). Sin embargo, métodos de pruebas genéticas como NIPT (Prueba Prenatal No Invasiva) pueden determinar el sexo tan temprano como a las 10 semanas.",
  },
  {
    id: 4,
    question: "¿Cuándo puede la madre sentir al bebé moverse?",
    answer:
      "Las madres primerizas típicamente sienten los movimientos del bebé (llamados 'quickening') entre las semanas 18-25 del embarazo. Las mujeres que han estado embarazadas antes pueden notar movimientos antes, a veces tan temprano como a las 16 semanas. Inicialmente, estos movimientos se sienten como aleteos, burbujas o golpecitos ligeros. A medida que el bebé crece, los movimientos se vuelven más fuertes y distintos.",
  },
  {
    id: 5,
    question: "¿Cómo funciona la placenta?",
    answer:
      "La placenta es un órgano temporal que se desarrolla durante el embarazo para proporcionar oxígeno y nutrientes al bebé en crecimiento mientras elimina los productos de desecho. Se adhiere a la pared uterina y se conecta al bebé a través del cordón umbilical. La placenta también produce hormonas que apoyan el embarazo y actúa como una barrera para proteger al bebé de ciertas infecciones y sustancias nocivas. Sin embargo, algunas sustancias como el alcohol, ciertas drogas y algunos medicamentos pueden atravesar la placenta.",
  },
  {
    id: 6,
    question: "¿Cuáles son los tres trimestres del embarazo?",
    answer:
      "El embarazo se divide en tres trimestres, cada uno con una duración de aproximadamente 12-14 semanas. El primer trimestre (semanas 1-12) implica el rápido desarrollo de todos los órganos principales. El segundo trimestre (semanas 13-27) a menudo se llama el 'período dorado' ya que muchos síntomas del embarazo temprano disminuyen y los movimientos del bebé se vuelven notables. El tercer trimestre (semanas 28-40) se centra en el crecimiento del bebé y la preparación para el nacimiento a medida que los órganos maduran y el bebé gana peso.",
  },
  {
    id: 7,
    question: "¿Cuándo maduran los pulmones del bebé?",
    answer:
      "Los pulmones del bebé comienzan a desarrollarse alrededor de la semana 4 del embarazo, pero son uno de los últimos órganos en madurar completamente. Alrededor de las semanas 24-28, los pulmones comienzan a producir surfactante, una sustancia que permite que los sacos de aire se inflen y evita que colapsen. Para las semanas 35-36, la mayoría de los bebés tienen suficiente madurez pulmonar para respirar por sí mismos, aunque los bebés nacidos antes pueden necesitar apoyo respiratorio. La maduración pulmonar completa continúa incluso después del nacimiento.",
  },
  {
    id: 8,
    question: "¿Cómo obtiene el bebé nutrientes en el útero?",
    answer:
      "El bebé recibe nutrientes a través del cordón umbilical, que se conecta a la placenta. La sangre de la madre transporta nutrientes y oxígeno a la placenta, donde pasan a través de una membrana delgada hacia el torrente sanguíneo del bebé. El bebé no come a través de su boca ni digiere alimentos en el útero. En cambio, todos los nutrientes necesarios, incluidos glucosa, proteínas, grasas, vitaminas y minerales, se entregan directamente en su torrente sanguíneo desde el suministro de sangre de la madre a través de la placenta.",
  },
]

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function GestationChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "¡Hola! Soy tu Guía de Gestación. Hazme preguntas sobre el embarazo y el desarrollo fetal.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport=""]')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages])

  const handleQuestionClick = (question: string) => {
    setSelectedQuestion(question)

    // Add user question to chat
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: question,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])

    // Find the answer for the selected question
    const qaItem = predefinedQA.find((item) => item.question === question)

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: qaItem?.answer || "No tengo información sobre eso todavía.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      setSelectedQuestion(null) // Reset selected question
    }, 1000)
  }

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "¡Hola! Soy tu Guía de Gestación. Hazme preguntas sobre el embarazo y el desarrollo fetal.",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-gradient-to-r from-rose-50 to-sky-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-primary">
              <Bot className="h-4 w-4 text-primary-foreground" />
            </Avatar>
            <CardTitle className="text-lg">Guía de Gestación</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={resetChat} title="Reiniciar chat">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <ScrollArea ref={scrollAreaRef} className="h-[400px] p-4">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="flex items-start gap-2 max-w-[80%]">
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 mt-1 bg-primary">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 mt-1 bg-primary">
                      <User className="h-4 w-4 text-primary-foreground" />
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>
      <CardFooter className="flex flex-col gap-4 p-4 border-t">
        <div className="flex flex-wrap gap-2">
          {predefinedQA.map((qa) => (
            <Button
              key={qa.id}
              variant="outline"
              size="sm"
              className="text-xs"
              disabled={selectedQuestion !== null}
              onClick={() => handleQuestionClick(qa.question)}
            >
              {qa.question}
            </Button>
          ))}
        </div>
        <div className="flex w-full gap-2">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Escribe tu pregunta (o haz clic en una sugerencia arriba)"
            disabled
          />
          <Button size="icon" disabled>
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
