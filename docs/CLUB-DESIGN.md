# The Club Layer — design notes & roadmap

*A spatially indexed, collectively authored mnemonic notation system.*

The unit of meaning is not the emoji stack. It is:

> **place + ordered signs + author + moment + optional note + later interpretation**

The glyphs don't store the memory — they are an **address** through which the
memory can be retrieved. The room participates in the sentence: 🔥 beside the
stove, at the altar, or between two chairs are three different utterances.
(The scan supplies the semantic field; exact placement supplies situational
context; the author supplies point of view; the layer + timestamp supply time;
the note supplies the personal gloss; neighboring totems supply relation.)

## The shen ring

The cartouche is an elongated **shen ring** — encirclement, protection,
continuity. Ours declares no royalty; it declares *"these signs belong
together — hold them as one utterance."* In the viewer: black fill, Electric
Iris ring, knot bar at the base. The ring is **dashed while the totem is
unwritten and closes solid once it holds a note** — the utterance completes.

## Design laws (from the reasoning, adopted)

1. **No official dictionary.** Emoji ambiguity is a feature: people compose
   from intuition before they can explain. Meaning accrues as *local
   convention* — constructive provenance, not definition.
2. **Placement is sacred.** Plant it *where it happened*, facing what you
   faced. The plant-mode hint says so. Never auto-snap totems to a grid.
3. **The first deposit is never overwritten.** Memory is socially
   contagious; seeing others' layers changes your own recollection. The
   schema must eventually separate: *original deposit → encounter →
   integration → intervention* as append-only stages, never edits.
4. **Frequency ≠ signal.** Synthesis must surface *convergence, tension,
   absence, and transformation* — and protect the outlier totem from being
   erased by the majority pattern.
5. **The AI is a scribe, not an oracle.** It reports patterns provisionally
   ("jaguar appears in five layers; early uses concern protection, later
   uses creative permission") and always links back to the original totems.
   AI interpretation is its own layer, never a correction of the human record.
6. **Keep claims honest.** Separate *Observed / Reported / Interpreted /
   Verified* when the system starts noticing correspondences (dreams,
   coincidences). Mystery without credulity.

## Roadmap

### v1.1 — the forge (shipped)
- Shen-ring cartouches on planted totems (dashed → solid on note)
- Compose preview is itself a cartouche; full emoji library (search, skin
  tones, offline data) replaces the curated 28
- Note panel grows out of its totem and pops back into the ring on done
- `at` timestamp joins the totem schema

### v1.2 — the deposit, protected (static, no backend)
- Capture `gaze` (camera direction) at plant time — what you faced is part
  of the utterance
- Freeze `text` after a grace period (or explicit "seal"); further writing
  becomes appended, dated *addenda* — the three-stage memory model in
  schema form: `deposits: [{stage, text, at}]`
- Import a friend's exported `layer.json` beside yours (multi-layer view,
  read-only) — first taste of *encounter* without a server
- A "reveal ritual" toggle: hide all other totems until you've planted
  yours (protects first impressions; the private-then-collective rhythm)

### v2 — the commons (Supabase)
- Layers as rows; publish from the viewer; moderation by the club
- Lineage graph across layers (forkedFrom chains, already in schema)
- The scribe: periodic pattern reports (convergence / tension / absence /
  transformation), phrased provisionally, linking to source totems
- The clean experiment from the reasoning: private planting at one
  gathering, four recall conditions a week later — test whether spatial
  placement does real mnemonic work

### v3 — the feedback organ
- *Intervention* records: what the group changed (furniture, ritual, art)
  and later layers showing whether it helped
- Longitudinal portraits: recurring attractors, changing meanings, spatial
  pressure points, unanswered signals, quiet signals
- New scans as new epochs — the room becomes both record and participant

## The grammar

> The shen encloses the utterance.
> The stack compresses the experience.
> The room supplies context.
> The layer preserves time.
> Repetition becomes culture.
> Contradiction creates depth.
> The AI is the attentive scribe.
