# Minecraft

Advancements pack for Bedrock Edition.

## Included pack

`BedrockAdvancementsBP`

This behavior pack provides:

- Mixed difficulty advancements (easy, medium, hard, really hard)
- In-game progress display (`/function adv/show`)
- Default-Minecraft-inspired goals (for example: Stone Age, Acquire Hardware, Suit Up, Diamonds!, Into Fire, Beaconator, Free the End)
- Realm-friendly structure so you can import and apply it to worlds/realms

## How to use

1. Copy the `BedrockAdvancementsBP` folder into your Bedrock behavior packs directory, or zip it as `.mcpack` and import.
2. Enable the behavior pack in your world.
3. For realms, upload/replace the realm world with this behavior pack enabled.
4. Join the world and run:
   - `/function adv/setup` once to initialise scoreboards (run this each time you enable the pack on a new world).
   - `/function adv/show` to check completed and remaining advancements.

## Quick install — download the ready-made `.mcpack`

The easiest way to test the pack — no manual zipping required:

### One-tap latest release link

After a successful **Build .mcpack** run on the default branch (or after manually running **Publish .mcpack release**), you can use this stable download URL:

- https://github.com/Tonedleo/Minecraft/releases/latest/download/BedrockAdvancementsBP.mcpack

On phone, tap that link and open the downloaded `.mcpack` in Minecraft Bedrock Edition.

### Build artifact download

1. Go to the **Actions** tab of this repository on GitHub.
2. Click the latest **Build .mcpack** workflow run (green ✓ or in-progress).  
    — Or click **Run workflow** (the button on the right) to build from any branch on demand.
3. Scroll down to **Artifacts** and click **BedrockAdvancementsBP** to download the zip.
4. Unzip it — you get `BedrockAdvancementsBP.mcpack`.
5. **Double-click** (Windows/Mac) or **tap** (Android/iOS) the `.mcpack` file.  
   Minecraft opens and imports it automatically.
6. Enable the behavior pack on your world (or realm world), then run `/function adv/setup` once, and `/function adv/show` to view progress.

> The artifact is rebuilt automatically on every push, so it always contains the latest version of the pack.

### Publish a latest-release download

1. Go to the **Actions** tab of this repository on GitHub.
2. If needed, run the **Publish .mcpack release** workflow manually.
3. Share or open the stable link above.
