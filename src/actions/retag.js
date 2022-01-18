import { retag } from "../components/file-manage/index.js";

export async function actionRetag(msg, intent) {
    await retag(msg, intent)
}