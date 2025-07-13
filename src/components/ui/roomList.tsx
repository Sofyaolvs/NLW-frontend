import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dayjs } from "../../lib/formatRelativeDate"
import { ArrowRight, Clock, MessageSquare, Folder, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { useRooms } from "@/http/useRooms"

export function RoomList() {
  const { data, isLoading } = useRooms()

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-purple-950">
            <Folder className="size-5 text-green-400" />
          </div>
          <CardTitle className="text-white">Salas Recentes</CardTitle>
        </div>
        <CardDescription className="text-slate-200">
          Acesso rápido para as salas criadas recentemente
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="w-6 h-6 border-2 border-purple-400/20 border-t-purple-400 rounded-full animate-spin mr-3" />
            <p className="text-sm text-slate-400">Carregando salas...</p>
          </div>
        )}

        {!isLoading && data?.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-slate-700/50 to-slate-600/50 flex items-center justify-center mb-3">
              <Folder className="size-6 text-slate-500" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Nenhuma sala criada ainda</p>
            <p className="text-xs text-slate-500">Crie sua primeira sala para começar</p>
          </div>
        )}

        {data?.map((room) => (
          <Link
            to={`/room/${room.id}`}
            key={room.id}
            className="group block"
          >
            <div className="flex items-center justify-between p-4 rounded-lg border border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-800/10  hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="flex-1 flex flex-col gap-2">
                <h3 className="font-medium text-white group-hover:text-purple-100 transition-colors duration-300">
                  {room.name}
                </h3>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50"
                  >
                    <Clock className="size-3 mr-1"  />
                    {dayjs(room.createdAt).fromNow()}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/20"
                  >
                    <MessageSquare className="size-3 mr-1" />
                    {room.questionsCount} perguntas
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-purple-200 transition-colors duration-300">
                <span className="hidden sm:inline">Entrar</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        ))}

        {data && data.length > 0 && (
          <div className="mt-2 pt-3 border-t border-slate-700/30">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Sparkles className="size-3" />
              <span>Respostas por IA</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}