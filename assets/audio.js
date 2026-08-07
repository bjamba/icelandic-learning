/**
 * Icelandic Learning Audio Utilities
 * Provides improved audio playback using Web Speech API
 */

(function() {
  'use strict';

  // Voice selection - try to find the best Icelandic voice available
  let icelandicVoice = null;
  let voicesLoaded = false;

  /**
   * Find the best available Icelandic or Nordic voice
   */
  function findIcelandicVoice() {
    if (!window.speechSynthesis) return;

    const voices = window.speechSynthesis.getVoices();

    // Try to find Icelandic voices in order of preference
    const preferredVoices = [
      'is-IS',    // Standard Icelandic
      'Icelandic', // Named Icelandic
    ];

    for (const lang of preferredVoices) {
      const voice = voices.find(v =>
        v.lang === lang ||
        v.lang.startsWith('is') ||
        v.name.includes('Icelandic') ||
        v.name.includes('Iceland')
      );
      if (voice) {
        icelandicVoice = voice;
        console.log('[Icelandic Audio] Using Icelandic voice:', voice.name);
        return;
      }
    }

    // Fallback: if no Icelandic voice found, try any Nordic voice
    const nordicVoices = voices.filter(v =>
      v.lang.startsWith('da') || // Danish
      v.lang.startsWith('sv') || // Swedish
      v.lang.startsWith('nb') || // Norwegian
      v.lang.startsWith('fi')    // Finnish
    );

    if (nordicVoices.length > 0) {
      icelandicVoice = nordicVoices[0];
      console.log('[Icelandic Audio] No Icelandic voice found, using Nordic voice:', icelandicVoice.name);
    } else {
      console.log('[Icelandic Audio] No Nordic voice found, using default system voice');
    }
  }

  /**
   * Initialize audio system
   */
  function initAudio() {
    if (!window.speechSynthesis) {
      console.warn('[Icelandic Audio] Speech Synthesis not supported in this browser');
      return;
    }

    // Load voices on init
    window.speechSynthesis.onvoiceschanged = findIcelandicVoice;
    findIcelandicVoice();

    voicesLoaded = true;
  }

  /**
   * Play audio for a given text
   * @param {string} text - The text to speak
   * @param {Object} options - Optional settings
   * @param {number} options.rate - Speech rate (default: 0.9)
   * @param {number} options.pitch - Pitch (default: 0.9)
   */
  function playAudio(text, options = {}) {
    if (!window.speechSynthesis) {
      console.error('[Icelandic Audio] Speech Synthesis not supported');
      return;
    }

    // Cancel any ongoing speech for clean playback
    window.speechSynthesis.cancel();

    if (!text || typeof text !== 'string') {
      console.warn('[Icelandic Audio] No text to play');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);

    // Use found Icelandic voice if available
    if (icelandicVoice) {
      utterance.voice = icelandicVoice;
    }

    // Set language
    utterance.lang = 'is-IS';

    // Adjust pitch and rate for better pronunciation
    // Pitch: 0.8-1.2 (lower pitch sounds more natural for Icelandic)
    // Rate: 0.8-0.95 (slightly slower for clarity)
    utterance.pitch = options.pitch !== undefined ? options.pitch : 0.9;
    utterance.rate = options.rate !== undefined ? options.rate : 0.9;

    window.speechSynthesis.speak(utterance);
  }

  /**
   * Stop any currently playing audio
   */
  function stopAudio() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAudio);
  } else {
    initAudio();
  }

  // Expose to global scope for use in HTML pages
  window.IcelandicAudio = {
    play: playAudio,
    stop: stopAudio,
    init: initAudio
  };

})();
