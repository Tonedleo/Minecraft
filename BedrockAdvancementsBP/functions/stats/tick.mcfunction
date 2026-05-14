# Initialize scores for players who joined after setup
scoreboard players add @a stat_time_t 0
scoreboard players add @a stat_time_m 0
scoreboard players add @a stat_jumps 0
scoreboard players add @a stat_grnd 0

# Allow all players to use the /trigger stats_show command (no op required)
scoreboard players enable @a stats_show

# --- Time played ---
# Each tick adds 1; every 1200 ticks (1 minute) increments stat_time_m
scoreboard players add @a stat_time_t 1
execute as @a[scores={stat_time_t=1200..}] run scoreboard players add @s stat_time_m 1
execute as @a[scores={stat_time_t=1200..}] run scoreboard players set @s stat_time_t 0

# --- Jump detection ---
# stat_grnd=1 means player was on solid ground last tick.
# If grounded last tick and now in air → a jump (or walk-off) occurred.
execute as @a[scores={stat_grnd=1}] at @s if block ~ ~-0.1 ~ air run scoreboard players add @s stat_jumps 1
# Update ground state for this tick
execute as @a at @s unless block ~ ~-0.1 ~ air run scoreboard players set @s stat_grnd 1
execute as @a at @s if block ~ ~-0.1 ~ air run scoreboard players set @s stat_grnd 0

# --- Handle /trigger stats_show ---
execute as @a[scores={stats_show=1..}] run function stats/show
scoreboard players set @a[scores={stats_show=1..}] stats_show 0
