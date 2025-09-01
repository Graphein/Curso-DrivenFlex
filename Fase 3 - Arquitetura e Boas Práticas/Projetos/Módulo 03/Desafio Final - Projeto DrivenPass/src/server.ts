import app from "./app";
import { env } from "./config/database";

app.listen(env.PORT, () => {
  console.log(`Server is up! Port:${env.PORT}`);
});