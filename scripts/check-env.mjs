import fs from "node:fs";
import path from "node:path";

const OPTIONAL_KEYS = ["VITE_APP_TITLE"];

const parseEnvFile = (content) => {
  const entries = {};
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const index = trimmed.indexOf("=");
    if (index === -1) {
      continue;
    }
    const key = trimmed.slice(0, index).trim();
    const value = trimmed.slice(index + 1).trim();
    if (key) {
      entries[key] = value;
    }
  }
  return entries;
};

const loadEnvFromFile = () => {
  const candidates = [".env", ".env.local"].map((file) =>
    path.resolve(process.cwd(), file)
  );
  const file = candidates.find((candidate) => fs.existsSync(candidate));
  if (!file) {
    return null;
  }
  const content = fs.readFileSync(file, "utf8");
  const parsed = parseEnvFile(content);
  for (const [key, value] of Object.entries(parsed)) {
    if (!process.env[key] && value !== undefined) {
      process.env[key] = value;
    }
  }
  return file;
};

export const verifyFrontendEnv = () => {
  const loadedEnvFile = loadEnvFromFile();
  const provided = OPTIONAL_KEYS.filter((key) => process.env[key]);
  return { ok: true, loadedEnvFile, provided };
};
