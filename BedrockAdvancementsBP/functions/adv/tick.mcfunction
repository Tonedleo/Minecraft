scoreboard players add @a adv_pts 0
scoreboard players add @a adv_e_log 0
scoreboard players add @a adv_e_stn 0
scoreboard players add @a adv_e_hnt 0
scoreboard players add @a adv_m_irn 0
scoreboard players add @a adv_m_sut 0
scoreboard players add @a adv_m_nth 0
scoreboard players add @a adv_h_dia 0
scoreboard players add @a adv_h_fir 0
scoreboard players add @a adv_r_str 0
scoreboard players add @a adv_r_egg 0

execute as @a[scores={adv_e_log=0},hasitem={item=minecraft:oak_log,quantity=1..}] run function adv/award/easy_punching_trees
execute as @a[scores={adv_e_stn=0},hasitem={item=minecraft:cobblestone,quantity=1..}] run function adv/award/easy_stone_age
execute as @a[scores={adv_e_hnt=0},hasitem={item=minecraft:rotten_flesh,quantity=1..}] run function adv/award/easy_monster_hunter

execute as @a[scores={adv_m_irn=0},hasitem={item=minecraft:iron_ingot,quantity=1..}] run function adv/award/medium_acquire_hardware
execute as @a[scores={adv_m_sut=0},hasitem={item=minecraft:iron_helmet,quantity=1..},hasitem={item=minecraft:iron_chestplate,quantity=1..},hasitem={item=minecraft:iron_leggings,quantity=1..},hasitem={item=minecraft:iron_boots,quantity=1..}] run function adv/award/medium_suit_up
execute as @a[scores={adv_m_nth=0},hasitem={item=minecraft:obsidian,quantity=10..}] run function adv/award/medium_we_need_to_go_deeper

execute as @a[scores={adv_h_dia=0},hasitem={item=minecraft:diamond,quantity=1..}] run function adv/award/hard_diamonds
execute as @a[scores={adv_h_fir=0},hasitem={item=minecraft:blaze_rod,quantity=1..}] run function adv/award/hard_into_fire

execute as @a[scores={adv_r_str=0},hasitem={item=minecraft:nether_star,quantity=1..}] run function adv/award/really_hard_beaconator
execute as @a[scores={adv_r_egg=0},hasitem={item=minecraft:dragon_egg,quantity=1..}] run function adv/award/really_hard_free_the_end
