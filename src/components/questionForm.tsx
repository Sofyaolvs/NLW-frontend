import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useCreateQuestion } from '@/http/useCreateQuestion'
import { Send, Sparkles, Brain, Text } from 'lucide-react'

const createQuestionSchema = z.object({
  question: z
    .string()
    .min(1, 'Pergunta é obrigatória')
    .min(10, 'Pergunta deve ter pelo menos 10 caracteres')
    .max(500, 'Pergunta deve ter menos de 500 caracteres'),
})

type CreateQuestionFormData = z.infer<typeof createQuestionSchema>

interface QuestionFormProps {
  roomId: string
}

export function QuestionForm({ roomId }: QuestionFormProps) {
  const {mutateAsync: createQuestion, isPending} = useCreateQuestion(roomId)

  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(createQuestionSchema),
    defaultValues: {
      question: '',
    },
  })

  async function handleCreateQuestion(data: CreateQuestionFormData) {
    try {
      await createQuestion({ ...data, roomId })
      form.reset()
    } catch (error) {
      console.error('Erro ao criar pergunta:', error)
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-blue-950">
            <Brain className="size-4 text-green-300" />
          </div>
          <CardTitle className="text-white">Fazer uma Pergunta</CardTitle>
        </div>
        <CardDescription className="text-slate-00">
          Digite sua pergunta abaixo para receber uma resposta baseada nos seus áudios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleCreateQuestion)}
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300 flex items-center gap-2">
                    <Text className="size-4 text-purple-400" />
                    Sua Pergunta
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-[120px] bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500  resize-none"
                      placeholder="Ex: Do que trata o áudio que gravei? Quais são os pontos principais?..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isPending}
              className="bg-gradient-to-r from-purple-800 to-purple-950 text-white shadow-lg transition-all duration-300 hover:shadow-green-600/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                  Processando...
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Enviar pergunta
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}