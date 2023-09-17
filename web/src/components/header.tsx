import { Github } from "lucide-react";
import { Button, Separator } from "./ui";

export function Header() {
  return (
    <div className="px-6 py-2 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">IA Upload</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Desenvolvido com 💙 no NLW da Rocketseat
        </span>

        <Separator orientation="vertical" className="h-6" />

        <Button
          variant="outline"
          onClick={() => window.open("https://github.com/juuliana")}
        >
          <Github className="w-4 h-4 mr-2" />
          Github
        </Button>
      </div>
    </div>
  );
}
