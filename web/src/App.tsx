import { useState } from "react";
import { useCompletion } from "ai/react";
import { Wand2 } from "lucide-react";

import {
  Label,
  Select,
  Button,
  Slider,
  Textarea,
  Separator,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "./components/ui";
import { Header, PromptSelect, VideoInputForm } from "./components";

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0.5);

  const {
    input,
    setInput,
    isLoading,
    completion,
    handleSubmit,
    handleInputChange,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-type": "application/json",
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 p-6 flex gap-6">
        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />
          <Separator />

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>

              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="gpt3.5">gpt 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em breve.
              </span>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />

              <span className="block text-xs text-muted-foreground italic">
                Valores mais altos tendem a deixar o resultado mais criativo e
                com possíveis erros.
              </span>
            </div>

            <Separator />

            <Button
              type="submit"
              className="w-full bg-white"
              disabled={isLoading}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              Executar
            </Button>
          </form>
        </aside>

        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Inclua o prompt para a IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-4 leading-relaxed"
              placeholder="Resultado gerado pela IA..."
              readOnly
              value={completion}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a varíavel{" "}
            <code className="text-blue-500">{"{transcription}"}</code> no seu
            prompt para adicionar o conteúdo da transcrição do vídeo
            selecionado.
          </p>
        </div>
      </main>
    </div>
  );
}
