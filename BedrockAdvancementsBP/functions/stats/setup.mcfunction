# Stat tracking objectives
scoreboard objectives add stat_time_t dummy
scoreboard objectives add stat_time_m dummy
scoreboard objectives add stat_jumps dummy
scoreboard objectives add stat_grnd dummy
scoreboard objectives add stats_show trigger

# Initialize scores for all current players
scoreboard players add @a stat_time_t 0
scoreboard players add @a stat_time_m 0
scoreboard players add @a stat_jumps 0
scoreboard players add @a stat_grnd 0

tellraw @a {"rawtext":[{"text":"§b[Stats] Loaded. Type §e/trigger stats_show §bin chat anytime to view your stats."}]}
