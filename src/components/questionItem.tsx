import { Bot, Loader2, MessageSquare, User, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { dayjs } from '../lib/formatRelativeDate'

interface Question {
  id: string
  question: string
  answer?: string | null
  createdAt: string
  isGeneratingAnswer?: boolean
}

interface QuestionItemProps {
  question: Question
}

export function QuestionItem({ question }: QuestionItemProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300">
      <CardContent className="p-6">
        <div className="space-y-6">

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/20 border-blue-500/30">
                <User className="size-5 text-blue-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <p className="font-medium text-white">Sua Pergunta</p>
              </div>
              <p className="whitespace-pre-line text-slate-300 text-sm leading-relaxed bg-slate-800/30 rounded-lg p-3 border border-slate-700/30">
                {question.question}
              </p>
            </div>
          </div>

          {(!!question.answer || question.isGeneratingAnswer) && (
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="flex size-10 items-center justify-center rounded-full bg-purple-500/20 border-purple-500/30">
                  {question.isGeneratingAnswer ? (
                    <Loader2 className="size-5 text-purple-400 animate-spin" />
                  ) : (
                    <Bot className="size-5 text-green-400" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-white flex items-center gap-2">
                    Resposta da IA
                  </p>
                </div>
                <div className="text-slate-300">
                  {question.isGeneratingAnswer ? (
                    <div className="flex items-center space-x-3 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150" />
                      </div>
                      <span className="text-purple-300 text-sm italic">
                        Analisando áudio e gerando resposta inteligente...
                      </span>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-slate-800/30 to-slate-800/20 rounded-lg p-4 border border-slate-700/30">
                      <p className="whitespace-pre-line text-sm leading-relaxed">
                        {question.answer}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 ">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
              <span className="text-xs text-slate-500">Processado por IA</span>
            </div>
            <span className="text-slate-500 text-xs flex items-center gap-1">
              {dayjs(question.createdAt).toNow()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}