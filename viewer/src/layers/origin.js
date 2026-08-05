// ORIGIN — the root layer. Every other layer forks from this one,
// directly or through another layer. Keep it minimal and canonical:
// it represents the scan itself, not anyone's story about it.

export default {
  id: 'origin',
  title: 'ORIGIN — the scan',
  author: 'immersive-story-club',
  forkedFrom: null, // the root: no parent
  scanGuid: 'e7e3ee29094924288063a4fe907c5ba4', // guid from lcc-result/Jaguar.lcc
  created: '2026-08-04',
  tint: '#00f0ff',
  description:
    'Gray Area, San Francisco — as the PortalCam saw it. The unedited starting point every layer traces back to.',
  locations: [
    {
      id: 'threshold',
      label: 'The Threshold',
      views: [
        {
          id: 'threshold-spawn',
          label: 'Where the scan began',
          position: [0.8, 1.0, 0.8],
          target: [-7, 0.3, -6],
          phase: 'any',
          epoch: null,
          asserter: 'immersive-story-club',
          scope: 'club'
        }
      ]
    },
    {
      id: 'library',
      label: 'The Library Corner',
      views: [
        {
          id: 'library-chairs',
          label: 'Purple chairs & shelves',
          position: [0, 0, 0],
          target: [-2.2, 0, -2],
          phase: 'any',
          epoch: null,
          asserter: 'immersive-story-club',
          scope: 'club'
        }
      ]
    },
    {
      id: 'gallery-sign',
      label: 'The Gallery Sign',
      views: [
        {
          id: 'gallery-neon',
          label: 'GRAY AREA GALLERY in neon',
          position: [-4.2, 0.9, -3.8],
          target: [2, 0.6, 1],
          phase: 'any',
          epoch: null,
          asserter: 'immersive-story-club',
          scope: 'club'
        }
      ]
    }
  ]
};
