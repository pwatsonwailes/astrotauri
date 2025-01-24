import { useRef, useEffect, useState } from 'react';
import availableTracks from '../data/audio';

class AudioManager {
  private tracks: Map<string, HTMLAudioElement> = new Map();
  private currentTrack: string | null = null;
  private isInitialized: boolean = false;

  async playTrack(trackName: string, track: HTMLAudioElement, volume: number = 100) {
    try {
      // Check if track exists in available tracks
      if (!availableTracks[trackName]) {
        console.warn(`Track "${trackName}" not available`);
        return;
      }

      // Stop current track if different
      if (this.currentTrack && this.currentTrack !== trackName) {
        await this.stopTrack(this.currentTrack);
      }

      track.preload = 'auto';
      this.tracks.set(trackName, track);

      track.volume = volume / 100;
      track.loop = true;

      try {
        await track.play();
        this.currentTrack = trackName;
      } catch (error) {
        console.warn('Audio playback failed:', error);
      }
    } catch (error) {
      console.warn('Error in playTrack:', error);
    }
  }

  async stopTrack(trackName: string) {
    try {
      const track = this.tracks.get(trackName);
      if (track) {
        await track.pause();
        track.currentTime = 0;
      }
      if (this.currentTrack === trackName) {
        this.currentTrack = null;
      }
    } catch (error) {
      console.warn('Error in stopTrack:', error);
    }
  }

  setVolume(trackName: string, volume: number) {
    const track = this.tracks.get(trackName);
    if (track) {
      track.volume = volume / 100;
    }
  }
}

export const audioManager = new AudioManager();

export const useAudio = () => {
  const [track, setTrack] = useState('titles');
  const [volume, setVolume] = useState(100);
  const prevTrack = useRef<string | undefined>(undefined);

  useEffect(() => {
    // Only attempt to play if track exists in availableTracks
    if (track && availableTracks[track]) {
      const music = new Audio(availableTracks[track]);
      audioManager.playTrack(track, music, volume);
      prevTrack.current = track;
    } else if (availableTracks.titles) {
      // Fallback to titles if available
      const music = new Audio(availableTracks.titles);
      audioManager.playTrack('titles', music, volume);
      prevTrack.current = 'titles';
    }

    return () => {
      if (prevTrack.current) {
        audioManager.stopTrack(prevTrack.current);
      }
    };
  }, [track, volume]);

  return { setTrack, setVolume };
};