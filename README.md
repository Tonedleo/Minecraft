# Minecraft

Locked Chunk Survival for Minecraft Bedrock Edition.

## What this pack does

- Starts every dimension with a single shared 16×16 chunk.
- Unlocks happen globally, so once a chunk is unlocked it is open for every player.
- Keeps separate infinite chunk progression tracks for the Overworld, Nether, and End.
- Grows unlock difficulty over time with shared progress costs.
- Awards progress from:
  - Minecraft day progression
  - shared online playtime
  - rare item deposits
  - mob kills
- Works in survival with members contributing and operators managing the setup.

## Pack layout

- `/home/runner/work/Minecraft/Minecraft/BedrockAdvancementsBP/manifest.json`
- `/home/runner/work/Minecraft/Minecraft/BedrockAdvancementsBP/scripts/main.js`

## Setup

1. Import the behavior pack from `BedrockAdvancementsBP`.
2. Enable it on any survival world.
3. Join the world. The first player entering each dimension sets that dimension's starting chunk automatically.
4. If you want to move the shared start chunk, stand in the target chunk and use:
   - `!lc admin setanchor`
   - `!lc admin setanchor overworld`
   - `!lc admin setanchor nether`
   - `!lc admin setanchor end`

## Download

**Easiest (Android / direct install):**

1. Go to the [**Releases**](../../releases/tag/latest-mcpack) page and tap **BedrockEditionLocked.mcpack**.
2. Android will ask which app to open it with — choose **Minecraft**.
3. The pack is imported automatically — no unzipping needed.

**From Actions (advanced):**

1. Open the latest run in **Actions**.
2. Download artifact **BedrockEditionLocked**.
3. Unzip it and import `BedrockEditionLocked.mcpack` into Minecraft manually.

## Player commands

- `!lc show` — show the shared progress pool and each dimension's next random unlock cost.
- `!lc unlock <overworld|nether|end>` — spend shared progress on that dimension's current random unlock requirement.
- `!lc deposit <resource> [count]` — convert rare resources into shared progress.
- `!lc help` — show command help.

### Resource bundles

- `iron` → 16 iron ingots = 2 progress
- `gold` → 16 gold ingots = 3 progress
- `diamond` → 4 diamonds = 6 progress
- `emerald` → 8 emeralds = 6 progress
- `blaze` → 8 blaze rods = 4 progress
- `pearl` → 4 ender pearls = 4 progress
- `debris` → 1 ancient debris = 10 progress
- `star` → 1 nether star = 20 progress

## Admin commands

Operators, or players with the `lc.admin` tag, can also use:

- `!lc admin setanchor [dimension]`
- `!lc admin grant <points>`
- `!lc admin reset`

## Do you need cheats enabled?

- For normal gameplay (`!lc show`, `!lc unlock`, `!lc deposit`), cheats are **not required**.
- For admin setup/management, you need operator access (or the `lc.admin` tag), which is usually managed with command permissions.

## Gameplay rules

- The pack tracks chunk unlocks with shared persistent world state.
- Every new unlock adds one more chunk to that dimension's spiral path.
- Players are pushed back into unlocked space if they cross into a locked chunk.
- Walking to the edge of unlocked space shows the next chunk price in chat.
- Breaking, placing, or using blocks in locked chunks is blocked.
- Nether and End anchors are set the first time players enter those dimensions, unless an admin overrides them first.
