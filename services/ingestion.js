require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");
const { initVectorStore } = require("./chroma");

async function loadKnowledgeFiles(dirPath) {
    const files = fs.readdirSync(dirPath);
    let documents = [];

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            const nestedDocs = await loadKnowledgeFiles(fullPath);
            documents = documents.concat(nestedDocs);
        }
        else if (file.endsWith(".txt")) {
            const content = fs.readFileSync(fullPath, "utf-8");

            // 🔥 Extract category from folder name
            const category = path.basename(dirPath);

            documents.push({
                pageContent: content,
                metadata: {
                    source: file,
                    category: category
                }
            });
        }
    }

    return documents;
}

async function ingest() {
    const basePath = path.join(__dirname, "../knowledge");

    const rawDocs = await loadKnowledgeFiles(basePath);

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const splitDocs = await splitter.splitDocuments(rawDocs);

    await initVectorStore(splitDocs);

    console.log("Knowledge successfully embedded with metadata!");
}

ingest();
