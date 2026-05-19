import { DynamicPropertiesDefinition, Player, system, world } from "@minecraft/server";

const STATE_KEY = "lockedchunk:state";
const DIMENSION_IDS = ["minecraft:overworld", "minecraft:nether", "minecraft:the_end"];
const DIMENSION_ALIASES = {
  overworld: "minecraft:overworld",
  nether: "minecraft:nether",
  end: "minecraft:the_end",
  the_end: "minecraft:the_end",
};
const DIMENSION_LABELS = {
  "minecraft:overworld": "Overworld",
  "minecraft:nether": "Nether",
  "minecraft:the_end": "End",
};
const DEFAULT_ANCHOR_Y = {
  "minecraft:overworld": 64,
  "minecraft:nether": 64,
  "minecraft:the_end": 64,
};
const CONFIG = {
  tickInterval: 20,
  enforcementIntervalTicks: 5,
  ticksPerMinecraftDay: 24000,
  dayProgressReward: 3,
  ticksPerPlaytimePoint: 1200,
  unlockCost: {
    base: 18,
    perChunk: 6,
    ringBonus: 4,
    randomRange: {
      minFactor: 0.65,
      maxFactor: 1.35,
    },
    dimensionMultiplier: {
      "minecraft:overworld": 1,
      "minecraft:nether": 1.15,
      "minecraft:the_end": 1.3,
    },
  },
  messages: {
    boundaryCooldownTicks: 100,
    edgeWarningCooldownTicks: 40,
    edgeWarningMarginBlocks: 1,
  },
};
const RESOURCE_TIERS = {
  // ── Tier 0 – Common / junk (very cheap, high quantity needed) ──────────
  dirt: {
    itemId: "minecraft:dirt",
    amount: 64,
    points: 1,
    label: "64 dirt",
  },
  gravel: {
    itemId: "minecraft:gravel",
    amount: 64,
    points: 1,
    label: "64 gravel",
  },
  sand: {
    itemId: "minecraft:sand",
    amount: 64,
    points: 1,
    label: "64 sand",
  },
  cobblestone: {
    itemId: "minecraft:cobblestone",
    amount: 64,
    points: 1,
    label: "64 cobblestone",
  },
  stick: {
    itemId: "minecraft:stick",
    amount: 32,
    points: 1,
    label: "32 sticks",
  },
  // ── Tier 1 – Early-game renewable / basic wood ────────────────────────
  log: {
    itemId: "minecraft:oak_log",
    amount: 32,
    points: 1,
    label: "32 oak logs",
  },
  birch: {
    itemId: "minecraft:birch_log",
    amount: 32,
    points: 1,
    label: "32 birch logs",
  },
  spruce: {
    itemId: "minecraft:spruce_log",
    amount: 32,
    points: 1,
    label: "32 spruce logs",
  },
  jungle: {
    itemId: "minecraft:jungle_log",
    amount: 32,
    points: 1,
    label: "32 jungle logs",
  },
  acacia: {
    itemId: "minecraft:acacia_log",
    amount: 32,
    points: 1,
    label: "32 acacia logs",
  },
  darkoak: {
    itemId: "minecraft:dark_oak_log",
    amount: 32,
    points: 1,
    label: "32 dark oak logs",
  },
  charcoal: {
    itemId: "minecraft:charcoal",
    amount: 32,
    points: 1,
    label: "32 charcoal",
  },
  // ── Tier 2 – Stone & early smelted ────────────────────────────────────
  stone: {
    itemId: "minecraft:stone",
    amount: 64,
    points: 1,
    label: "64 stone",
  },
  coal: {
    itemId: "minecraft:coal",
    amount: 32,
    points: 1,
    label: "32 coal",
  },
  flint: {
    itemId: "minecraft:flint",
    amount: 32,
    points: 1,
    label: "32 flint",
  },
  leather: {
    itemId: "minecraft:leather",
    amount: 16,
    points: 1,
    label: "16 leather",
  },
  bone: {
    itemId: "minecraft:bone",
    amount: 16,
    points: 1,
    label: "16 bones",
  },
  string: {
    itemId: "minecraft:string",
    amount: 32,
    points: 1,
    label: "32 string",
  },
  feather: {
    itemId: "minecraft:feather",
    amount: 32,
    points: 1,
    label: "32 feathers",
  },
  // ── Tier 3 – Mid-game crafted / smelted resources ─────────────────────
  brick: {
    itemId: "minecraft:brick",
    amount: 32,
    points: 2,
    label: "32 bricks",
  },
  cactus: {
    itemId: "minecraft:cactus",
    amount: 32,
    points: 1,
    label: "32 cactus",
  },
  sugarcane: {
    itemId: "minecraft:reeds",
    amount: 32,
    points: 1,
    label: "32 sugar cane",
  },
  wheat: {
    itemId: "minecraft:wheat",
    amount: 32,
    points: 1,
    label: "32 wheat",
  },
  melon: {
    itemId: "minecraft:melon_slice",
    amount: 32,
    points: 1,
    label: "32 melon slices",
  },
  wool: {
    itemId: "minecraft:white_wool",
    amount: 16,
    points: 1,
    label: "16 wool",
  },
  glass: {
    itemId: "minecraft:glass",
    amount: 32,
    points: 1,
    label: "32 glass",
  },
  // ── Tier 4 – Underground common ores ─────────────────────────────────
  rawcopper: {
    itemId: "minecraft:raw_copper",
    amount: 32,
    points: 1,
    label: "32 raw copper",
  },
  copper: {
    itemId: "minecraft:copper_ingot",
    amount: 32,
    points: 1,
    label: "32 copper ingots",
  },
  rawiron: {
    itemId: "minecraft:raw_iron",
    amount: 16,
    points: 1,
    label: "16 raw iron",
  },
  iron: {
    itemId: "minecraft:iron_ingot",
    amount: 16,
    points: 2,
    label: "16 iron ingots",
  },
  rawgold: {
    itemId: "minecraft:raw_gold",
    amount: 16,
    points: 2,
    label: "16 raw gold",
  },
  gold: {
    itemId: "minecraft:gold_ingot",
    amount: 16,
    points: 3,
    label: "16 gold ingots",
  },
  lapis: {
    itemId: "minecraft:lapis_lazuli",
    amount: 32,
    points: 2,
    label: "32 lapis lazuli",
  },
  redstone: {
    itemId: "minecraft:redstone",
    amount: 32,
    points: 2,
    label: "32 redstone dust",
  },
  // ── Tier 5 – Valuable overworld ───────────────────────────────────────
  diamond: {
    itemId: "minecraft:diamond",
    amount: 4,
    points: 6,
    label: "4 diamonds",
  },
  emerald: {
    itemId: "minecraft:emerald",
    amount: 8,
    points: 6,
    label: "8 emeralds",
  },
  amethyst: {
    itemId: "minecraft:amethyst_shard",
    amount: 16,
    points: 3,
    label: "16 amethyst shards",
  },
  // ── Tier 6 – Nether resources ─────────────────────────────────────────
  netherbrick: {
    itemId: "minecraft:netherbrick",
    amount: 32,
    points: 2,
    label: "32 nether bricks",
  },
  netherwart: {
    itemId: "minecraft:nether_wart",
    amount: 16,
    points: 2,
    label: "16 nether wart",
  },
  quartz: {
    itemId: "minecraft:quartz",
    amount: 16,
    points: 2,
    label: "16 quartz",
  },
  blaze: {
    itemId: "minecraft:blaze_rod",
    amount: 8,
    points: 4,
    label: "8 blaze rods",
  },
  blazepowder: {
    itemId: "minecraft:blaze_powder",
    amount: 16,
    points: 3,
    label: "16 blaze powder",
  },
  magma: {
    itemId: "minecraft:magma_cream",
    amount: 8,
    points: 3,
    label: "8 magma cream",
  },
  glowstone: {
    itemId: "minecraft:glowstone_dust",
    amount: 16,
    points: 3,
    label: "16 glowstone dust",
  },
  goldnugget: {
    itemId: "minecraft:gold_nugget",
    amount: 32,
    points: 2,
    label: "32 gold nuggets",
  },
  // ── Tier 7 – End / ocean / biome-rare ────────────────────────────────
  pearl: {
    itemId: "minecraft:ender_pearl",
    amount: 4,
    points: 4,
    label: "4 ender pearls",
  },
  eye: {
    itemId: "minecraft:ender_eye",
    amount: 2,
    points: 5,
    label: "2 eyes of ender",
  },
  prismarine: {
    itemId: "minecraft:prismarine_shard",
    amount: 16,
    points: 3,
    label: "16 prismarine shards",
  },
  heart: {
    itemId: "minecraft:heart_of_the_sea",
    amount: 1,
    points: 8,
    label: "1 heart of the sea",
  },
  shulker: {
    itemId: "minecraft:shulker_shell",
    amount: 2,
    points: 6,
    label: "2 shulker shells",
  },
  elytra: {
    itemId: "minecraft:elytra",
    amount: 1,
    points: 15,
    label: "1 elytra",
  },
  // ── Tier 8 – Obsidian-tier construction ──────────────────────────────
  obsidian: {
    itemId: "minecraft:obsidian",
    amount: 8,
    points: 5,
    label: "8 obsidian",
  },
  cryingobsidian: {
    itemId: "minecraft:crying_obsidian",
    amount: 4,
    points: 5,
    label: "4 crying obsidian",
  },
  respawn: {
    itemId: "minecraft:respawn_anchor",
    amount: 1,
    points: 8,
    label: "1 respawn anchor",
  },
  // ── Tier 9 – Netherite chain ──────────────────────────────────────────
  debris: {
    itemId: "minecraft:ancient_debris",
    amount: 1,
    points: 10,
    label: "1 ancient debris",
  },
  netheritescrap: {
    itemId: "minecraft:netherite_scrap",
    amount: 1,
    points: 8,
    label: "1 netherite scrap",
  },
  netherite: {
    itemId: "minecraft:netherite_ingot",
    amount: 1,
    points: 14,
    label: "1 netherite ingot",
  },
  // ── Tier 10 – Boss drops / end-game ──────────────────────────────────
  totem: {
    itemId: "minecraft:totem_of_undying",
    amount: 1,
    points: 12,
    label: "1 totem of undying",
  },
  trident: {
    itemId: "minecraft:trident",
    amount: 1,
    points: 10,
    label: "1 trident",
  },
  dragonegg: {
    itemId: "minecraft:dragon_egg",
    amount: 1,
    points: 30,
    label: "1 dragon egg",
  },
  star: {
    itemId: "minecraft:nether_star",
    amount: 1,
    points: 20,
    label: "1 nether star",
  },
};
const MOB_POINTS = {
  "minecraft:zombie": 1,
  "minecraft:skeleton": 1,
  "minecraft:creeper": 2,
  "minecraft:spider": 1,
  "minecraft:enderman": 2,
  "minecraft:blaze": 2,
  "minecraft:ghast": 4,
  "minecraft:wither": 20,
  "minecraft:ender_dragon": 50,
};

