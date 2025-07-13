import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateQuestionResponse } from '../http/types/CreateQuestionResponse';
import type { CreateQuestionRequest } from '../http/types/createQuestionResquest';
import type { GetRoomQuestionsResponse } from '../http/types/getRoomQuestionsResponse';

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result: CreateQuestionResponse = await response.json();
      return result;
    },

    // Executa no momento que for feita a chamada p/ API
    onMutate(data) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse>([
        'get-questions',
        roomId,
      ]);

      const questionsArray = questions ?? [];

      const newQuestion = {
        id: crypto.randomUUID(),
        question: data.question,
        answer: 0, // Mudei de null para 0 para compatibilidade com o tipo
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        [newQuestion, ...questionsArray]
      );

      return { newQuestion, questions: questionsArray };
    },

    onSuccess(data, _variables, context) {
      if (!context) return;

      queryClient.setQueryData<GetRoomQuestionsResponse>(
        ['get-questions', roomId],
        (questions) => {
          if (!questions) return questions;

          return questions.map((question) => {
            if (question.id === context.newQuestion.id) {
              return {
                ...question,
                id: data.questionId,
                answer: data.answer ? Number.parseInt(data.answer) : 0, // Converte string para number
              };
            }
            return question;
          });
        }
      );
    },

    onError(_error, _variables, context) {
      if (context?.questions) {
        queryClient.setQueryData<GetRoomQuestionsResponse>(
          ['get-questions', roomId],
          context.questions
        );
      }
    },
  });
}
