import { useRef, useState } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Mic, MicOff, ArrowLeft, Upload } from 'lucide-react'

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

type RoomParams = {
  roomId: string
}

export function RecordRoomAudio() {
  const params = useParams<RoomParams>()
  const [isRecording, setIsRecording] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)
  const intervalRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', audio, 'audio.webm')

      const response = await fetch(
        `http://localhost:3333/rooms/${params.roomId}/audio`,
        {
          method: 'POST',
          body: formData,
        }
      )

      const result = await response.json()
      console.log(result)
    } catch (error) {
      console.error('Erro ao enviar áudio:', error)
    } finally {
      setIsUploading(false)
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    recorder.current.onstart = () => {
      console.log('Gravação iniciada!')
    }

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada')
    }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O seu navegador não suporta gravação')
      return
    }

    setIsRecording(true)

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    })

    createRecorder(audio)

    intervalRef.current = setInterval(() => {
      recorder.current?.stop()
      createRecorder(audio)
    }, 5000)
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-900">
      
      <div className="relative">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <Link to={`/room/${params.roomId}`}>
            <Button 
              variant="outline" 
              className="bg-slate-900/50 border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-purple-500/50 hover:text-white transition-all duration-300"
            >
              <ArrowLeft className="mr-2 size-4" />
              Voltar para Sala
            </Button>
          </Link>
        </div>

        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
          <div className="text-center">
            <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${
              isRecording 
                ? 'bg-red-500/10 border-red-500/30 text-red-300' 
                : 'bg-slate-800/50 border-slate-700/50 text-slate-300'
            }`}>
              {isRecording ? (
                <>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="font-medium">Gravando...</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-slate-500 rounded-full" />
                  <span className="font-medium">Pronto para gravar</span>
                </>
              )}
            </div>
          </div>

          <div className="relative">
            <div className={`relative transition-all duration-300 ${
              isRecording ? 'scale-110' : 'scale-100'
            }`}>
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? 'bg-red-900 shadow-lg shadow-red-500/50'
                  : 'bg-purple-900 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40'
              }`}>
                {isRecording ? (
                  <MicOff className="size-12 text-white" />
                ) : (
                  <Mic className="size-12 text-white" />
                )}
              </div>
              
              {isRecording && (
                <>
                  <div className="absolute inset-0 w-32 h-32 rounded-full border-2 border-red-400/30 animate-ping" />
                </>
              )}
            </div>

            
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center gap-4">
            {isRecording ? (
              <Button 
                onClick={stopRecording}
                className="bg-red-900 hover:from-red-850 text-white px-8 py-3 text-lg font-medium shadow-lg shadow-red-500/25 transition-all duration-300"
                size="lg"
              >
                <MicOff className="mr-2 size-5" />
                Parar Gravação
              </Button>
            ) : (
              <Button 
                onClick={startRecording}
                className="bg-purple-950 hover:from-purple-800 text-white px-8 py-3 text-lg font-medium shadow-lg shadow-green-500/25 transition-all duration-300 hover:shadow-purple-500/40"
                size="lg"
              >
                <Mic className="mr-2 size-5" />
                Iniciar Gravação
              </Button>
            )}

            {isUploading && (
              <div className="flex mt-0.5 items-center gap-2 text-blue-400">
                <span className="text-sm">Enviando áudio...</span>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="text-center max-w-md">
            <h2 className="text-xl font-semibold text-white mb-2">
              Gravação Inteligente
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              {isRecording 
                ? 'Sua voz está sendo gravada e processada automaticamente. Fale naturalmente e clique em "Parar" quando terminar.'
                : 'Clique no botão para começar a gravar. O áudio será processado em tempo real e estará disponível para perguntas.'
              }
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}