let state;
let stateDirty = false;
let runtimeTicks = 0;
const unlockedChunkCache = new Map();
const lastSafePositions = new Map();
const boundaryWarnings = new Map();
const edgeWarnings = new Map();

function createDefaultDimensionState(dimensionId) {
  return {
    anchorChunkX: 0,
    anchorChunkZ: 0,
    anchorY: DEFAULT_ANCHOR_Y[dimensionId] ?? 64,
    anchorSet: false,
    unlockedChunks: 1,
    nextUnlockCost: null,
  };
}

function createDefaultState() {
  return {
    version: 1,
    progress: 0,
    lifetimeProgress: 0,
    daysSurvived: 0,
    serverTickBank: 0,
    onlineTickBank: 0,
    totalOnlineTicks: 0,
    dimensions: Object.fromEntries(
      DIMENSION_IDS.map((dimensionId) => [dimensionId, createDefaultDimensionState(dimensionId)]),
    ),
  };
}

function markDirty() {
  stateDirty = true;
}

function saveState() {
  if (!stateDirty || !state) {
    return;
  }

  world.setDynamicProperty(STATE_KEY, JSON.stringify(state));
  stateDirty = false;
}

function loadState() {
  const rawState = world.getDynamicProperty(STATE_KEY);

  if (typeof rawState !== "string" || rawState.length === 0) {
    state = createDefaultState();
    markDirty();
    rebuildAllUnlockedCaches();
    saveState();
    return;
  }

  try {
    state = JSON.parse(rawState);
  } catch (error) {
    state = createDefaultState();
    markDirty();
  }

  state.version = 1;
  state.progress ??= 0;
  state.lifetimeProgress ??= 0;
  state.daysSurvived ??= 0;
  state.serverTickBank ??= 0;
  state.onlineTickBank ??= 0;
  state.totalOnlineTicks ??= 0;
  state.dimensions ??= {};

  for (const dimensionId of DIMENSION_IDS) {
    state.dimensions[dimensionId] = {
      ...createDefaultDimensionState(dimensionId),
      ...(state.dimensions[dimensionId] ?? {}),
    };
    state.dimensions[dimensionId].nextUnlockCost = normalizeUnlockCost(
      state.dimensions[dimensionId].nextUnlockCost,
    );
    ensureNextUnlockCost(dimensionId);
  }

  rebuildAllUnlockedCaches();
  saveState();
}

