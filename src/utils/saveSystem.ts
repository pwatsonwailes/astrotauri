import { invoke } from '@tauri-apps/api/tauri';
import { appDataDir } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile, exists, createDir } from '@tauri-apps/api/fs';

const SAVE_FILENAME = 'astromine_save.json';

/**
 * Gets the full path to the save file
 */
async function getSavePath(): Promise<string> {
  const appDataDirPath = await appDataDir();
  return `${appDataDirPath}${SAVE_FILENAME}`;
}

/**
 * Ensures the save directory exists
 */
async function ensureSaveDirectory(): Promise<void> {
  const appDataDirPath = await appDataDir();
  try {
    const dirExists = await exists(appDataDirPath);
    if (!dirExists) {
      await createDir(appDataDirPath, { recursive: true });
    }
  } catch (error) {
    console.error('Failed to create save directory:', error);
    throw error;
  }
}

/**
 * Saves the game state to a file
 */
export async function saveGame(gameState: any): Promise<void> {
  try {
    await ensureSaveDirectory();
    const savePath = await getSavePath();
    const saveData = JSON.stringify(gameState, null, 2);
    await writeTextFile(savePath, saveData);
    console.log('Game saved successfully');
  } catch (error) {
    console.error('Failed to save game:', error);
    // Optionally show an error notification to the user
  }
}

/**
 * Loads the game state from a file
 */
export async function loadGame(): Promise<any | null> {
  try {
    const savePath = await getSavePath();
    const fileExists = await exists(savePath);
    
    if (!fileExists) {
      console.log('No save file found');
      return null;
    }
    
    const saveData = await readTextFile(savePath);
    const gameState = JSON.parse(saveData);
    console.log('Game loaded successfully');
    return gameState;
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

/**
 * Checks if a saved game exists
 */
export async function hasSavedGame(): Promise<boolean> {
  try {
    const savePath = await getSavePath();
    return await exists(savePath);
  } catch (error) {
    console.error('Failed to check for saved game:', error);
    return false;
  }
}

/**
 * Deletes the saved game file
 */
export async function deleteSavedGame(): Promise<boolean> {
  try {
    const savePath = await getSavePath();
    const fileExists = await exists(savePath);
    
    if (fileExists) {
      await invoke('plugin:fs|remove_file', { path: savePath });
      console.log('Save file deleted successfully');
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to delete save file:', error);
    return false;
  }
}