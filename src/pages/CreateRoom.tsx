import { CreateRoomForm } from "@/components/ui/createRoomForm"
import { RoomList } from "@/components/ui/roomList"

export function CreateRoom() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.08),transparent_50%)]" />
      
      <div className="relative px-4 py-12">
        <div className="mx-auto max-w-6xl mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium">Análise inteligente de gravações</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Let me ask!
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Transforme seus áudios em conhecimento. Grave, pergunte e descubra insights sobre o assunto.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div className="order-2 lg:order-1">
              <CreateRoomForm/>
            </div>
            
            <div className="order-1 lg:order-2">
              <RoomList />
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/5 rounded-full blur-xl animate-pulse delay-1000" />
      </div>
    </div>
  )
}