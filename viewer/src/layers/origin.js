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
      id: 'first-light',
      label: 'First Light',
      views: [
        {
          id: 'first-light-spawn',
          label: "The scanner's first breath",
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
      id: 'athenaeum',
      label: 'The Athenaeum',
      views: [
        {
          id: 'athenaeum-chairs',
          label: 'Patient books, violet chairs',
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
      id: 'sigil',
      label: 'The Sigil',
      views: [
        {
          id: 'sigil-sign',
          label: 'GRAY AREA GALLERY, written in light',
          position: [-4.2, 0.9, -3.8],
          target: [2, 0.6, 1],
          phase: 'any',
          epoch: null,
          asserter: 'immersive-story-club',
          scope: 'club'
        }
      ]
    },
    {
      id: 'salon',
      label: 'The Salon',
      views: [
        {
          id: 'salon-armchair',
          label: 'An armchair holds court',
          position: [-2, 0.8, -1.5],
          target: [7, 0, 3],
          phase: 'any',
          epoch: null,
          asserter: 'immersive-story-club',
          scope: 'club'
        }
      ]
    }
  ]
};
