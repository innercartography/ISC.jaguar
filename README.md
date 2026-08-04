# Jaguar — Immersive Story Club scan of Gray Area

A 3D Gaussian splat capture of [Gray Area](https://grayarea.org) (San Francisco), scanned with an **XGRIDS PortalCam** for the **Immersive Story Club**. This repo is our shared base camp: grab the scan, build a world with it, tell a story in it, and bring what you make back to the club.

- **~2.34 million splats**, 3 levels of detail, scene footprint roughly 39m × 23m × 10m
- Captured/processed with Lixel Studio 1.11 (LCC format v5.0, "Portable" profile)
- Discord is where we talk; this repo is where the world lives.

## What's in here

| Path | What it is |
|---|---|
| `lcc-result/` | The full Gaussian splat scene in XGRIDS **LCC** format (`Jaguar.lcc` is the manifest; `data.bin` holds the splats; `collision.lci` + `environment.bin` are physics & environment data; `assets/poses.json` is the capture trajectory) |
| `mesh-files/Jaguar.ply` | Low-poly **collision mesh** (26,711 verts / 48,968 tris, binary PLY, no color). Good for physics, nav meshes, and blocking out — it is *not* the pretty version |
| `exports/` | Standard-format exports (3DGS `.ply` / `.spz`) go here as we make them — see the wishlist below |

## How to open it

The LCC format is XGRIDS-native. Free tooling from [xgrids.com](https://xgrids.com):

- **Unity** — the *LCC for Unity* plugin loads `Jaguar.lcc` directly, with LODs and the collision data. Best path for interactive/VR builds.
- **Unreal** — *LCC for Unreal* plugin, same deal.
- **Desktop viewing** — Lixel Studio opens the scene and can re-export to standard formats.
- **Web** — XGRIDS' LCC for Web SDK / Reveal can serve the Portable LCC in a browser.
- **The mesh** (`mesh-files/Jaguar.ply`) opens in Blender, MeshLab, or anything else — remember it's uncolored collision geometry.

### Don't have XGRIDS tools?

You want a standard **3DGS export** — see the wishlist. Once an `exports/Jaguar.spz` or `exports/Jaguar-3dgs.ply` lands here, you can:

- Drop it into [SuperSplat](https://superspl.at/editor) in your browser — edit, clean up, and publish a shareable walk-around link (works on Quest browser in VR, no install)
- Import to Blender via a 3DGS add-on, or into Polycam, Gracia, and friends

## Wishlist / help wanted

- [ ] **Export standard 3DGS `.ply` and `.spz` from Lixel Studio** and commit to `exports/` (SPZ is ~10× smaller — the raw PLY of 2.3M splats will be ~500MB+ and needs Git LFS, so prefer SPZ)
- [ ] Publish a SuperSplat scene link so Discord folks can walk the space with one click, zero installs
- [ ] A cleaned-up / cropped hero version of the scan (kill the floaters)
- [ ] A brighter thumbnail — `lcc-result/thumb.jpg` came out dark
- [ ] First story experiments: what happened in this room?

## Contributing

Fork it, remix it, PR it. Keep the raw capture in `lcc-result/` untouched — add new versions under `exports/` or your own folder. Share works-in-progress in the Discord.

## License

**Proposed: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)** — remix freely, credit the Immersive Story Club. Not final until the club confirms; if you have opinions, raise them in the Discord.
