import { openDB } from "idb";
import type { Article } from "../../../domain/entities/Article";

const DB_NAME = "news-db";
const STORE_NAME = "news-store";

export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const saveArticles = async (articles: Article[]) => {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const article of articles) {
    await tx.store.put(article);
  }
  await tx.done;
};

export const getArticleById = async (id: string) => {
  const db = await getDB();
  return db.get(STORE_NAME, id);
};

export const debugPrintAll = async () => {
  const db = await getDB();
  const all = await db.getAll(STORE_NAME);
  console.log("📦 IndexedDB content:", all);
};

export const clearArticles = async () => {
  const db = await getDB();
  await db.clear(STORE_NAME);
};
