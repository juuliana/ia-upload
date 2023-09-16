import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";

import {
  uploadVideoRoute,
  getAllPromptsRoute,
  createTranscriptionRoute,
  generateAiCompletionRoute,
} from "./routes";

const app = fastify();

app.register(fastifyCors, {
  origin: "*",
});

app.register(uploadVideoRoute);
app.register(getAllPromptsRoute);
app.register(createTranscriptionRoute);
app.register(generateAiCompletionRoute);

app
  .listen({
    port: 3333,
  })
  .then(() => console.log("Server running..."));
