import { FileVideo, Upload } from "lucide-react";

import { Label, Textarea, Button, Separator } from "./ui";

export function VideoInputForm() {
  function handleFileSelected() {}

  return (
    <form className="space-y-6">
      <label
        htmlFor="video"
        className="border flex rounded-md aspect-video items-center justify-center cursor-pointer border-dashed text-sm flex-col gap-2 text-muted-foreground hover:bg-primary/10"
      >
        <FileVideo />
        Selecione um vídeo
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <Separator />

      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>

        <Textarea
          id="transcription_prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Inclua palavras-chave mencionadas no vídeo separadas por vírgula (,)"
        />
      </div>

      <Button className=" w-full bg-white" type="submit">
        <Upload className="w-4 h-4 mr-2" />
        Carregar vídeo
      </Button>
    </form>
  );
}
