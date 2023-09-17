import { z } from "zod";
import { FastifyInstance } from "fastify";
import { OpenAIStream, streamToResponse } from "ai";

import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";

export async function generateAiCompletionRoute(app: FastifyInstance) {
  app.post("/ai/complete", async (request, reply) => {
    const boydSchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    });

    const { videoId, template, temperature } = boydSchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    if (!video.transcription) {
      return reply
        .status(400)
        .send({ error: "A transcrição do vídeo ainda não foi gerada." });
    }

    const promptMessage = template.replace(
      "{transcription}",
      video.transcription
    );

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature,
      messages: [{ content: promptMessage, role: "user" }],
      stream: true,
    });

    const stream = OpenAIStream(response);

    streamToResponse(stream, reply.raw, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      },
    });
    return response;
  });
}
