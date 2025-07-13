import { useRoomQuestions } from '../http/useRoomQuestions'
import { QuestionItem } from '../components/questionItem'
import { MessageSquare, Brain, BotMessageSquare } from 'lucide-react'

interface QuestionListProps {
  roomId: string
}

export function QuestionList(props: QuestionListProps) {
  const { data } = useRoomQuestions(props.roomId)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-purple-900/30">
            <Brain className="size-5 text-green-400" />
          </div>
          <h2 className="font-semibold text-2xl text-white">
            Conversas Inteligentes
          </h2>
        </div>
        
        {data && data.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <BotMessageSquare className="size-4 text-green-400" />
            <span className="text-green-300 text-sm font-medium">{data.length} conversas</span>
          </div>
        )}
      </div>

      {!data || data.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
            <MessageSquare className="size-8 text-purple-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Nenhuma pergunta ainda</h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Comece fazendo uma pergunta sobre seus áudios. A IA analisará o conteúdo e fornecerá respostas inteligentes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((question) => (
            <QuestionItem key={question.id} question={question} />
          ))}
        </div>
      )}
    </div>
  )
}