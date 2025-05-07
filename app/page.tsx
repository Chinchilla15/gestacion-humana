import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Info, Calendar, Baby, Heart, Brain, Eye, TreesIcon as Lungs } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import GestationTimeline from "@/components/gestation-timeline"
import InteractiveDevelopmentCard from "@/components/interactive-development-card"
import TrimesterSection from "@/components/trimester-section"
import GestationChatbot from "@/components/gestation-chatbot"
import ThreeScene from "@/components/ThreeScene"

export default function GestationLearningPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-rose-50 to-sky-50 py-20 md:py-28">
        <div className=" px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Entendiendo la Gestación Humana
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Un viaje interactivo a través de las 40 semanas de embarazo y desarrollo fetal.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#interactive-timeline" passHref>
                  <Button size="lg" className="gap-1">
                    Comenzar Viaje <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-1">
                  <Info className="h-4 w-4" /> Saber Más
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-8 border-white shadow-xl sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
                <ThreeScene />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section id="interactive-timeline" className="w-full py-12 md:py-24 lg:py-32">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">El Viaje de la Vida</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora el extraordinario viaje de 40 semanas desde la concepción hasta el nacimiento.
              </p>
            </div>
          </div>
          <div className="mt-16">
            <GestationTimeline />
          </div>
        </div>
      </section>

      {/* Trimester Breakdown */}
      <section className="w-full py-12 md:py-24">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Trimestre por Trimestre</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre los desarrollos y cambios clave durante cada etapa del embarazo.
              </p>
            </div>
          </div>

          <Tabs defaultValue="first" className="mt-12">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="first">Primer Trimestre</TabsTrigger>
              <TabsTrigger value="second">Segundo Trimestre</TabsTrigger>
              <TabsTrigger value="third">Tercer Trimestre</TabsTrigger>
            </TabsList>
            <TabsContent value="first" className="mt-6">
              <TrimesterSection
                title="Primer Trimestre (Semanas 1-12)"
                description="Los cambios más dramáticos y el desarrollo ocurren durante el primer trimestre."
                image="/placeholder.svg?height=300&width=500"
                weeks={12}
                currentWeek={12}
                keyPoints={[
                  "Todos los órganos principales comienzan a formarse",
                  "El corazón comienza a latir alrededor de la semana 6",
                  "El cerebro y el tubo neural se desarrollan",
                  "Aparecen los brotes de extremidades y comienzan a formar brazos y piernas",
                  "Para la semana 12, el feto mide aproximadamente 6,3 cm",
                ]}
              />
            </TabsContent>
            <TabsContent value="second" className="mt-6">
              <TrimesterSection
                title="Segundo Trimestre (Semanas 13-27)"
                description="La fase media del embarazo a menudo se llama el 'período dorado'."
                image="/placeholder.svg?height=300&width=500"
                weeks={15}
                currentWeek={27}
                keyPoints={[
                  "Se pueden sentir los movimientos (quickening)",
                  "El sexo puede determinarse mediante ultrasonido",
                  "Se forman las huellas dactilares",
                  "Se desarrolla la audición y el bebé responde a los sonidos",
                  "Para la semana 27, el bebé mide aproximadamente 35,6 cm",
                ]}
              />
            </TabsContent>
            <TabsContent value="third" className="mt-6">
              <TrimesterSection
                title="Tercer Trimestre (Semanas 28-40)"
                description="La recta final mientras el bebé se prepara para la vida fuera del útero."
                image="/placeholder.svg?height=300&width=500"
                weeks={13}
                currentWeek={40}
                keyPoints={[
                  "Continúa el rápido desarrollo cerebral",
                  "Los pulmones maduran y se preparan para respirar",
                  "El bebé gana peso significativo",
                  "Se coloca en posición de nacimiento (generalmente cabeza abajo)",
                  "Se considera a término completo entre las semanas 39-40",
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Interactive Development Cards */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Hitos del Desarrollo Fetal
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora los hitos clave del desarrollo durante todo el embarazo.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            <InteractiveDevelopmentCard
              title="Desarrollo del Corazón"
              icon={<Heart className="h-8 w-8 text-rose-500" />}
              weeks="Semanas 5-9"
              description="El corazón comienza como un tubo que se pliega y divide en cámaras, comenzando a latir alrededor de la semana 6."
              facts={[
                "Late 110-160 veces por minuto",
                "Se puede detectar en ultrasonido en la semana 6-7",
                "Corazón de cuatro cámaras completamente formado para la semana 9",
              ]}
            />

            <InteractiveDevelopmentCard
              title="Formación del Cerebro"
              icon={<Brain className="h-8 w-8 text-violet-500" />}
              weeks="Semanas 3-40"
              description="El desarrollo cerebral comienza en las primeras semanas y continúa durante todo el embarazo y después del nacimiento."
              facts={[
                "El tubo neural se forma en las semanas 3-4",
                "El cerebro se divide en tres partes principales para la semana 7",
                "Crecimiento rápido en el tercer trimestre",
              ]}
            />

            <InteractiveDevelopmentCard
              title="Desarrollo de los Ojos"
              icon={<Eye className="h-8 w-8 text-blue-500" />}
              weeks="Semanas 4-28"
              description="Los ojos comienzan a formarse en la semana 4 y continúan desarrollándose durante todo el embarazo."
              facts={[
                "Los nervios ópticos se conectan al cerebro para la semana 8",
                "Los párpados se forman y se fusionan alrededor de la semana 11",
                "Se reabren alrededor de la semana 28",
              ]}
            />

            <InteractiveDevelopmentCard
              title="Maduración Pulmonar"
              icon={<Lungs className="h-8 w-8 text-cyan-500" />}
              weeks="Semanas 4-36"
              description="Los pulmones son uno de los últimos órganos en madurar completamente, preparándose para respirar aire después del nacimiento."
              facts={[
                "Las vías respiratorias comienzan a formarse en la semana 4",
                "La producción de surfactante comienza alrededor de la semana 24",
                "Generalmente lo suficientemente maduros para respirar en la semana 36",
              ]}
            />

            <InteractiveDevelopmentCard
              title="Patrones de Crecimiento"
              icon={<Baby className="h-8 w-8 text-emerald-500" />}
              weeks="Semanas 1-40"
              description="Desde una sola célula hasta un bebé a término completo, el crecimiento sigue patrones predecibles."
              facts={[
                "Semana 10: 3 cm, peso de una fresa",
                "Semana 20: 25 cm, peso de un plátano",
                "Semana 40: 45-55 cm, promedio 3,4 kg",
              ]}
            />

            <InteractiveDevelopmentCard
              title="Cronología del Desarrollo"
              icon={<Calendar className="h-8 w-8 text-amber-500" />}
              weeks="Semanas 1-40"
              description="Hitos clave en el desarrollo fetal a lo largo del viaje del embarazo."
              facts={[
                "Semana 8: Todos los órganos esenciales han comenzado a formarse",
                "Semana 16: El bebé puede hacer movimientos de succión",
                "Semana 32: El bebé practica movimientos respiratorios",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Chatbot Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Pregunta a la Guía de Gestación
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                ¿Tienes preguntas sobre el embarazo y el desarrollo fetal? Nuestra Guía de Gestación tiene respuestas.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <GestationChatbot />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      {/* <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Recursos Educativos</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestra colección de recursos para aprender más sobre la gestación humana y el desarrollo fetal.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="sm:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Biblioteca de Videos</CardTitle>
                <CardDescription>Videos educativos seleccionados sobre embarazo y desarrollo fetal</CardDescription>
              </CardHeader>
            </Card>

            <Card className="sm:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Artículos Científicos</CardTitle>
                <CardDescription>
                  Recursos académicos e investigaciones recientes sobre desarrollo humano
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="sm:col-span-1 lg:col-span-1">
              <CardHeader>
                <CardTitle>Herramientas Interactivas</CardTitle>
                <CardDescription>Herramientas y calculadoras para el embarazo y desarrollo fetal</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6">
        <div className=" flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Universidad Evangélica de El Salvador.
          </p>
        </div>
      </footer>
    </div>
  )
}