function normalizeDimension(value, fallbackDimensionId) {
  if (!value) {
    return fallbackDimensionId;
  }

  const lowered = value.toLowerCase();
  return DIMENSION_ALIASES[lowered] ?? null;
}

function getDimensionState(dimensionId) {
  return state.dimensions[dimensionId];
}

function getChunkCoordinate(blockCoordinate) {
  return Math.floor(blockCoordinate / 16);
}

function getChunkCenter(chunkCoordinate) {
  return chunkCoordinate * 16 + 8;
}

function getRingForChunkCount(chunkCount) {
  if (chunkCount <= 1) {
    return 0;
  }

  return Math.ceil((Math.sqrt(chunkCount) - 1) / 2);
}

function calculateBaseUnlockCost(dimensionId, currentChunks) {
  const baseCost = CONFIG.unlockCost.base;
  const scaleCost = currentChunks * CONFIG.unlockCost.perChunk;
  const ringCost = getRingForChunkCount(currentChunks + 1) * CONFIG.unlockCost.ringBonus;
  const multiplier = CONFIG.unlockCost.dimensionMultiplier[dimensionId] ?? 1;
  return Math.ceil((baseCost + scaleCost + ringCost) * multiplier);
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rollUnlockCost(dimensionId, currentChunks) {
  const baselineCost = calculateBaseUnlockCost(dimensionId, currentChunks);
  const minFactor = Math.max(0.1, Number(CONFIG.unlockCost.randomRange?.minFactor ?? 0.65));
  const maxFactor = Math.max(minFactor, Number(CONFIG.unlockCost.randomRange?.maxFactor ?? 1.35));
  const minCost = Math.max(1, Math.floor(baselineCost * minFactor));
  const maxCost = Math.max(minCost, Math.ceil(baselineCost * maxFactor));
  return getRandomInteger(minCost, maxCost);
}

function normalizeUnlockCost(value) {
  const parsed = Math.floor(Number(value));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function ensureNextUnlockCost(dimensionId) {
  const dimensionState = getDimensionState(dimensionId);
  const normalizedCost = normalizeUnlockCost(dimensionState.nextUnlockCost);
  if (normalizedCost) {
    dimensionState.nextUnlockCost = normalizedCost;
    return normalizedCost;
  }

  dimensionState.nextUnlockCost = rollUnlockCost(dimensionId, dimensionState.unlockedChunks);
  markDirty();
  return dimensionState.nextUnlockCost;
}

function calculateUnlockCost(dimensionId) {
  return ensureNextUnlockCost(dimensionId);
}

function addProgress(points) {
  if (!Number.isFinite(points) || points <= 0) {
    return;
  }

  state.progress += points;
  state.lifetimeProgress += points;
  markDirty();
}

function spendProgress(points) {
  state.progress = Math.max(0, state.progress - points);
  markDirty();
}

function buildUnlockedChunkSet(chunkCount) {
  const unlockedSet = new Set();
  let x = 0;
  let z = 0;
  let legLength = 1;
  let directionIndex = 0;
  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  unlockedSet.add("0,0");

  while (unlockedSet.size < chunkCount) {
    for (let repeat = 0; repeat < 2; repeat += 1) {
      const [stepX, stepZ] = directions[directionIndex % directions.length];
      for (let step = 0; step < legLength && unlockedSet.size < chunkCount; step += 1) {
        x += stepX;
        z += stepZ;
        unlockedSet.add(`${x},${z}`);
      }
      directionIndex += 1;
    }
    legLength += 1;
  }

  return unlockedSet;
}

function rebuildUnlockedCache(dimensionId) {
  const dimensionState = getDimensionState(dimensionId);
  unlockedChunkCache.set(dimensionId, buildUnlockedChunkSet(dimensionState.unlockedChunks));
}

function rebuildAllUnlockedCaches() {
  for (const dimensionId of DIMENSION_IDS) {
    rebuildUnlockedCache(dimensionId);
  }
}

function ensureAnchorForPlayer(player) {
  const dimensionId = player.dimension.id;
  const dimensionState = getDimensionState(dimensionId);

  if (dimensionState.anchorSet) {
    return;
  }

  const location = player.location;
  dimensionState.anchorChunkX = getChunkCoordinate(location.x);
  dimensionState.anchorChunkZ = getChunkCoordinate(location.z);
  dimensionState.anchorY = Math.floor(location.y);
  dimensionState.anchorSet = true;
  markDirty();
  world.sendMessage(
    `§e[LockedChunk] ${DIMENSION_LABELS[dimensionId]} anchor set to chunk ${dimensionState.anchorChunkX}, ${dimensionState.anchorChunkZ}.`,
  );
}

function isChunkUnlocked(dimensionId, location) {
  const dimensionState = getDimensionState(dimensionId);

  if (!dimensionState.anchorSet) {
    return true;
  }

  const playerChunkX = getChunkCoordinate(location.x);
  const playerChunkZ = getChunkCoordinate(location.z);
  const relativeChunkX = playerChunkX - dimensionState.anchorChunkX;
  const relativeChunkZ = playerChunkZ - dimensionState.anchorChunkZ;
  return isRelativeChunkUnlocked(dimensionId, relativeChunkX, relativeChunkZ);
}

function isRelativeChunkUnlocked(dimensionId, relativeChunkX, relativeChunkZ) {
  const unlockedSet = unlockedChunkCache.get(dimensionId);
  return unlockedSet?.has(`${relativeChunkX},${relativeChunkZ}`) ?? false;
}

function getRelativeChunkCoordinates(dimensionId, location) {
  const dimensionState = getDimensionState(dimensionId);
  const playerChunkX = getChunkCoordinate(location.x);
  const playerChunkZ = getChunkCoordinate(location.z);
  return {
    x: playerChunkX - dimensionState.anchorChunkX,
    z: playerChunkZ - dimensionState.anchorChunkZ,
  };
}

function getChunkOffset(blockCoordinate) {
  return ((Math.floor(blockCoordinate) % 16) + 16) % 16;
}

function isNearLockedBoundary(player) {
  const dimensionId = player.dimension.id;
  const dimensionState = getDimensionState(dimensionId);
  if (!dimensionState.anchorSet) {
    return false;
  }

  const relativeChunk = getRelativeChunkCoordinates(dimensionId, player.location);
  if (!isRelativeChunkUnlocked(dimensionId, relativeChunk.x, relativeChunk.z)) {
    return false;
  }

  const offsetX = getChunkOffset(player.location.x);
  const offsetZ = getChunkOffset(player.location.z);
  const margin = Math.max(0, Math.min(7, Math.floor(CONFIG.messages.edgeWarningMarginBlocks)));

  if (offsetX <= margin && !isRelativeChunkUnlocked(dimensionId, relativeChunk.x - 1, relativeChunk.z)) {
    return true;
  }

  if (offsetX >= 15 - margin && !isRelativeChunkUnlocked(dimensionId, relativeChunk.x + 1, relativeChunk.z)) {
    return true;
  }

  if (offsetZ <= margin && !isRelativeChunkUnlocked(dimensionId, relativeChunk.x, relativeChunk.z - 1)) {
    return true;
  }

  if (offsetZ >= 15 - margin && !isRelativeChunkUnlocked(dimensionId, relativeChunk.x, relativeChunk.z + 1)) {
    return true;
  }

  return false;
}

function rememberSafeLocation(player) {
  lastSafePositions.set(player.id, {
    dimensionId: player.dimension.id,
    x: player.location.x,
    y: player.location.y,
    z: player.location.z,
  });
}

function getFallbackLocation(dimensionId) {
  const dimensionState = getDimensionState(dimensionId);
  return {
    x: getChunkCenter(dimensionState.anchorChunkX),
    y: dimensionState.anchorY,
    z: getChunkCenter(dimensionState.anchorChunkZ),
  };
}

function sendBoundaryWarning(player) {
  const lastWarningTick = boundaryWarnings.get(player.id) ?? -CONFIG.messages.boundaryCooldownTicks;
  if (runtimeTicks - lastWarningTick < CONFIG.messages.boundaryCooldownTicks) {
    return;
  }

  boundaryWarnings.set(player.id, runtimeTicks);

  const dimensionId = player.dimension.id;
  const nextCost = calculateUnlockCost(dimensionId);
  const currentPool = state?.progress ?? 0;
  const shortfall = Math.max(0, nextCost - currentPool);
  const dimLabel = DIMENSION_LABELS[dimensionId] ?? dimensionId;

  player.onScreenDisplay.setActionBar(
    `§cLocked! Need §e${nextCost}§c progress (have §a${currentPool}§c) — type §f!lc unlock ${dimLabel.toLowerCase()}`,
  );

  if (shortfall > 0) {
    player.sendMessage(
      [
        `§c[LockedChunk] §fThat chunk is locked!`,
        `§7  Dimension : §b${dimLabel}`,
        `§7  Pool now  : §a${currentPool}`,
        `§7  Need      : §e${nextCost}`,
        `§7  Shortfall : §c${shortfall}`,
        `§7Earn progress: §f!lc deposit <resource>§7 (e.g. §f!lc deposit iron§7)`,
        `§7Then unlock  : §f!lc unlock ${dimLabel.toLowerCase()}`,
        `§7See options  : §f!lc help`,
      ].join("\n"),
    );
  } else {
    player.sendMessage(
      [
        `§c[LockedChunk] §fThat chunk is locked!`,
        `§7  Dimension : §b${dimLabel}`,
        `§7  Pool now  : §a${currentPool} §7(enough!)`,
        `§7Unlock it now: §f!lc unlock ${dimLabel.toLowerCase()}`,
      ].join("\n"),
    );
  }
}

function sendEdgeWarning(player) {
  const lastWarningTick = edgeWarnings.get(player.id) ?? -CONFIG.messages.edgeWarningCooldownTicks;
  if (runtimeTicks - lastWarningTick < CONFIG.messages.edgeWarningCooldownTicks) {
    return;
  }

  edgeWarnings.set(player.id, runtimeTicks);

  const dimensionId = player.dimension.id;
  const nextCost = calculateUnlockCost(dimensionId);
  const currentPool = state?.progress ?? 0;
  const shortfall = Math.max(0, nextCost - currentPool);
  const dimLabel = DIMENSION_LABELS[dimensionId] ?? dimensionId;
  player.sendMessage(
    `§e[LockedChunk] Edge of unlocked ${dimLabel}. Next chunk price: §6${nextCost}§e (pool: §a${currentPool}§e, shortfall: §c${shortfall}§e).`,
  );
}

function teleportToSafeChunk(player) {
  const savedLocation = lastSafePositions.get(player.id);
  const currentDimensionId = player.dimension.id;

  if (savedLocation && savedLocation.dimensionId === currentDimensionId && isChunkUnlocked(currentDimensionId, savedLocation)) {
    player.teleport(savedLocation, { dimension: player.dimension });
    return;
  }

  player.teleport(getFallbackLocation(currentDimensionId), { dimension: player.dimension });
}

function enforceBounds(player, forceStatus = false) {
  ensureAnchorForPlayer(player);

  if (isChunkUnlocked(player.dimension.id, player.location)) {
    if (isNearLockedBoundary(player)) {
      sendEdgeWarning(player);
    }
    rememberSafeLocation(player);
    if (forceStatus) {
      showStatus(player, true);
    }
    return;
  }

  sendBoundaryWarning(player);
  teleportToSafeChunk(player);
}

function notifyBlockedInteraction(player) {
  sendBoundaryWarning(player);
}

function handleProtectedLocation(player, location) {
  ensureAnchorForPlayer(player);
  if (isChunkUnlocked(player.dimension.id, location)) {
    return false;
  }

  notifyBlockedInteraction(player);
  return true;
}

function getSharedHours() {
  return (state.totalOnlineTicks / 72000).toFixed(1);
}

function getDimensionSummary(dimensionId) {
  const dimensionState = getDimensionState(dimensionId);
  const nextCost = calculateUnlockCost(dimensionId);
  const ring = getRingForChunkCount(dimensionState.unlockedChunks);
  return `§b${DIMENSION_LABELS[dimensionId]}§r: ${dimensionState.unlockedChunks} chunks, ring ${ring}, next ${nextCost}`;
}

function showStatus(player, includeHelpHint = false) {
  const lines = [
    "§6[LockedChunk] Shared Progress",
    `§fPool: §a${state.progress}§f | Days: §b${state.daysSurvived}§f | Shared hours: §d${getSharedHours()}`,
    getDimensionSummary("minecraft:overworld"),
    getDimensionSummary("minecraft:nether"),
    getDimensionSummary("minecraft:the_end"),
  ];

  if (includeHelpHint) {
    lines.push("§7Use !lc help for commands, !lc deposit <resource>, !lc unlock <dimension>.");
  }

  player.sendMessage(lines.join("\n"));
  const dimId = player.dimension.id;
  const nextCostBar = calculateUnlockCost(dimId);
  player.onScreenDisplay.setActionBar(
    `§6Pool §a${state.progress}§6 | Next(${DIMENSION_LABELS[dimId]}) §e${nextCostBar} | OW §f${getDimensionState("minecraft:overworld").unlockedChunks} §7N §f${getDimensionState("minecraft:nether").unlockedChunks} §7E §f${getDimensionState("minecraft:the_end").unlockedChunks}`,
  );
}

function showHelp(player) {
  const resourceList = Object.entries(RESOURCE_TIERS)
    .map(([key, resource]) => `${key}(${resource.label} = ${resource.points})`)
    .join(", ");

  player.sendMessage(
    [
      "§6[LockedChunk] Commands",
      "§f!lc show §7- Show shared chunk progress",
      "§f!lc unlock <overworld|nether|end> §7- Spend shared progress on a random next chunk cost",
      "§f!lc deposit <resource> [count] §7- Turn rare items into shared unlock progress",
      "§f!lc help §7- Show this help",
      "§fResources: §7" + resourceList,
      "§fAdmin: §7!lc admin setanchor [dimension], !lc admin grant <points>, !lc admin reset",
    ].join("\n"),
  );
}

function hasAdminAccess(player) {
  try {
    if (typeof player.isOp === "function" && player.isOp()) {
      return true;
    }
  } catch (error) {
    // ignored
  }

  return player.hasTag("lc.admin");
}

function setAnchorFromPlayer(player, dimensionId) {
  if (player.dimension.id !== dimensionId) {
    player.sendMessage(`§c[LockedChunk] Stand in the ${DIMENSION_LABELS[dimensionId]} to set that anchor.`);
    return;
  }

  const dimensionState = getDimensionState(dimensionId);
  dimensionState.anchorChunkX = getChunkCoordinate(player.location.x);
  dimensionState.anchorChunkZ = getChunkCoordinate(player.location.z);
  dimensionState.anchorY = Math.floor(player.location.y);
  dimensionState.anchorSet = true;
  markDirty();
  player.sendMessage(
    `§a[LockedChunk] ${DIMENSION_LABELS[dimensionId]} anchor moved to chunk ${dimensionState.anchorChunkX}, ${dimensionState.anchorChunkZ}.`,
  );
}

function tryUnlockDimension(player, dimensionId) {
  const dimensionState = getDimensionState(dimensionId);
  const nextCost = calculateUnlockCost(dimensionId);
  if (state.progress < nextCost) {
    player.sendMessage(
      `§c[LockedChunk] You need ${nextCost - state.progress} more progress to unlock the next ${DIMENSION_LABELS[dimensionId]} chunk.`,
    );
    return;
  }

  spendProgress(nextCost);
  dimensionState.unlockedChunks += 1;
  dimensionState.nextUnlockCost = rollUnlockCost(dimensionId, dimensionState.unlockedChunks);
  markDirty();
  rebuildUnlockedCache(dimensionId);
  world.sendMessage(
    `§a[LockedChunk] ${player.name} unlocked chunk #${dimensionState.unlockedChunks} in the ${DIMENSION_LABELS[dimensionId]}! Next random cost: ${dimensionState.nextUnlockCost}.`,
  );
  for (const onlinePlayer of world.getAllPlayers()) {
    onlinePlayer.onScreenDisplay.setActionBar(
      `§a${DIMENSION_LABELS[dimensionId]} chunk unlocked! Pool: ${state.progress}`,
    );
  }
}

function getInventoryContainer(player) {
  return player.getComponent("minecraft:inventory")?.container;
}

function countItem(container, itemId) {
  let total = 0;
  for (let slot = 0; slot < container.size; slot += 1) {
    const itemStack = container.getItem(slot);
    if (itemStack?.typeId === itemId) {
      total += itemStack.amount;
    }
  }
  return total;
}

function removeItemAmount(container, itemId, amount) {
  let remaining = amount;

  for (let slot = 0; slot < container.size && remaining > 0; slot += 1) {
    const itemStack = container.getItem(slot);
    if (!itemStack || itemStack.typeId !== itemId) {
      continue;
    }

    if (itemStack.amount <= remaining) {
      remaining -= itemStack.amount;
      container.setItem(slot);
      continue;
    }

    itemStack.amount -= remaining;
    remaining = 0;
    container.setItem(slot, itemStack);
  }

  return remaining === 0;
}

function handleDeposit(player, resourceKey, bundleCount) {
  const resource = RESOURCE_TIERS[resourceKey];
  if (!resource) {
    player.sendMessage("§c[LockedChunk] Unknown resource bundle. Use !lc help.");
    return;
  }

  const bundles = Math.max(1, Math.floor(bundleCount || 1));
  const container = getInventoryContainer(player);
  if (!container) {
    player.sendMessage("§c[LockedChunk] Inventory access failed.");
    return;
  }

  const requiredAmount = resource.amount * bundles;
  const availableAmount = countItem(container, resource.itemId);
  if (availableAmount < requiredAmount) {
    player.sendMessage(
      `§c[LockedChunk] You need ${requiredAmount} ${resource.itemId.replace("minecraft:", "")} for that deposit.`,
    );
    return;
  }

  if (!removeItemAmount(container, resource.itemId, requiredAmount)) {
    player.sendMessage("§c[LockedChunk] Deposit failed, please try again.");
    return;
  }

  const awardedPoints = resource.points * bundles;
  addProgress(awardedPoints);
  player.sendMessage(
    `§a[LockedChunk] Deposited ${requiredAmount} ${resource.itemId.replace("minecraft:", "")} for ${awardedPoints} progress.`,
  );
  player.onScreenDisplay.setActionBar(`§a+${awardedPoints} progress`);
}

function handleAdminCommand(player, parts) {
  if (!hasAdminAccess(player)) {
    player.sendMessage("§c[LockedChunk] Admin commands require operator access or the lc.admin tag.");
    return;
  }

  const subCommand = (parts[0] ?? "").toLowerCase();

  if (subCommand === "setanchor") {
    const dimensionId = normalizeDimension(parts[1], player.dimension.id);
    if (!dimensionId) {
      player.sendMessage("§c[LockedChunk] Unknown dimension. Use overworld, nether, or end.");
      return;
    }
    setAnchorFromPlayer(player, dimensionId);
    return;
  }

  if (subCommand === "grant") {
    const points = Math.max(0, Math.floor(Number(parts[1] ?? "0")));
    if (points <= 0) {
      player.sendMessage("§c[LockedChunk] Use !lc admin grant <points>.");
      return;
    }
    addProgress(points);
    world.sendMessage(`§e[LockedChunk] ${player.name} granted ${points} progress.`);
    return;
  }

  if (subCommand === "reset") {
    state = createDefaultState();
    rebuildAllUnlockedCaches();
    markDirty();
    world.sendMessage(`§c[LockedChunk] ${player.name} reset locked chunk progression.`);
    return;
  }

  player.sendMessage("§c[LockedChunk] Unknown admin command. Use setanchor, grant, or reset.");
}

function handleChatCommand(player, rawMessage) {
  const parts = rawMessage.trim().split(/\s+/);
  const command = (parts[1] ?? "show").toLowerCase();

  if (command === "help") {
    showHelp(player);
    return;
  }

  if (command === "show" || command === "status") {
    showStatus(player, true);
    return;
  }

  if (command === "deposit") {
    handleDeposit(player, (parts[2] ?? "").toLowerCase(), Number(parts[3] ?? "1"));
    return;
  }

  if (command === "unlock") {
    const dimensionId = normalizeDimension(parts[2], player.dimension.id);
    if (!dimensionId) {
      player.sendMessage("§c[LockedChunk] Use !lc unlock <overworld|nether|end>.");
      return;
    }
    tryUnlockDimension(player, dimensionId);
    return;
  }

  if (command === "admin") {
    handleAdminCommand(player, parts.slice(2));
    return;
  }

  player.sendMessage("§c[LockedChunk] Unknown command. Use !lc help.");
}

function handleMobKill(event) {
  if (!state) {
    return;
  }

  const deadEntityTypeId = event.deadEntity?.typeId;
  const awardedPoints = MOB_POINTS[deadEntityTypeId];
  const damagingEntity = event.damageSource?.damagingEntity;

  if (!awardedPoints || !(damagingEntity instanceof Player)) {
    return;
  }

  addProgress(awardedPoints);
  damagingEntity.sendMessage(
    `§a[LockedChunk] +${awardedPoints} progress for defeating ${deadEntityTypeId.replace("minecraft:", "")}.`,
  );
  damagingEntity.onScreenDisplay.setActionBar(`§a+${awardedPoints} progress`);
  saveState();
}

function awardTimedProgress() {
  if (!state) {
    return;
  }

  const players = world.getAllPlayers();
  runtimeTicks += CONFIG.tickInterval;

  state.serverTickBank += CONFIG.tickInterval;
  while (state.serverTickBank >= CONFIG.ticksPerMinecraftDay) {
    state.serverTickBank -= CONFIG.ticksPerMinecraftDay;
    state.daysSurvived += 1;
    addProgress(CONFIG.dayProgressReward);
    world.sendMessage(
      `§e[LockedChunk] Day ${state.daysSurvived} reached. Shared pool +${CONFIG.dayProgressReward} progress.`,
    );
  }

  state.totalOnlineTicks += players.length * CONFIG.tickInterval;
  state.onlineTickBank += players.length * CONFIG.tickInterval;
  while (state.onlineTickBank >= CONFIG.ticksPerPlaytimePoint) {
    state.onlineTickBank -= CONFIG.ticksPerPlaytimePoint;
    addProgress(1);
  }

  markDirty();
  saveState();
}

function enforceAllPlayers() {
  if (!state) {
    return;
  }

  for (const player of world.getAllPlayers()) {
    enforceBounds(player);
  }
}

world.afterEvents.worldInitialize.subscribe(({ propertyRegistry }) => {
  const dynamicProperties = new DynamicPropertiesDefinition();
  dynamicProperties.defineString(STATE_KEY, 4096);
  propertyRegistry.registerWorldDynamicProperties(dynamicProperties);
  loadState();
});

world.afterEvents.entityDie.subscribe(handleMobKill);

world.afterEvents.playerSpawn.subscribe(({ player, initialSpawn }) => {
  if (!state) {
    return;
  }

  system.run(() => {
    enforceBounds(player, initialSpawn);
    if (initialSpawn) {
      player.sendMessage(`§a[LockedChunk] Hello ${player.name}!`);
      showHelp(player);
    }
  });
});

if (world.afterEvents.playerDimensionChange) {
  world.afterEvents.playerDimensionChange.subscribe(({ player }) => {
    if (!state) {
      return;
    }

    system.run(() => enforceBounds(player, true));
  });
}

world.beforeEvents.chatSend.subscribe((event) => {
  if (!event.message.toLowerCase().startsWith("!lc")) {
    return;
  }

  event.cancel = true;
  if (!state) {
    event.sender.sendMessage("§c[LockedChunk] The addon is still loading.");
    return;
  }

  handleChatCommand(event.sender, event.message);
  saveState();
});

if (world.beforeEvents.playerBreakBlock) {
  world.beforeEvents.playerBreakBlock.subscribe((event) => {
    if (handleProtectedLocation(event.player, event.block.location)) {
      event.cancel = true;
    }
  });
}

if (world.beforeEvents.playerPlaceBlock) {
  world.beforeEvents.playerPlaceBlock.subscribe((event) => {
    if (handleProtectedLocation(event.player, event.block.location)) {
      event.cancel = true;
    }
  });
}

if (world.beforeEvents.playerInteractWithBlock) {
  world.beforeEvents.playerInteractWithBlock.subscribe((event) => {
    if (handleProtectedLocation(event.player, event.block.location)) {
      event.cancel = true;
    }
  });
}

if (world.beforeEvents.itemUseOn) {
  world.beforeEvents.itemUseOn.subscribe((event) => {
    const source = event.source;
    if (!(source instanceof Player)) {
      return;
    }
    if (handleProtectedLocation(source, event.blockLocation)) {
      event.cancel = true;
    }
  });
}

system.runInterval(awardTimedProgress, CONFIG.tickInterval);
system.runInterval(enforceAllPlayers, CONFIG.enforcementIntervalTicks);
