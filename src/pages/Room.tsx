import { ArrowLeft, Radio, Brain } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { QuestionForm } from '../components/questionForm'
import { QuestionList } from '../components/questionList'
import { Button } from '@/components/ui/button'

type RoomParams = {
  roomId: string
}

export function Room() {
  const params = useParams<RoomParams>()

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
  
      
      <div className="relative">
        <div className="container mx-auto max-w-6xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-6 flex items-center justify-between">
              <Link to="/">
                <Button 
                  variant="outline" 
                  className="bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-purple-500/50 hover:text-white transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Voltar
                </Button>
              </Link>
              <Link to={`/room/${params.roomId}/audio`}>
                <Button className="bg-purple-950 text-white shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-purple-500/40">
                  <Radio className="size-4 mr-2 text-green-700" />
                  Gravar Áudio
                </Button>
              </Link>
            </div>

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-300 text-sm">Sala Ativa</span>
              </div>
              
              <h1 className="mb-4 font-bold text-3xl lg:text-4xl bg-purple-300 bg-clip-text text-transparent">
                Central de Perguntas e Respostas
              </h1>
              <p className="text-slate-400 text-lg flex items-center gap-2 justify-center lg:justify-start">
                <Brain className="size-5 text-green-500" />
                Faça perguntas e obtenha respostas inteligentes sobre seus áudios
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <QuestionForm roomId={params.roomId} />
            </div>
            
            <div className="lg:col-span-2">
              <QuestionList roomId={params.roomId} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}