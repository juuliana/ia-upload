import { z } from "zod";
import { FastifyInstance } from "fastify";
import { createReadStream } from "node:fs";

import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai";

export async function createTranscriptionRoute(app: FastifyInstance) {
  app.post("/videos/:id/transcription", async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id: videoId } = paramsSchema.parse(request.params);

    const boydSchema = z.object({
      prompt: z.string(),
    });

    const { prompt } = boydSchema.parse(request.body);

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId,
      },
    });

    const videoPath = video.path;
    const audioReadStream = createReadStream(videoPath);

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: "whisper-1",
      prompt,
      language: "pt",
      temperature: 0,
      response_format: "json",
    });

    const transcription = response.text;

    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        transcription,
      },
    });

    return { transcription };
  });
}
