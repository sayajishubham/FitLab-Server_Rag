const { Chroma } = require("@langchain/community/vectorstores/chroma");
const embeddings = require("./embeddings");

let vectorStore;

async function initVectorStore(documents) {
    if (!vectorStore) {
        vectorStore = await Chroma.fromDocuments(
            documents,
            embeddings,
            {
                collectionName: "fitness_knowledge",
                url: "http://localhost:8000"
            }
        );
    }
    return vectorStore;

}
async function getVectorStore() {
    if (!vectorStore) {
        vectorStore = new Chroma(
            embeddings,
            {
                collectionName: "fitness_knowledge",
                url: process.env.CHROMA_URL
            }
        );
    }
    return vectorStore;
}

module.exports = { initVectorStore, getVectorStore };